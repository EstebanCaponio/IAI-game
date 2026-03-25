import { Card, Text, Input, Title1, Title3 } from "@fluentui/react-components";
import { useMemo, useState } from "react";
import type { Member } from "../../models/Member";
import type { Team } from "../../models/Team";
import BackButton from "../../commons/BackButton";
import SearchFilters from "./createComponents/SearchFilters";
import TableSelectMembers from "./createComponents/TableAvailableMembers";
import TableSelectedMembers from "./createComponents/TableSelectedMembers";
import ErrorBanner from "./createComponents/ErrorBanner";
import TeamStats from "./createComponents/TeamStats";
import ActionButtons from "./createComponents/ActionButtons";
import { useCreatePageStyles } from "./CreatePage.Styles";

interface CreatePageProps {
    teams: Team[];
    setTeams: React.Dispatch<React.SetStateAction<Team[]>>;
    members: Member[];
    availableMembers: Member[];
    setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
    currentUser: Member;
    onBack: () => void;
    editingTeam?: Team;
    updateTeamRanks: (teams: Team[]) => Team[];
}


export default function CreatePage({ teams, setTeams, members, setMembers, availableMembers, currentUser, onBack, editingTeam, updateTeamRanks }: CreatePageProps) {
    const styles = useCreatePageStyles();
    const [teamName, setTeamName] = useState(editingTeam?.name || "");
    const [teamImage, setTeamImage] = useState(editingTeam?.image || "");
    const [nameFilter, setNameFilter] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState("");
    const [countryFilter, setCountryFilter] = useState("");
    const [selectedIds, setSelectedIds] = useState<number[]>(editingTeam ? editingTeam.members.map(m => m.id) : [currentUser.id]);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const isEditing = Boolean(editingTeam);

    const filteredAvailable = useMemo(() => {
        const nameTerm = nameFilter.trim().toLowerCase();
        const departmentTerm = departmentFilter.trim().toLowerCase();
        const countryTerm = countryFilter.trim().toLowerCase();

        return availableMembers
            .filter((member) => member.id !== currentUser.id)
            .filter((member) => {
                const translatedName = member.name.toLowerCase();
                const translatedDept = member.department.toLowerCase();
                const translatedCountry = member.country.toLowerCase();

                const matchesName = !nameTerm || translatedName.includes(nameTerm);
                const matchesDept = !departmentTerm || translatedDept.includes(departmentTerm);
                const matchesCountry = !countryTerm || translatedCountry.includes(countryTerm);

                return matchesName && matchesDept && matchesCountry;
            });
    }, [availableMembers, selectedIds, nameFilter, departmentFilter, countryFilter]);

    const selectedMembers = useMemo(
        () => members.filter((member) => selectedIds.includes(member.id)).slice(0, 10),
        [members, selectedIds]
    );

    const totalScore = members
        .filter((member) => selectedIds.includes(member.id))
        .reduce((sum, member) => sum + member.score, 0);

    function toggleMember(id: number) {
        if (id === currentUser.id && !isEditing) {
            return;
        }

        setSelectedIds((prev) => {
            if (prev.includes(id)) {
                if (id === currentUser.id && isEditing) {
                    return prev; //cannot remove current user if editing, must always be leader
                }
                return prev.filter((item) => item !== id);
            }
            if (prev.length >= 5) {
                setErrorMessage("Numero massimo di membri raggiunto");
                setTimeout(() => setErrorMessage(""), 3000);
                return prev;
            }
            return [...prev, id];
        });
    }

    function handleDelete() {
        if (!editingTeam) return;

        // remove team
        setTeams((prev) => {
            const updated = prev.filter((team) => team.id !== editingTeam.id);
            return updateTeamRanks(updated);
        });

        // return members to available pool
        setMembers((prev) =>
            prev.map((member) =>
                editingTeam.members.some(m => m.id === member.id)
                    ? { ...member, teamId: null }
                    : member
            )
        );

        onBack();
    }

    function handleSave() {
        if (!teamName.trim()) {
            setErrorMessage("Inserisci un nome per la squadra.");
            setTimeout(() => setErrorMessage(""), 3000);
            return;
        }
        if (selectedMembers.length < 1) {
            setErrorMessage("Seleziona almeno un membro.");
            setTimeout(() => setErrorMessage(""), 3000);
            return;
        }

        if (isEditing && editingTeam) {
            // modifiy
            const updatedTeam: Team = {
                ...editingTeam,
                name: teamName.trim(),
                image: teamImage.trim() || undefined,
                members: members.filter((member) => selectedIds.includes(member.id)),
                totalScore,
            };

            setTeams((prev) => updateTeamRanks(prev.map((team) => team.id === editingTeam.id ? updatedTeam : team)));
            setMembers((prev) =>
                prev.map((member) => {
                    const wasInTeam = editingTeam.members.some(m => m.id === member.id);
                    const isInTeam = selectedIds.includes(member.id);
                    if (wasInTeam && !isInTeam) {
                        return { ...member, teamId: null };
                    } else if (!wasInTeam && isInTeam) {
                        return { ...member, teamId: editingTeam.id };
                    }
                    return member;
                })
            );
        } else {
            // create new team
            const nextId = teams.length > 0 ? Math.max(...teams.map((team) => team.id)) + 1 : 1;

            const newTeam: Team = {
                id: nextId,
                name: teamName.trim(),
                image: teamImage.trim() || undefined,
                members: members.filter((member) => selectedIds.includes(member.id)),
                leader: currentUser,
                totalScore,
                createdAt: new Date().toISOString().split("T")[0],
                rank: 0 // temporary, will be updated by updateTeamRanks
            };

            setTeams((prev) => updateTeamRanks([...prev, newTeam]));
            setMembers((prev) =>
                prev.map((member) =>
                    selectedIds.includes(member.id) ? { ...member, teamId: newTeam.id } : member
                )
            );
        }
        //clear form and go back to home page
        setTeamName("");
        setTeamImage("");
        setSelectedIds([currentUser.id]);
        onBack();
    }

    return (
        <div className={styles.page}>
            <ErrorBanner errorMessage={errorMessage} onClose={() => setErrorMessage("")} />

            <div className={styles.header}>
                <div>
                    <Title1>{isEditing ? "Modifica Squadra" : "Crea Squadra"}</Title1> <br />
                </div>
                <BackButton onBack={onBack} />
            </div>

            <div className={styles.body}>
                <Card className={styles.card}>
                    <Text className={styles.inputText}><strong>Nome squadra</strong> <span style={{ color: 'red' }}>*</span></Text>
                    <Input
                        value={teamName}
                        onChange={(event) => setTeamName((event.target as HTMLInputElement).value)}
                        placeholder="Esempio: Team Alpha"
                        style={{ marginBottom: '12px' }}
                    />
                    <Text className={styles.inputText}>Immagine (URL)</Text>
                    <Input
                        value={teamImage}
                        onChange={(event) => setTeamImage((event.target as HTMLInputElement).value)}
                        placeholder="https://..."
                    />

                    <div style={{ marginTop: "18px" }}>
                        <Title3 className={styles.sectionTitle}>Seleziona Membri</Title3>
                        <Text className={styles.inputText}>Filtri ricerca</Text>

                        <SearchFilters nameFilter={nameFilter} setNameFilter={setNameFilter} departmentFilter={departmentFilter} setDepartmentFilter={setDepartmentFilter} countryFilter={countryFilter} setCountryFilter={setCountryFilter} />

                        <TableSelectMembers filteredAvailable={filteredAvailable} selectedIds={selectedIds} toggleMember={toggleMember} />
                    </div>
                </Card>

                <Card className={styles.card}>
                    <Title3 className={styles.sectionTitle}>Statistiche Squadra:</Title3>
                    <TeamStats totalScore={totalScore} selectedCount={selectedIds.length} leaderName={currentUser.name} />

                    <Title3 style={{ marginTop: '12px' }}>Membri selezionati:</Title3>
                    <TableSelectedMembers selectedMembers={selectedMembers} toggleMember={toggleMember} currentUser={currentUser} />
                </Card>
            </div>

            <ActionButtons
                isEditing={isEditing}
                onDelete={handleDelete}
                onBack={onBack}
                onSave={handleSave}
            />
        </div>
    );
}
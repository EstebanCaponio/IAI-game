import { Button, Card, Text, Input, Table, TableHeader, TableRow, TableHeaderCell, TableBody, TableCell, makeStyles, Avatar, tokens, Title1, Body1, MessageBar, Title3 } from "@fluentui/react-components";
import { Delete24Regular, Add24Filled, Subtract24Filled } from "@fluentui/react-icons";
import { useMemo, useState } from "react";
import type { Member } from "../../models/Member";
import type { Team } from "../../models/Team";

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

const useStyles = makeStyles({
    page: {
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "8px",
    },
    body: {
        display: "grid",
        gridTemplateColumns: "1.4fr 1fr",
        gap: "20px",
    },
    card: {
        padding: "16px",
        borderRadius: tokens.borderRadiusMedium,
    },
    sectionTitle: {
        marginBottom: "10px",
        // fontWeight: 700,
    },
    list: {
        maxHeight: "336px",
        overflowY: "auto",
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: tokens.borderRadiusMedium,
        marginTop: "15px",
    },
    stickyHeader: {
        display: "flex",
        flexDirection: "column",
    },
    tableHeader: {
        position: "sticky",
        top: 0,
        backgroundColor: "white",
        zIndex: 1,
    },
    row: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
    },
    btn: {
        minWidth: "24px",
        minHeight: "24px",
        width: "24px",
        height: "24px",
        border: "none",
        backgroundColor: "transparent",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        outline: "none",
        padding: 0,
    },
    deleteButton: {
        backgroundColor: "#d13438",
        color: "white",
        border: "none",
        padding: "8px 16px",
        borderRadius: "4px",
        cursor: "pointer",
        fontWeight: 500,
        fontSize: "14px",
        "&:hover": {
            backgroundColor: "#a4373a",
            color: "white",
        },
        "&:active": {
            backgroundColor: "#821d1f",
            color: "white",
        },
    },
});

export default function CreatePage({ teams, setTeams, members, setMembers, availableMembers, currentUser, onBack, editingTeam, updateTeamRanks }: CreatePageProps) {
    const styles = useStyles();
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

    // get current date and day name
    const today = new Date();
    const todayName = today.toLocaleDateString('it-IT', { weekday: 'long' });

    return (
        <div className={styles.page}>
            {errorMessage && (
                <MessageBar intent="error">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', width: '100%' }}>
                        <span>{errorMessage}</span>
                        <Button appearance="subtle" size="small" onClick={() => setErrorMessage("")}>Chiudi</Button>
                    </div>
                </MessageBar>
            )}

            <div className={styles.header}>
                <div>
                    <Title1>{isEditing ? "Modifica Squadra" : "Crea Squadra"}</Title1> <br />
                    <Body1>{todayName}, {today.toLocaleDateString('it-IT')}</Body1>
                </div>
                <Button onClick={onBack} appearance="primary" size="medium">
                    ← Torna alla Classifica
                </Button>
            </div>

            <div className={styles.body}>
                <Card className={styles.card}>
                    <Text style={{ marginBottom: '8px', display: 'block' }}><strong>Nome squadra</strong> <span style={{ color: 'red' }}>*</span></Text>
                    <Input
                        value={teamName}
                        onChange={(event) => setTeamName((event.target as HTMLInputElement).value)}
                        placeholder="Esempio: Team Alpha"
                        style={{ marginBottom: '12px' }}
                    />
                    <Text style={{ marginBottom: '8px', display: 'block' }}>Immagine (URL)</Text>
                    <Input
                        value={teamImage}
                        onChange={(event) => setTeamImage((event.target as HTMLInputElement).value)}
                        placeholder="https://..."
                    />

                    <div style={{ marginTop: "18px" }}>
                        <Title3 className={styles.sectionTitle}>Seleziona Membri</Title3>
                        <Text style={{ marginBottom: '8px', display: 'block' }}>Filtri ricerca</Text>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '10px' }}>
                            <Input
                                value={nameFilter}
                                onChange={(event) => setNameFilter((event.target as HTMLInputElement).value)}
                                placeholder="Nome"
                            />
                            <Input
                                value={departmentFilter}
                                onChange={(event) => setDepartmentFilter((event.target as HTMLInputElement).value)}
                                placeholder="Dipartimento"
                            />
                            <Input
                                value={countryFilter}
                                onChange={(event) => setCountryFilter((event.target as HTMLInputElement).value)}
                                placeholder="Nazione"
                            />
                        </div>

                        <div className={styles.list}>
                            <div className={styles.stickyHeader}>
                                <Table>
                                    <TableHeader className={styles.tableHeader}>
                                        <TableRow>
                                            <TableHeaderCell style={{ width: "50px" }}>Sel.</TableHeaderCell>
                                            <TableHeaderCell>Nome</TableHeaderCell>
                                            <TableHeaderCell>Dipartimento</TableHeaderCell>
                                            <TableHeaderCell>Nazione</TableHeaderCell>
                                            <TableHeaderCell style={{ width: "50px" }}>Punti</TableHeaderCell>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredAvailable.map((member) => {
                                            const isSelected = selectedIds.includes(member.id);
                                            return (
                                                <TableRow key={member.id} style={isSelected ? { backgroundColor: "#f4f4f4" } : undefined}>
                                                    <TableCell>
                                                        <button
                                                            className={styles.btn}
                                                            style={{ color: isSelected ? "#a80008" : "#0f7a0f" }}
                                                            onClick={() => toggleMember(member.id)}
                                                        >
                                                            {isSelected ? <Subtract24Filled /> : <Add24Filled />}
                                                        </button>
                                                    </TableCell>
                                                    <TableCell className={styles.row}>
                                                        <Avatar name={member.name} color="colorful" size={20} />
                                                        <Text>{member.name}</Text>
                                                    </TableCell>
                                                    <TableCell>{member.department}</TableCell>
                                                    <TableCell>{member.country}</TableCell>
                                                    <TableCell>{member.score}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className={styles.card}>
                    <Title3 className={styles.sectionTitle}>Statistiche Squadra:</Title3>
                    <Text><strong>Punteggio totale:</strong> {totalScore} PT</Text>
                    <Text><strong>Numero membri:</strong> {selectedIds.length} / 5</Text>
                    <Text><strong>Leader:</strong> {currentUser.name}</Text>

                    <Title3 style={{ marginTop: '12px' }}>Membri selezionati:</Title3>

                    <div className={styles.list}>
                        <div className={styles.stickyHeader}>
                            <Table>
                                <TableHeader className={styles.tableHeader}>
                                    <TableRow>
                                        <TableHeaderCell>Nome</TableHeaderCell>
                                        <TableHeaderCell style={{ width: "50px" }}>Punti</TableHeaderCell>
                                        <TableHeaderCell style={{ width: "70px" }}>Rimuovi</TableHeaderCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {selectedMembers.map((member) => (
                                        <TableRow key={member.id}>
                                            <TableCell className={styles.row}>
                                                <Avatar name={member.name} color="colorful" size={24} />
                                                <Text>{member.name}</Text>
                                            </TableCell>
                                            <TableCell>{member.score}</TableCell>
                                            <TableCell>
                                                {member.id === currentUser.id ? (
                                                    <span style={{ color: "#999" }}>-</span>
                                                ) : (
                                                    <button
                                                        style={{
                                                            minWidth: "24px",
                                                            minHeight: "24px",
                                                            width: "24px",
                                                            height: "24px",
                                                            border: "none",
                                                            backgroundColor: "transparent",
                                                            color: "#d13438",
                                                            cursor: "pointer",
                                                            padding: 0,
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                        }}
                                                        onClick={() => toggleMember(member.id)}
                                                        title="Rimuovi"
                                                    >
                                                        <Delete24Regular />
                                                    </button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </Card>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                {isEditing && (
                    <Button onClick={handleDelete} className={styles.deleteButton}>
                        Elimina Squadra
                    </Button>
                )}
                <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto' }}>
                    <Button onClick={onBack} appearance="secondary">
                        Annulla
                    </Button>
                    <Button onClick={handleSave} appearance="primary">
                        {isEditing ? "Salva Modifiche" : "Salva Squadra"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
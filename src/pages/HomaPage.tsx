import { Card, Button, Title1, Body1, Table, TableHeader, TableRow, TableHeaderCell, TableBody, TableCell, makeStyles, Avatar, tokens} from "@fluentui/react-components";
import generateRandomData from "../utils/GenerateData";
import { useEffect, useState } from "react";
import DetailsPage from "./DetailsPage";
import type { Team } from "../models/Team";
import UserGreeting from "../components/UserGreeting";
import type { Member } from "../models/Member";
import CreatePage from "./CreatePage";
import { user as currentUser } from "../data/currentUser";
import UserTeamCard from "../components/UserTeamCard";

const updateTeamRanks = (teams: Team[]): Team[] => {
  return [...teams]
    .sort((a, b) => b.totalScore - a.totalScore)
    .map((team, index) => ({ ...team, rank: index + 1 }));
};

const useStyles = makeStyles({
  page: {
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  centeredCard: {
    padding: "16px",
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: tokens.spacingVerticalM,
    border: `1px solid rgba(0,0,0,0.1)`,
    borderRadius: tokens.borderRadiusMedium,
  },
  section: {
    marginTop: "32px",
  },
  infoRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    width: "100%",
    gap: "16px",
    flexWrap: "wrap",
  },
  infoColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    whiteSpace: "nowrap",
    fontWeight: 600,
  },
  columnDivider: {
    borderLeft: "1px solid rgba(0,0,0,0.2)",
    height: "64px",
  },
  avatarSquare: {
    width: "96px",
    height: "96px",
    borderRadius: "16px",
    backgroundColor: "#304ffe",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "32px",
    fontWeight: 700,
    textTransform: "uppercase",
  },
});

export default function HomePage() {
  const styles = useStyles(); //fluentui hook for styles
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null); // state like routerDom
  const [teams, setTeams] = useState<Team[]>([]); // state for teams data
  const [members, setMembers] = useState<Member[]>([]); // state for members data
  const [showCreatePage, setShowCreatePage] = useState(false); // state for create page (toggle)
  const [editingTeam, setEditingTeam] = useState<Team | null>(null); // state for editing team

  useEffect(() => {
    const { teams: generatedTeams, members: generatedMembers } = generateRandomData(); // generate random data on mount
    setTeams(updateTeamRanks(generatedTeams));
    setMembers([currentUser, ...generatedMembers]);
  }, []);

  const availableMembers = members.filter(m => m.teamId === null); // filter members without a team
  const sortedTeams = [...teams].sort((a, b) => b.totalScore - a.totalScore); // sort teams by score

  const userTeam = teams.find(
    (team) => team.leader?.id === currentUser.id || team.members.some((m) => m.id === currentUser.id)
  );
  const hasTeam = Boolean(userTeam);

  // if a team is selected, show details page
  if (selectedTeam) {
    return <DetailsPage team={selectedTeam} onBack={() => setSelectedTeam(null)} rank={selectedTeam.rank} />;
  }
  // if create page is selected, show create page
  if (showCreatePage || editingTeam) {
    return <CreatePage
      teams={teams}
      setTeams={setTeams}
      members={members}
      setMembers={setMembers}
      availableMembers={availableMembers}
      currentUser={currentUser}
      onBack={() => {
        setShowCreatePage(false);
        setEditingTeam(null);
      }}
      editingTeam={editingTeam || undefined}
      updateTeamRanks={updateTeamRanks}
    />;
  }

  return (
    <div className={styles.page}>

      <UserGreeting />

      {hasTeam && userTeam ? (
        <UserTeamCard
          userTeam={userTeam}
          onDetailsClick={setSelectedTeam}
          onEditClick={setEditingTeam}
        />
      ) : (
        <Card className={styles.centeredCard} style={{ marginTop: '20px' }}>
          <Title1>Non hai ancora una squadra</Title1>
          <Button appearance="primary" style={{ marginTop: '16px' }} onClick={() => setShowCreatePage(true)}>
            + Crea la tua squadra
          </Button>
        </Card>
      )}

      <div className={styles.section}>
        <Title1>Classifica Globale</Title1><br />
        <Body1>{sortedTeams.length} Teams</Body1>

        <Card style={{ marginTop: '16px' }}>
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>Posizione</TableHeaderCell>
                  <TableHeaderCell>Squadra</TableHeaderCell>
                  <TableHeaderCell>Punteggio</TableHeaderCell>
                  <TableHeaderCell>Membri</TableHeaderCell>
                  <TableHeaderCell>Azioni</TableHeaderCell>
                </TableRow>
              </TableHeader>

              <TableBody>
                {sortedTeams.map((team, index) => {

                  return (
                    <TableRow key={team.id}>
                      <TableCell><strong>{index + 1}°</strong></TableCell>

                      <TableCell style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Avatar name={team.name} color="colorful" image={team.image ? { src: team.image } : undefined} size={24} />
                        {team.name}
                      </TableCell>

                      <TableCell><strong>{team.totalScore} pt</strong></TableCell>

                      <TableCell style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Avatar name={team.leader?.name} color="colorful" size={24} />
                        {team.leader?.name}
                      </TableCell>

                      <TableCell><Button onClick={() => setSelectedTeam(team)}>Dettagli</Button></TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
}
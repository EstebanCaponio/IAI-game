import { Card, Button, Title1, Body1, Table, TableHeader, TableRow, TableHeaderCell, TableBody, TableCell, makeStyles, Avatar, tokens } from "@fluentui/react-components";
import type { Team } from "../../models/Team";
import type { Member } from "../../models/Member";
import UserTeamCard from "../../commons/UserTeamCard";

// Nuove props per la HomePage
interface HomePageProps {
  teams: Team[];
  currentUser: Member;
  onCreateClick: () => void;
  onEditClick: (team: Team) => void;
  onDetailsClick: (team: Team) => void;
}

const useStyles = makeStyles({
  page: { padding: 0, maxWidth: 'none', margin: 0 },
  centeredCard: {
    padding: "16px", marginTop: "20px", display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center", gap: tokens.spacingVerticalM,
    border: `1px solid rgba(0,0,0,0.1)`, borderRadius: tokens.borderRadiusMedium,
  },
  section: { marginTop: "32px" },
});

export default function HomePage({ teams, currentUser, onCreateClick, onEditClick, onDetailsClick }: HomePageProps) {
  const styles = useStyles();

  // order teams by score for global ranking
  const sortedTeams = [...teams].sort((a, b) => b.totalScore - a.totalScore); 

  // find user's team
  const userTeam = teams.find(
    (team) => team.leader?.id === currentUser.id || team.members.some((m) => m.id === currentUser.id)
  );

  return (
    <div className={styles.page}>

      {userTeam ? (
        <UserTeamCard
          userTeam={userTeam}
          onDetailsClick={onDetailsClick}
          onEditClick={onEditClick}
        />
      ) : (
        <Card className={styles.centeredCard}>
          <Title1>Non hai ancora una squadra</Title1>
          <Button appearance="primary" style={{ marginTop: '16px' }} onClick={onCreateClick}>
            + Crea la tua squadra
          </Button>
        </Card>
      )}

      <div className={styles.section}>
        <Title1>Classifica Globale</Title1><br />
        <Body1>{sortedTeams.length} Teams</Body1>

        <Card style={{ marginTop: '16px' }}>
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
                {sortedTeams.map((team, index) => (
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
                      <TableCell>
                        <Button onClick={() => onDetailsClick(team)}>Dettagli</Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
        </Card>
      </div>
    </div>
  );
}
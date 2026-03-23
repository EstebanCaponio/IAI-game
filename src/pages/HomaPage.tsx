import { Card, Button, Title1, Body1, Table, TableHeader, TableRow, TableHeaderCell, TableBody, TableCell, makeStyles, Avatar, tokens, AvatarGroup, AvatarGroupItem, AvatarGroupPopover, partitionAvatarGroupItems } from "@fluentui/react-components";
import generateRandomData from "../utils/GenerateData";
import { useEffect, useState } from "react";
import DetailsPage from "./DetailsPage";
import type { Team } from "../models/Team";
import UserGreeting from "../components/UserGreeting";
import type { Member } from "../models/Member";

// const { teams } = generateRandomData();

const useStyles = makeStyles({
  page: {
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  centeredCard: {
    padding: "40px",
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
});

export default function HomePage() {
  const styles = useStyles(); //fluentui hook for styles
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null); // state like routerDom
  const [teams, setTeams] = useState<Team[]>([]); // state for teams data
  const [members, setMembers]= useState<Member[]>([]); // state for members data

  useEffect(() => {
    const { teams, members } = generateRandomData(); // generate random data on mount
    setTeams(teams);
    setMembers(members);
  }, []);

  // sort teams by total score
  const sortedTeams = [...teams].sort((a, b) => b.totalScore - a.totalScore);

  if (selectedTeam) {
    return <DetailsPage team={selectedTeam} onBack={() => setSelectedTeam(null)} />;
  }

  return (
    <div className={styles.page}>

      <UserGreeting />

      <Card className={styles.centeredCard} style={{ marginTop: '20px' }}>
        <Title1>Non hai ancora una squadra</Title1>
        <Button appearance="primary" style={{ marginTop: '16px' }}>+ Crea la tua squadra</Button>
      </Card>

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
                  // fluent rules for avatar group with max 3 items inline and the rest in popover
                  const partitionedItems = partitionAvatarGroupItems({
                    items: team.members,
                    maxInlineItems: 3,
                  });

                  return (
                    <TableRow key={team.id}>
                      <TableCell><strong>{index + 1}°</strong></TableCell>

                      <TableCell style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Avatar name={team.name} color="colorful" image={team.image ? { src: team.image } : undefined} size={24} />
                        {team.name}
                      </TableCell>

                      <TableCell><strong>{team.totalScore} pt</strong></TableCell>

                      <TableCell>
                        <AvatarGroup layout="stack">
                          {partitionedItems.inlineItems.map((member) => (
                            <AvatarGroupItem name={member.name} key={member.id} />
                          ))}

                          {partitionedItems.overflowItems && partitionedItems.overflowItems.length > 0 && (
                            <AvatarGroupPopover>
                              {partitionedItems.overflowItems.map((member) => (
                                <AvatarGroupItem name={member.name} key={member.id} />
                              ))}
                            </AvatarGroupPopover>
                          )}
                        </AvatarGroup>
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
import { Avatar, Button, Card, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "@fluentui/react-components";
import type { Team } from "../../../../models/Team";
import { useTableGlobalRankStyles } from "./TableGlobalRank.Style";

interface TableGlobalRankProps {
  teams: Team[];
  onDetailsClick: (team: Team) => void;
}

export default function TableGlobalRank({ teams, onDetailsClick }: TableGlobalRankProps) {
  const styles=useTableGlobalRankStyles();
  return (
    <Card className={styles.card}>
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
          {teams.map((team, index) => (
            <TableRow key={team.id}>
              <TableCell><strong>{index + 1}°</strong></TableCell>
              <TableCell className={styles.memberAN}>
                <Avatar name={team.name} color="colorful" image={team.image ? { src: team.image } : undefined} size={24} />
                {team.name}
              </TableCell>
              <TableCell><strong>{team.totalScore} pt</strong></TableCell>
              <TableCell className={styles.memberAN}>
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
  );
};
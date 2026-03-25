import { Avatar, Card, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "@fluentui/react-components";
import { useDetailMemberCardStyles } from "./DetailsMembersCard.Style";
import type { Team } from "../../../../models/Team";

export default function DetailMembersCard({ team}: { team: Team }) {
    const styles=useDetailMemberCardStyles();
    return (
          <Card className={styles.card}>
                            <div>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHeaderCell>Avatar</TableHeaderCell>
                                            <TableHeaderCell>Nome</TableHeaderCell>
                                            <TableHeaderCell>Dipartimento</TableHeaderCell>
                                            <TableHeaderCell>Nazionalità</TableHeaderCell>
                                            <TableHeaderCell>Data ingresso</TableHeaderCell>
                                            <TableHeaderCell>Punti</TableHeaderCell>
                                        </TableRow>
                                    </TableHeader>
        
                                    <TableBody>
                                        {team.members.map((member, _) => (
                                            <TableRow key={member.id}>
                                                <TableCell>
                                                    <Avatar name={member.name} color="colorful" size={32} />
                                                </TableCell>
                                                <TableCell>{member.name}</TableCell>
                                                <TableCell>{member.department}</TableCell>
                                                <TableCell>{member.country}</TableCell>
                                                <TableCell>{new Date(member.joinDate).toLocaleDateString('it-IT')}</TableCell>
                                                <TableCell>{member.score}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </Card>
    );
};
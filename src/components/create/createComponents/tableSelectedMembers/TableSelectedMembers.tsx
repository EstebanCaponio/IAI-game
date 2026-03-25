import { Avatar, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow, Text } from "@fluentui/react-components";
import { Delete24Regular } from "@fluentui/react-icons";
import type { Member } from "../../../../models/Member";
import { useTableSelectedMembersStyles } from "./TableSelectedMembers.Styles";

interface TableSelectedMembersProps {
    selectedMembers: { id: number; name: string; score: number }[];
    toggleMember: (id: number) => void;
    currentUser: Member;
}

export default function TableSelectedMembers({ selectedMembers, toggleMember, currentUser }: TableSelectedMembersProps) {
    const styles = useTableSelectedMembersStyles();

    return (
        <div className={styles.list}>
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell>Nome</TableHeaderCell>
                            <TableHeaderCell className={styles.colWidth}>Punti</TableHeaderCell>
                            <TableHeaderCell className={styles.colWidth}>Rimuovi</TableHeaderCell>
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
                                        <span className={styles.none}>-</span>
                                    ) : (
                                        <button
                                            className={styles.trashBtn}
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
    );
};
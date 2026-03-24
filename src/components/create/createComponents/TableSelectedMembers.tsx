import { Avatar, makeStyles, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow, Text, tokens } from "@fluentui/react-components";
import { Delete24Regular } from "@fluentui/react-icons";
import type { Member } from "../../../models/Member";

const useStyles = makeStyles({
    list: {
        maxHeight: "336px",
        overflowY: "auto",
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: tokens.borderRadiusMedium,
        marginTop: "15px",
    },
    row: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
    }
});

interface TableSelectedMembersProps {
    selectedMembers: { id: number; name: string; score: number }[];
    toggleMember: (id: number) => void;
    currentUser: Member;
}

export default function TableSelectedMembers({ selectedMembers, toggleMember, currentUser }: TableSelectedMembersProps) {
    const styles = useStyles();

    return (
        <div className={styles.list}>
                        <div>
                            <Table>
                                <TableHeader>
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
    );
};
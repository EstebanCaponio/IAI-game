import { Avatar, makeStyles, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow, Text, tokens } from "@fluentui/react-components";
import { Add24Filled, Subtract24Filled } from "@fluentui/react-icons";
import type { Member } from "../../../models/Member";

const useStyles = makeStyles({
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
    }
});

interface TableSelectMembersProps {
    filteredAvailable: Member[];
    selectedIds: number[];
    toggleMember: (id: number) => void;
}

export default function TableSelectMembers({ filteredAvailable, selectedIds, toggleMember }: TableSelectMembersProps) {
    const styles = useStyles();
    return (
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
    );
};
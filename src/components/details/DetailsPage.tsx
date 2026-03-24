import { Card, makeStyles, Title2, Body1, Avatar, AvatarGroup, AvatarGroupItem, tokens, Title1, Table, TableHeader, TableRow, TableHeaderCell, TableBody, TableCell } from "@fluentui/react-components";
import type { Team } from "../../models/Team";
import BackButton from "../../commons/BackButton";

// Create interface to destructure props
interface DetailsPageProps {
    team: Team;
    onBack: () => void;
    rank: number;
}

const useStyles = makeStyles({
    page: {
        padding: 0,
        maxWidth: 'none',
        margin: 0,
    },
    nav: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "20px",
    },
    centeredCard: {
        marginTop: "20px",
        padding: "16px",
        display: "flex",
        justifyContent: "space-between",
        gap: "24px",
        border: `1px solid rgba(0,0,0,0.1)`,
        borderRadius: tokens.borderRadiusMedium,
        minHeight: "120px",
    },
    infoRow: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1,
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
    row: {
        display: "flex",
        gap: "16px",
        alignItems: "center",
    },
    section: {
        marginTop: "32px",
    },
});

export default function DetailsPage({ team, onBack, rank }: DetailsPageProps) {

    const styles = useStyles(); //fluentui hook for styles
    const teamInitial = team.name ? team.name.split(' ').map(word => word[0]).join('').toUpperCase() : "?"; // take initials of team name for avatar


    return (
        <div className={styles.page}>
            <div className={styles.nav}>
                <div>
                    <Title1>Dettagli Squadra</Title1> <br />
                </div>
                <BackButton onBack={onBack} />
            </div>

            <Card className={styles.centeredCard}>
                <Title2 style={{ borderBottom: '1px solid rgba(0,0,0,0.2)', paddingBottom: '8px' }}>
                    {team.name}
                </Title2>

                <div className={styles.infoRow}>

                    {team.image ? (
                        <Avatar size={96} shape="circular" image={{ src: team.image }} />
                    ) : (
                        <div className={styles.avatarSquare}>{teamInitial}</div>
                    )}

                    <div className={styles.infoColumn}>
                        <Body1>Posizione</Body1>
                        <Title2>{rank}</Title2>
                    </div>

                    <div className={styles.columnDivider} />

                    <div className={styles.infoColumn}>
                        <Body1>Punti</Body1>
                        <Title2>{team.totalScore} PT</Title2>
                    </div>

                    <div className={styles.columnDivider} />

                    <div className={styles.infoColumn}>
                        <Body1>Team Leader</Body1>
                        <Title2>{team.leader ? team.leader.name : "—"}</Title2>
                    </div>

                    <div className={styles.columnDivider} />

                    <div className={styles.infoColumn}>
                        <Body1>Data Creazione</Body1>
                        <Title2>{new Date(team.createdAt).toLocaleDateString('it-IT')}</Title2>
                    </div>

                    <div className={styles.columnDivider} />

                    <AvatarGroup layout="stack" size={48}>
                        {team.members.slice(0, 3).map((member) => (
                            <AvatarGroupItem key={member.id} name={member.name} />
                        ))}
                        {team.members.length > 3 && <AvatarGroupItem name={`+${team.members.length - 3}`} />}
                    </AvatarGroup>
                </div>
            </Card>



            <div className={styles.section}>
                <Title1>Elenco Membri</Title1><br />

                <Card style={{ marginTop: '16px' }}>
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
            </div>

        </div>
    );
};
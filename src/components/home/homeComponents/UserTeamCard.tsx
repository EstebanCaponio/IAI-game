import {
    Card, Button, Title2, Body1, Avatar, AvatarGroup, AvatarGroupItem, makeStyles, tokens
} from "@fluentui/react-components";
import type { Team } from "../../../models/Team";

interface UserTeamCardProps {
    userTeam: Team;
    onDetailsClick: (team: Team) => void;
    onEditClick: (team: Team) => void;
}

const useStyles = makeStyles({
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

export default function UserTeamCard({ userTeam, onDetailsClick, onEditClick }: UserTeamCardProps) {
    const styles = useStyles();

    const teamInitial = userTeam.name
        ? userTeam.name.split(" ").map((word) => word[0]).join("").toUpperCase()
        : "?";

    return (
        <Card className={styles.centeredCard}>
            <Title2 style={{ borderBottom: '1px solid rgba(0,0,0,0.2)', paddingBottom: '8px', textAlign: 'left', alignSelf: 'flex-start' }}>
                La tua Squadra: {userTeam.name}
            </Title2>

            <div className={styles.infoRow}>
                {userTeam.image ? (
                    <Avatar size={96} shape="circular" image={{ src: userTeam.image }} />
                ) : (
                    <div className={styles.avatarSquare}>{teamInitial}</div>
                )}

                <div className={styles.infoColumn}>
                    <Body1>Posizione</Body1>
                    <Title2>{userTeam.rank}°</Title2>
                </div>

                <div className={styles.columnDivider} />

                <div className={styles.infoColumn}>
                    <Body1>Punti</Body1>
                    <Title2>{userTeam.totalScore} PT</Title2>
                </div>

                <div className={styles.columnDivider} />

                <div className={styles.infoColumn}>
                    <Body1>Team Leader</Body1>
                    <Title2>{userTeam.leader ? userTeam.leader.name : "—"}</Title2>
                </div>

                <div className={styles.columnDivider} />

                <div className={styles.infoColumn}>
                    <Body1>Data Creazione</Body1>
                    <Title2>{new Date(userTeam.createdAt).toLocaleDateString('it-IT')}</Title2>
                </div>

                <div className={styles.columnDivider} />

                <AvatarGroup layout="stack" size={48}>
                    {userTeam.members.slice(0, 3).map((member) => (
                        <AvatarGroupItem key={member.id} name={member.name} />
                    ))}
                    {userTeam.members.length > 3 && <AvatarGroupItem name={`+${userTeam.members.length - 3}`} />}
                </AvatarGroup>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
                <Button onClick={() => onDetailsClick(userTeam)}>Dettagli</Button>
                <Button appearance="secondary" onClick={() => onEditClick(userTeam)}>Modifica</Button>
            </div>
        </Card>
    );
}
import { Card, Button, Title2, Body1, Avatar, AvatarGroup, AvatarGroupItem } from "@fluentui/react-components";
import type { Team } from "../../../models/Team";
import { useUserTeamCardStyles } from "./UserTeamCard.Style";

interface UserTeamCardProps {
    userTeam: Team;
    onDetailsClick: (team: Team) => void;
    onEditClick: (team: Team) => void;
}

export default function UserTeamCard({ userTeam, onDetailsClick, onEditClick }: UserTeamCardProps) {
    const styles = useUserTeamCardStyles();

    const teamInitial = userTeam.name
        ? userTeam.name.split(" ").map((word) => word[0]).join("").toUpperCase()
        : "?";

    return (
        <Card className={styles.centeredCard}>
            <Title2 className={styles.title}>
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

            <div className={styles.btnContainer}>
                <Button onClick={() => onDetailsClick(userTeam)}>Dettagli</Button>
                <Button appearance="secondary" onClick={() => onEditClick(userTeam)}>Modifica</Button>
            </div>
        </Card>
    );
}
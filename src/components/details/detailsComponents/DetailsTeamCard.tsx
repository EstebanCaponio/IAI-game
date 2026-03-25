import { Avatar, AvatarGroup, AvatarGroupItem, Body1, Card, Title2 } from "@fluentui/react-components";
import type { Team } from "../../../models/Team";
import { useDetailsTeamCardStyles } from "./DetailsTeamCard.Styles";

export default function DetailTeamCard({ team, rank }: { team: Team; rank: number }) {
    const styles = useDetailsTeamCardStyles(); //fluentui hook for styles
    const teamInitial = team.name ? team.name.split(' ').map(word => word[0]).join('').toUpperCase() : "?"; // take initials of team name for avatar

    return (
        <Card className={styles.centeredCard}>
            <Title2 className={styles.title}>
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
    );
};
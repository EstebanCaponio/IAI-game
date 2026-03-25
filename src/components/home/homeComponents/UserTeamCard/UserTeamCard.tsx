import TeamCard from "../../../../commons/teamCard/TeamCard";
import type { Team } from "../../../../models/Team";

interface UserTeamCardProps {
    userTeam: Team;
    onDetailsClick: (team: Team) => void;
    onEditClick: (team: Team) => void;
}

export default function UserTeamCard({ userTeam, onDetailsClick, onEditClick }: UserTeamCardProps) {
    return (
        <TeamCard
            team={userTeam}
            rank={userTeam.rank}
            titlePrefix="La tua Squadra: "
            showButtons={true}
            onDetailsClick={onDetailsClick}
            onEditClick={onEditClick}
        />
    );
}
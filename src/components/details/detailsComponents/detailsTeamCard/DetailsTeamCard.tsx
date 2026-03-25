import TeamCard from "../../../../commons/teamCard/TeamCard";
import type { Team } from "../../../../models/Team";

export default function DetailTeamCard({ team, rank }: { team: Team; rank: number }) {
    return (
        <TeamCard
            team={team}
            rank={rank}
        />
    );
}
import { Title1, Body1, makeStyles } from "@fluentui/react-components";
import type { Team } from "../../models/Team";
import type { Member } from "../../models/Member";
import UserTeamCard from "./homeComponents/UserTeamCard";
import CreateTeamCard from "./homeComponents/CreateTeamCard";
import TableGlobalRank from "./homeComponents/TableGlobalRank";

// props from MainPage
interface HomePageProps {
  teams: Team[];
  currentUser: Member;
  onCreateClick: () => void;
  onEditClick: (team: Team) => void;
  onDetailsClick: (team: Team) => void;
}

const useStyles = makeStyles({
  page: { padding: 0, maxWidth: 'none', margin: 0 },
  section: { marginTop: "32px" },
});

export default function HomePage({ teams, currentUser, onCreateClick, onEditClick, onDetailsClick }: HomePageProps) {
  const styles = useStyles();

  // order teams by score for global ranking
  const sortedTeams = [...teams].sort((a, b) => b.totalScore - a.totalScore);

  // find user's team
  const userTeam = teams.find(
    (team) => team.leader?.id === currentUser.id || team.members.some((m) => m.id === currentUser.id)
  );

  return (
    <div className={styles.page}>

      {userTeam ? (
        <UserTeamCard
          userTeam={userTeam}
          onDetailsClick={onDetailsClick}
          onEditClick={onEditClick}
        />
      ) : (<CreateTeamCard onCreateClick={onCreateClick} />)}

      <div className={styles.section}>
        <Title1>Classifica Globale</Title1>
        <br />
        <Body1>{sortedTeams.length} Teams</Body1>

        <TableGlobalRank teams={sortedTeams} onDetailsClick={onDetailsClick} />
      </div>
    </div>
  );
}
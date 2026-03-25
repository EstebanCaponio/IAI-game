import { Body1 } from "@fluentui/react-components";
import type { Team } from "../../../models/Team";
import type { Member } from "../../../models/Member";
import UserTeamCard from "../homeComponents/UserTeamCard/UserTeamCard";
import CreateTeamCard from "../homeComponents/CreateTeamCard/CreateTeamCard";
import TableGlobalRank from "../homeComponents/TableGlobalRank/TableGlobalRank";
import { useHomePageStyles } from "./HomePage.Styles";
import Header from "../../header/Header";
import PageTitle from "../../../commons/PageTitle";

// props from MainPage
interface HomePageProps {
  teams: Team[];
  currentUser: Member;
  onCreateClick: () => void;
  onEditClick: (team: Team) => void;
  onDetailsClick: (team: Team) => void;
}

export default function HomePage({ teams, currentUser, onCreateClick, onEditClick, onDetailsClick }: HomePageProps) {
  const styles = useHomePageStyles();

  // order teams by score for global ranking
  const sortedTeams = [...teams].sort((a, b) => b.totalScore - a.totalScore);

  // find user's team
  const userTeam = teams.find(
    (team) => team.leader?.id === currentUser.id || team.members.some((m) => m.id === currentUser.id)
  );

  return (
    <div className={styles.page}>
      <Header />
      {userTeam ? (
        <UserTeamCard
          userTeam={userTeam}
          onDetailsClick={onDetailsClick}
          onEditClick={onEditClick}
        />
      ) : (<CreateTeamCard onCreateClick={onCreateClick} />)}

      <div className={styles.section}>
        <PageTitle>Classifica Globale</PageTitle>
        <br />
        <Body1>{sortedTeams.length} Teams</Body1>

        <TableGlobalRank teams={sortedTeams} onDetailsClick={onDetailsClick} />
      </div>
    </div>
  );
}
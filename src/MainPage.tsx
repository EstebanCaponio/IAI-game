import { useEffect, useState } from "react";
import generateRandomData from "./utils/GenerateData";
import { user as currentUser } from "./data/currentUser";
import type { Team } from "./models/Team";
import type { Member } from "./models/Member";
import HomePage from "./components/home/HomePage";
import CreatePage from "./components/create/CreatePage";
import DetailsPage from "./components/details/DetailsPage";
import Header from "./commons/Header";

const updateTeamRanks = (teams: Team[]): Team[] => {
  return [...teams]
    .sort((a, b) => b.totalScore - a.totalScore)
    .map((team, index) => ({ ...team, rank: index + 1 }));
};

export default function App() {
  // date state
  const [teams, setTeams] = useState<Team[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  // navigation state
  const [currentView, setCurrentView] = useState<"HOME" | "CREATE" | "EDIT" | "DETAILS">("HOME");
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  // initialize data on mount
  useEffect(() => {
    const { teams: generatedTeams, members: generatedMembers } = generateRandomData();
    setTeams(updateTeamRanks(generatedTeams));
    setMembers([currentUser, ...generatedMembers]);
  }, []);

  const availableMembers = members.filter(m => m.teamId === null);

  // nav functions
  const goToHome = () => {
    setCurrentView("HOME");
    setSelectedTeam(null);
  };

  const goToCreate = () => {
    setCurrentView("CREATE");
    setSelectedTeam(null);
  };

  const goToEdit = (team: Team) => {
    setSelectedTeam(team);
    setCurrentView("EDIT");
  };

  const goToDetails = (team: Team) => {
    setSelectedTeam(team);
    setCurrentView("DETAILS");
  };
// create function to update pagination
  const renderContent = () => {
    switch (currentView) {
      case "DETAILS":
        if (!selectedTeam) return null;
        return (
          <DetailsPage
            team={selectedTeam}
            onBack={goToHome}
            rank={selectedTeam.rank}
          />
        );

      case "CREATE":
      case "EDIT":
        return (
          <CreatePage
            teams={teams}
            setTeams={setTeams}
            members={members}
            setMembers={setMembers}
            availableMembers={availableMembers}
            currentUser={currentUser}
            onBack={goToHome}
            editingTeam={currentView === "EDIT" && selectedTeam ? selectedTeam : undefined}
            updateTeamRanks={updateTeamRanks}
          />
        );

      case "HOME":
      default:
        return (
          <HomePage
            teams={teams}
            currentUser={currentUser}
            onCreateClick={goToCreate}
            onEditClick={goToEdit}
            onDetailsClick={goToDetails}
          />
        );
    }
  };

  return (
    <div className="app-layout">
      <Header />
      <div className="page-content">
        {renderContent()}
      </div>
    </div>
  );
}
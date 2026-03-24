import { Title1 } from "@fluentui/react-components";
import type { Team } from "../../models/Team";
import BackButton from "../../commons/BackButton";
import DetailTeamCard from "./detailsComponents/DetailsTeamCard";
import DetailMembersCard from "./detailsComponents/DetailsMembersCard";
import { useDetailsPageStyles } from "./DetailsPage.Styles";

// Create interface to destructure props
interface DetailsPageProps {
    team: Team;
    onBack: () => void;
    rank: number;
}

export default function DetailsPage({ team, onBack, rank }: DetailsPageProps) {

    const styles = useDetailsPageStyles(); //fluentui hook for styles

    return (
        <div className={styles.page}>
            <div className={styles.nav}>
                <div>
                    <Title1>Dettagli Squadra</Title1> <br />
                </div>
                <BackButton onBack={onBack} />
            </div>

            <DetailTeamCard team={team} rank={rank} />


            <div className={styles.section}>
                <Title1>Elenco Membri</Title1><br />

                <DetailMembersCard team={team} />
            </div>

        </div>
    );
};
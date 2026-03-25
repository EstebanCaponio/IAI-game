import BackButton from "../../../commons/BackButton";
import DetailTeamCard from "../detailsComponents/detailsTeamCard/DetailsTeamCard";
import DetailMembersCard from "../detailsComponents/detailsMembersCard/DetailsMembersCard";
import { useDetailsPageStyles } from "./DetailsPage.Styles";
import type { Team } from "../../../models/Team";
import { Title2 } from "@fluentui/react-components";
import PageTitle from "../../../commons/PageTitle";

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
                    <PageTitle>Dettagli Squadra</PageTitle> <br />
                </div>
                <BackButton onBack={onBack} />
            </div>

            <DetailTeamCard team={team} rank={rank} />


            <div className={styles.section}>
                <Title2>Elenco Membri</Title2><br />

                <DetailMembersCard team={team} />
            </div>

        </div>
    );
};
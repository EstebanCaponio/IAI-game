import {  makeStyles,  Title1} from "@fluentui/react-components";
import type { Team } from "../../models/Team";
import BackButton from "../../commons/BackButton";
import DetailTeamCard from "./detailsComponents/DetailsTeamCard";
import DetailMembersCard from "./detailsComponents/DetailsMembersCard";

// Create interface to destructure props
interface DetailsPageProps {
    team: Team;
    onBack: () => void;
    rank: number;
}

const useStyles = makeStyles({
    page: {
        padding: 0,
        maxWidth: 'none',
        margin: 0,
    },
    nav: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "20px",
    },
    section: {
        marginTop: "32px",
    },
});

export default function DetailsPage({ team, onBack, rank }: DetailsPageProps) {

    const styles = useStyles(); //fluentui hook for styles

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
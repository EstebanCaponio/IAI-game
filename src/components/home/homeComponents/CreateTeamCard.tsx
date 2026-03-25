import { Button, Card,Title1, } from "@fluentui/react-components";
import { useCreateTeamCardStyles } from "./CreateTeamCard.Style";



export default function CreateTeamCard({ onCreateClick }: { onCreateClick: () => void }) {
    const styles = useCreateTeamCardStyles();
    return (
        <Card className={styles.centeredCard}>
                  <Title1>Non hai ancora una squadra</Title1>
                  <Button appearance="primary" className={styles.btn} onClick={onCreateClick}>
                    + Crea la tua squadra
                  </Button>
                </Card>
    );
};
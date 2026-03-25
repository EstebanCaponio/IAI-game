import { Button, Card } from "@fluentui/react-components";
import { useCreateTeamCardStyles } from "./CreateTeamCard.Style";
import PageTitle from "../../../../commons/PageTitle";

export default function CreateTeamCard({ onCreateClick }: { onCreateClick: () => void }) {
  const styles = useCreateTeamCardStyles();
  return (
    <Card className={styles.centeredCard}>
      <PageTitle>Non hai ancora una squadra</PageTitle>
      <Button appearance="primary" className={styles.btn} onClick={onCreateClick}>
        + Crea la tua squadra
      </Button>
    </Card>
  );
};
import { Button, Card, makeStyles, Title1, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
  centeredCard: {
    padding: "16px", marginTop: "20px", display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center", gap: tokens.spacingVerticalM,
    border: `1px solid rgba(0,0,0,0.1)`, borderRadius: tokens.borderRadiusMedium,
  },
});

export default function CreateTeamCard({ onCreateClick }: { onCreateClick: () => void }) {
    const styles = useStyles();
    return (
        <Card className={styles.centeredCard}>
                  <Title1>Non hai ancora una squadra</Title1>
                  <Button appearance="primary" style={{ marginTop: '16px' }} onClick={onCreateClick}>
                    + Crea la tua squadra
                  </Button>
                </Card>
    );
};
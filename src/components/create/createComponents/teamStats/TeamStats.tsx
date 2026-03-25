import { Card, Text } from "@fluentui/react-components";
import { useTeamStatsStyles } from "./TeamStats.Styles";

interface TeamStatsProps {
    totalScore: number;
    selectedCount: number;
    leaderName: string;
}

export default function TeamStats({ totalScore, selectedCount, leaderName }: TeamStatsProps) {
    const styles=useTeamStatsStyles();
    return (
        <Card className={styles.card}>
            <Text><strong>Punteggio totale:</strong> {totalScore} PT</Text>
            <Text><strong>Numero membri:</strong> {selectedCount} / 5</Text>
            <Text><strong>Leader:</strong> {leaderName}</Text>
        </Card>
    );
}

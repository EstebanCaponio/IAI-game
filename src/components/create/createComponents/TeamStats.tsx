import { Card, Text } from "@fluentui/react-components";

interface TeamStatsProps {
    totalScore: number;
    selectedCount: number;
    leaderName: string;
}

export default function TeamStats({ totalScore, selectedCount, leaderName }: TeamStatsProps) {
    return (
        <Card style={{ padding: '12px'}}>
            <Text><strong>Punteggio totale:</strong> {totalScore} PT</Text>
            <Text><strong>Numero membri:</strong> {selectedCount} / 5</Text>
            <Text><strong>Leader:</strong> {leaderName}</Text>
        </Card>
    );
}

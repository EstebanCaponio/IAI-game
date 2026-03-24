import { Button } from "@fluentui/react-components";

export default function BackButton({ onBack }: { onBack: () => void }) {
    return (
        <Button onClick={onBack} appearance="primary" size="medium">
            ← Torna alla Classifica
        </Button>
    );
};
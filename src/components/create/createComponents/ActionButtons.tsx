import { Button } from "@fluentui/react-components";
import { useActionButtonsStyles } from "./ActionButtons.Style";

interface ActionButtonsProps {
    isEditing: boolean;
    onDelete?: () => void;
    onBack: () => void;
    onSave: () => void;
}

export default function ActionButtons({ isEditing, onDelete, onBack, onSave }: ActionButtonsProps) {
    const styles = useActionButtonsStyles();
    return (
        <div className={styles.containerBtn}>
            {isEditing && onDelete ? (
                <Button onClick={onDelete} appearance="primary" className={styles.deleteBtn}>
                    Elimina Squadra
                </Button>
            ) : <div />}

            <div className={styles.backSaveBtnContainer}>
                <Button onClick={onBack} appearance="secondary">Annulla</Button>
                <Button onClick={onSave} appearance="primary">{isEditing ? 'Salva Modifiche' : 'Salva Squadra'}</Button>
            </div>
        </div>
    );
}

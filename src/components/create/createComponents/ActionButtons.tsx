import { Button } from "@fluentui/react-components";

interface ActionButtonsProps {
    isEditing: boolean;
    onDelete?: () => void;
    onBack: () => void;
    onSave: () => void;
}

export default function ActionButtons({ isEditing, onDelete, onBack, onSave }: ActionButtonsProps) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
            {isEditing && onDelete ? (
                <Button onClick={onDelete} appearance="primary" style={{ backgroundColor: '#d13438', borderColor: '#d13438' }}>
                    Elimina Squadra
                </Button>
            ) : <div />}

            <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto' }}>
                <Button onClick={onBack} appearance="secondary">Annulla</Button>
                <Button onClick={onSave} appearance="primary">{isEditing ? 'Salva Modifiche' : 'Salva Squadra'}</Button>
            </div>
        </div>
    );
}

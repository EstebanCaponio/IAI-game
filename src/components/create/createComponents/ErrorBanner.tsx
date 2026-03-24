import { Button, MessageBar } from "@fluentui/react-components";

interface ErrorBannerProps {
    errorMessage: string;
    onClose: () => void;
}

export default function ErrorBanner({ errorMessage, onClose }: ErrorBannerProps) {
    if (!errorMessage) return null;

    return (
        <MessageBar intent="error">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', width: '100%' }}>
                <span>{errorMessage}</span>
                <Button appearance="subtle" size="small" onClick={onClose}>Chiudi</Button>
            </div>
        </MessageBar>
    );
}

import { Button, MessageBar } from "@fluentui/react-components";
import { useErrorBannerStyles } from "./ErrorBanner.Styles";

interface ErrorBannerProps {
    errorMessage: string;
    onClose: () => void;
}

export default function ErrorBanner({ errorMessage, onClose }: ErrorBannerProps) {
    const styles=useErrorBannerStyles();
    if (!errorMessage) return null;

    return (
        <MessageBar intent="error">
            <div className={styles.bannerContainer}>
                <span>{errorMessage}</span>
                <Button appearance="subtle" size="small" onClick={onClose}>Chiudi</Button>
            </div>
        </MessageBar>
    );
}

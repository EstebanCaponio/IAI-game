import { makeStyles, tokens } from "@fluentui/react-components";

export const useCreatePageStyles = makeStyles({
    page: {
        padding: 0,
        maxWidth: 'none',
        margin: 0,
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "8px",
    },
    body: {
        display: "grid",
        gridTemplateColumns: "1.4fr 1fr",
        gap: "20px",
    },
    card: {
        padding: "16px",
        borderRadius: tokens.borderRadiusMedium,
    },
    inputText:{ marginBottom: '8px', display: 'block' },
    sectionTitle: {
        marginBottom: "10px",
    },
});

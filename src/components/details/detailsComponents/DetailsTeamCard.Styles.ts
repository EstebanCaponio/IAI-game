import { makeStyles, tokens } from "@fluentui/react-components";

export const useDetailsTeamCardStyles = makeStyles({
    centeredCard: {
        marginTop: "20px",
        padding: "16px",
        display: "flex",
        justifyContent: "space-between",
        gap: "24px",
        border: `1px solid rgba(0,0,0,0.1)`,
        borderRadius: tokens.borderRadiusMedium,
        minHeight: "120px",
    },
    title:{ borderBottom: '1px solid rgba(0,0,0,0.2)', paddingBottom: '8px' },
    infoRow: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1,
    },
    avatarSquare: {
        width: "96px",
        height: "96px",
        borderRadius: "16px",
        backgroundColor: "#304ffe",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "32px",
        fontWeight: 700,
        textTransform: "uppercase",
    },
    infoColumn: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        whiteSpace: "nowrap",
        fontWeight: 600,
    },
    columnDivider: {
        borderLeft: "1px solid rgba(0,0,0,0.2)",
        height: "64px",
    },
});
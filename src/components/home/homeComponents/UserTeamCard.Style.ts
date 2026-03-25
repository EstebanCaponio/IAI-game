import { makeStyles, tokens } from "@fluentui/react-components";

export const useUserTeamCardStyles = makeStyles({
    centeredCard: {
        padding: "16px",
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: tokens.spacingVerticalM,
        border: `1px solid rgba(0,0,0,0.1)`,
        borderRadius: tokens.borderRadiusMedium,
    },
    title: { borderBottom: '1px solid rgba(0,0,0,0.2)', paddingBottom: '8px', textAlign: 'left', alignSelf: 'flex-start' },
    infoRow: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1,
        width: "100%",
        gap: "16px",
        flexWrap: "wrap",
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
    btnContainer:{ display: 'flex', gap: '10px', marginTop: '14px' }
});
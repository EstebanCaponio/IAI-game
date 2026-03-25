import { makeStyles, tokens } from "@fluentui/react-components";

export const useTableSelectedMembersStyles = makeStyles({
    list: {
        maxHeight: "336px",
        overflowY: "auto",
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: tokens.borderRadiusMedium,
        marginTop: "15px",
    },
    row: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
    },
    trashBtn: {
        minWidth: "24px",
        minHeight: "24px",
        width: "24px",
        height: "24px",
        border: "none",
        backgroundColor: "transparent",
        color: "#d13438",
        cursor: "pointer",
        padding: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
});
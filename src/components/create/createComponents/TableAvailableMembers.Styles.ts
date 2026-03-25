import { makeStyles, tokens } from "@fluentui/react-components";

export const useTableAvailableMembersStyles = makeStyles({
    list: {
        maxHeight: "336px",
        overflowY: "auto",
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: tokens.borderRadiusMedium,
        marginTop: "15px",
    },
    stickyHeader: {
        display: "flex",
        flexDirection: "column",
    },
    tableHeader: {
        position: "sticky",
        top: 0,
        backgroundColor: "white",
        zIndex: 1,
    },
    row: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
    },
    btn: {
        minWidth: "24px",
        minHeight: "24px",
        width: "24px",
        height: "24px",
        border: "none",
        backgroundColor: "transparent",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        outline: "none",
        padding: 0,
    }
});
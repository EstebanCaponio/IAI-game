import { makeStyles } from "@fluentui/react-components";

export const useDetailsPageStyles = makeStyles({
    page: {
        padding: 0,
        maxWidth: 'none',
        margin: 0,
    },
    nav: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "20px",
    },
    section: {
        marginTop: "32px",
    },
});

import { makeStyles, tokens } from "@fluentui/react-components";

export const useCreateTeamCardStyles = makeStyles({
    centeredCard: {
        padding: "16px", marginTop: "20px", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: tokens.spacingVerticalM,
        border: `1px solid rgba(0,0,0,0.1)`, borderRadius: tokens.borderRadiusMedium,
      },
      btn:{
        marginTop: '16px',
      }
});
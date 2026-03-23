import { Card, Button, Title1, Body1, Table, TableHeader, TableRow, TableHeaderCell, TableBody, TableCell, makeStyles, Avatar, tokens, AvatarGroup, AvatarGroupItem, AvatarGroupPopover, partitionAvatarGroupItems } from "@fluentui/react-components";
import generateRandomData from "../utils/GenerateData";
import { useState } from "react";
import DetailsPage from "./DetailsPage";
import type { Team } from "../models/Team";
import UserGreeting from "../components/UserGreeting";

const { teams } = generateRandomData();

const useStyles = makeStyles({
  page: {
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  centeredCard: {
    padding: "40px",
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: tokens.spacingVerticalM,
    border: `1px solid rgba(0,0,0,0.1)`,
    borderRadius: tokens.borderRadiusMedium,
  },
  section: {
    marginTop: "32px",
  },
});

export default function HomePage() {
  const styles = useStyles(); //fluentui hook for styles
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null); // state like routerDom

  // sort teams by total score
  const sortedTeams = [...teams].sort((a, b) => b.totalScore - a.totalScore);

  if (selectedTeam) {
    return <DetailsPage team={selectedTeam} onBack={() => setSelectedTeam(null)} />;
  }

  return (
    <div className={styles.page}>

      <UserGreeting />

      <Card className={styles.centeredCard} style={{ marginTop: '20px' }}>
        <Title1>Non hai ancora una squadra</Title1>
        <Button appearance="primary" style={{ marginTop: '16px' }}>+ Crea la tua squadra</Button>
      </Card>

      <div className={styles.section}>
        <Title1>Classifica Globale</Title1><br />
        <Body1>{sortedTeams.length} Teams</Body1>

        <Card style={{ marginTop: '16px' }}>
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>Posizione</TableHeaderCell>
                  <TableHeaderCell>Squadra</TableHeaderCell>
                  <TableHeaderCell>Punteggio</TableHeaderCell>
                  <TableHeaderCell>Membri</TableHeaderCell>
                  <TableHeaderCell>Azioni</TableHeaderCell>
                </TableRow>
              </TableHeader>

              <TableBody>
                {sortedTeams.map((team, index) => {
                  // fluent rules for avatar group with max 3 items inline and the rest in popover
                  const partitionedItems = partitionAvatarGroupItems({
                    items: team.members,
                    maxInlineItems: 3,
                  });

                  return (
                    <TableRow key={team.id}>
                      <TableCell><strong>{index + 1}°</strong></TableCell>

                      <TableCell style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Avatar name={team.name} color="colorful" image={team.image ? { src: team.image } : undefined} size={24} />
                        {team.name}
                      </TableCell>

                      <TableCell><strong>{team.totalScore} pt</strong></TableCell>

                      <TableCell>
                        <AvatarGroup layout="stack">
                          {partitionedItems.inlineItems.map((member) => (
                            <AvatarGroupItem name={member.name} key={member.id} />
                          ))}

                          {partitionedItems.overflowItems && partitionedItems.overflowItems.length > 0 && (
                            <AvatarGroupPopover>
                              {partitionedItems.overflowItems.map((member) => (
                                <AvatarGroupItem name={member.name} key={member.id} />
                              ))}
                            </AvatarGroupPopover>
                          )}
                        </AvatarGroup>
                      </TableCell>

                      <TableCell><Button onClick={() => setSelectedTeam(team)}>Dettagli</Button></TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
}




// import { useState } from "react";
// import {
//   Card, Button, Title1, Body1, Table, TableHeader, TableRow, TableHeaderCell, TableBody, TableCell, makeStyles, Avatar, tokens, AvatarGroup, AvatarGroupItem,
//   AvatarGroupPopover, partitionAvatarGroupItems
// } from "@fluentui/react-components";
// import { user } from "../data/currentUser";
// import generateRandomData from "../utils/GenerateData";
// import type { Member } from "../models/Member";

// const useStyles = makeStyles({
//   page: {
//     padding: "20px",
//     maxWidth: "1200px",
//     margin: "0 auto",
//     "@media (min-width: 1024px)": {
//       padding: "40px",
//     },
//   },

//   fluidTitleLeft: { fontSize: "clamp(1.5rem, 4vw, 2rem)", lineHeight: "1.2" },
//   fluidTitleCenter: { fontSize: "clamp(1.2rem, 3.5vw, 1.8rem)", lineHeight: "1.2", textAlign: "center" },
//   section: { marginTop: "32px" },
//   centeredCard: {
//     padding: "clamp(20px, 5vw, 40px)",
//     marginTop: "20px",
//     display: "flex", flexDirection: "column", alignItems: "center",
//     justifyContent: "center", gap: tokens.spacingVerticalM,
//   },

//   // --- VISUALIZZAZIONE DESKTOP (TABELLA) ---
//   desktopOnly: {
//     display: "none",
//     "@media (min-width: 630px)": {
//       display: "block",
//     },
//   },
//   tableCard: {
//     marginTop: "16px",
//     width: "100%",
//     boxSizing: "border-box",
//     padding: "0px",
//   },
//   tableScroll: {
//     overflowX: "auto",
//     width: "100%",
//   },
//   table: {
//     minWidth: "500px",
//     width: "100%",
//     tableLayout: "fixed",
//   },

//   // LARGHEZZA COLONNE (Proporzionali e Fisse)
//   colPosizione: { width: "50px" },
//   colSquadra: { width: "40%" },
//   colNumeri: { width: "15%" },
//   colMembri: { width: "25%" },
//   colAzioni: { width: "20%" },

//   // --- VISUALIZZAZIONE MOBILE (CARD) ---
//   mobileOnly: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "16px",
//     marginTop: "16px",
//     "@media (min-width: 630px)": {
//       display: "none",
//     },
//   },
//   mobileCard: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "12px",
//     padding: "16px",
//     backgroundColor: tokens.colorNeutralBackground1,
//     borderRadius: tokens.borderRadiusMedium,
//     border: `1px solid ${tokens.colorNeutralStroke1}`,
//   },
//   mobileHeader: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
//     paddingBottom: "8px",
//   },
//   mobileInfo: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
// });

// export default function HomePage() {
//   const styles = useStyles();

//   const [data, setData] = useState(() => generateRandomData());
//   const { teams } = data;

//   const today = new Date();
//   const todayName = today.toLocaleDateString('it-IT', { weekday: 'long' });

//   const sortedTeams = [...teams].sort((a, b) => b.totalScore - a.totalScore);

//   const renderTeamMembers = (members: Member[]) => {
//     const partitionedItems = partitionAvatarGroupItems({
//       items: members,
//       maxInlineItems: 3,
//     });

//     return (
//       <AvatarGroup layout="stack" size={24}>
//         {partitionedItems.inlineItems.map((member) => (
//           <AvatarGroupItem name={member.name} key={member.id} title={member.name} />
//         ))}
//         {partitionedItems.overflowItems && partitionedItems.overflowItems.length > 0 && (
//           <AvatarGroupPopover>
//             {partitionedItems.overflowItems.map((member) => (
//               <AvatarGroupItem name={member.name} key={member.id} title={member.name} />
//             ))}
//           </AvatarGroupPopover>
//         )}
//       </AvatarGroup>
//     );
//   };

//   return (
//     <div className={styles.page}>

//       {/* Intestazione */}
//       <div>
//         <Title1 className={styles.fluidTitleLeft}>Benvenuto, {user.name}</Title1> <br />
//         <Body1>{todayName}, {today.toLocaleDateString('it-IT')}</Body1>
//       </div>

//       {/* Card Creazione */}
//       <Card className={styles.centeredCard}>
//         <Title1 className={styles.fluidTitleCenter}>Non hai ancora una squadra</Title1>
//         <Button appearance="primary">+ Crea la tua squadra</Button>
//       </Card>

//       {/* Sezione Classifica */}
//       <div className={styles.section}>
//         <Title1 className={styles.fluidTitleLeft}>Classifica Globale</Title1><br />
//         <Body1>{sortedTeams.length} Teams</Body1>

//         {/* --- VERSIONE DESKTOP (TABELLA) --- */}
//         <div className={styles.desktopOnly}>
//           <Card className={styles.tableCard}>
//             <div className={styles.tableScroll}>
//               <Table className={styles.table}>

//                 <TableHeader>
//                   <TableRow>
//                     <TableHeaderCell className={styles.colPosizione}>Pos.</TableHeaderCell>
//                     <TableHeaderCell className={styles.colSquadra}>Squadra</TableHeaderCell>
//                     <TableHeaderCell className={styles.colNumeri}>Punteggio</TableHeaderCell>
//                     <TableHeaderCell className={styles.colMembri}>Membri</TableHeaderCell>
//                     <TableHeaderCell className={styles.colAzioni}>Azioni</TableHeaderCell>
//                   </TableRow>
//                 </TableHeader>

//                 <TableBody>
//                   {sortedTeams.map((team, index) => (
//                     <TableRow key={team.id}>

//                       <TableCell className={styles.colPosizione}>
//                         <strong>{index + 1}°</strong>
//                       </TableCell>

//                       {/* FIX: Contenitore Flex con textOverflow per evitare che il testo vada a capo */}
//                       <TableCell className={styles.colSquadra}>
//                         <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden', width: '100%' }}>
//                           <div style={{ flexShrink: 0 }}>
//                             <Avatar
//                               name={team.name}
//                               image={team.image ? { src: team.image } : undefined}
//                               size={24}
//                             />
//                           </div>
//                           <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
//                             {team.name}
//                           </span>
//                         </div>
//                       </TableCell>

//                       <TableCell className={styles.colNumeri}>
//                         <strong>{team.totalScore} pt</strong>
//                       </TableCell>

//                       <TableCell className={styles.colMembri}>
//                         {renderTeamMembers(team.members)}
//                       </TableCell>

//                       <TableCell className={styles.colAzioni}>
//                         <Button appearance="subtle">Dettagli</Button>
//                       </TableCell>

//                     </TableRow>
//                   ))}
//                 </TableBody>

//               </Table>
//             </div>
//           </Card>
//         </div>

//         {/* --- VERSIONE MOBILE (CARD VERTICALI) --- */}
//         <div className={styles.mobileOnly}>
//           {sortedTeams.map((team, index) => (
//             <div key={team.id} className={styles.mobileCard}>

//               <div className={styles.mobileHeader}>
//                 <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//                   <Avatar name={team.name} image={team.image ? { src: team.image } : undefined} size={32} />
//                   <strong>{team.name}</strong>
//                 </div>
//                 <Title1 style={{ fontSize: "1.2rem" }}>#{index + 1}</Title1>
//               </div>

//               <div className={styles.mobileInfo}>
//                 <Body1><strong>Punteggio:</strong> {team.totalScore} pt</Body1>
//                 <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//                   <Body1><strong>Membri:</strong></Body1>
//                   {renderTeamMembers(team.members)}
//                 </div>
//               </div>

//               <Button appearance="secondary" style={{ width: "100%", marginTop: "8px" }}>
//                 Dettagli
//               </Button>

//             </div>
//           ))}
//         </div>

//       </div>
//     </div>
//   );
// }
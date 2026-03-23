import { countries, departments, firstNames, lastNames, teamNames, validScores } from "../data/mockData";
import type { Member } from "../models/Member";
import type { Team } from "../models/Team";

export default function generateRandomData(this: any): { members: Member[], teams: Team[] } {
    //declaration of empty array and usedNames
    const usedNames = new Set<string>();
    const members: Member[] = [];

    // Generate 100 unique members
    for (let i = 1; i <= 100; i++) {
        // check if the current fullname already exists in the members array
        const firstName:string = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName:string = lastNames[Math.floor(Math.random() * lastNames.length)];
        const fullName:string = `${firstName} ${lastName}`;

        if (usedNames.has(fullName)) {
            i--;
            continue;
        }
        usedNames.add(fullName);

        const member: Member = {
            id: i + 1,
            name: fullName, // always different
            department: departments[Math.floor(Math.random() * departments.length)],
            country: countries[Math.floor(Math.random() * countries.length)],
            joinDate: new Date(Date.now() - Math.floor(Math.random() * (365 * 5)) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            score: validScores[Math.floor(Math.random() * validScores.length)],
            teamId: null
        };
        members.push(member);
    };

    //support function for members without team
    function getAvailableMember(allMembers: Member[]): Member | null {
        const available: Member[] = allMembers.filter(m => m.teamId === null);
        if (available.length === 0) return null; // if no avaible members

        return available[Math.floor(Math.random() * available.length)];
    }

    //declaration of empty array and usedTeams
    const usedTeams = new Set<string>();
    const teams: Team[] = [];

    //generate 10 unique teams
    for (let j = 0; j < 10; j++) {
        const teamName:string = teamNames[Math.floor(Math.random() * teamNames.length)];

        if (usedTeams.has(teamName)) {
            j--;
            continue;
        }
        usedTeams.add(teamName);

        //create team id and team members array
        const teamId:number = j + 1;
        const teamMembers: Member[] = [];

        // put 5 members in each team
        for (let m = 0; m < 5; m++) {
            const member = getAvailableMember(members);
            if (member) {
                member.teamId = teamId; // mark the member as assigned to a team
                teamMembers.push(member);
            }
        };

        const totalScore:number = teamMembers.reduce((acc, member) => acc + member.score, 0);

        const leader = teamMembers.length > 0
            ? teamMembers[Math.floor(Math.random() * teamMembers.length)]
            : null;

        const newTeam: Team = {
            id: teamId,
            name: teamName,
            members: teamMembers,
            leader,
            totalScore,
            createdAt: new Date().toISOString().split('T')[0]
        };

        if (teamMembers.length > 0) {
            teams.push(newTeam);
        } else {
            // Non creare team vuoti, regola di consistenza
            usedTeams.delete(teamName);
            j--;
        }
    };


    return { members, teams };
};
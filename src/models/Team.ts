import type { Member } from "./Member";

export interface Team {
  id: number;
  name: string;
  leader: Member | null;
  members: Member[];
  image?: string;
  totalScore: number;
  createdAt: string;
};
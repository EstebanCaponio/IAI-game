import type { Country, Department, ValidScore } from "../models/Member";

export const firstNames = [
    "Marco", "Giulia", "Matteo", "Sofia", "Alessandro",
    "Francesca", "Lorenzo", "Martina", "Andrea", "Alice",
    "Davide", "Beatrice", "Federico", "Chiara", "Gabriele",
    "Giorgia", "Riccardo", "Sara", "Simone", "Elena"
];

export const lastNames = [
    "Rossi", "Bianchi", "Ferrari", "Esposito", "Romano",
    "Colombo", "Ricci", "Marino", "Greco", "Bruno",
    "Gallo", "Conti", "De Luca", "Mancini", "Costa",
    "Giordano", "Rizzo", "Lombardi", "Moretti", "Barbieri"
];

export const teamNames = [
    "Innovators", "I Buggati", "Coffee Drinkers", "Data Miners",
    "Code Breakers", "Brainstormers", "Tech Titans", "Agile Masters",
    "Visionaries", "Pixel Pioneers", "Cloud Surfers", "Cyber Ninjas",
    "Optimizers", "Logic Lords", "Debuggers", "Syntax Squad",
    "Null Pointers", "The Executives", "Synergy Seekers", "Quantum Quants"
];

export const departments: Department[] = ['IT', 'Marketing', 'Sales', 'HR', 'Finance'];
export const countries: Country[] = ['Italy', 'France', 'China', 'Germany', 'UK', 'Spain', 'Netherlands', 'Sweden', 'Norway', 'Japan', 'Finland', 'Belgium', 'Switzerland', 'Austria', 'Portugal'];
export const validScores: ValidScore[] = [1, 6, 16, 31];
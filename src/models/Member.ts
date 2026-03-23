export type Department = 'IT' | 'Marketing' | 'Sales' | 'HR' | 'Finance';
export type Country = 'Italy' | 'France' | 'China' | 'Germany' | 'UK' | 'Spain' | 'Netherlands' | 'Sweden' | 'Norway' | 'Japan' | 'Finland' | 'Belgium' | 'Switzerland' | 'Austria' | 'Portugal';
export type ValidScore = 1 | 6 | 16 | 31;

export interface Member {
    id: number;
    name: string;
    department: Department;
    country: Country;
    joinDate: string;
    score: ValidScore;
    teamId: number | null;
};
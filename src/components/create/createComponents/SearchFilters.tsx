import { Input } from "@fluentui/react-components";

interface SearchFiltersProps {
    nameFilter: string;
    setNameFilter: (value: string) => void;
    departmentFilter: string;
    setDepartmentFilter: (value: string) => void;
    countryFilter: string;
    setCountryFilter: (value: string) => void;
}

export default function SearchFilters({
    nameFilter,
    setNameFilter,
    departmentFilter,
    setDepartmentFilter,
    countryFilter,
    setCountryFilter
}: SearchFiltersProps) {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '10px' }}>
            <Input
                value={nameFilter}
                onChange={(event) => setNameFilter((event.target as HTMLInputElement).value)}
                placeholder="Nome"
            />
            <Input
                value={departmentFilter}
                onChange={(event) => setDepartmentFilter((event.target as HTMLInputElement).value)}
                placeholder="Dipartimento"
            />
            <Input
                value={countryFilter}
                onChange={(event) => setCountryFilter((event.target as HTMLInputElement).value)}
                placeholder="Nazione"
            />
        </div>
    );
};
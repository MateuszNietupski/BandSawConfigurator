import { useState, useMemo, useEffect } from 'react';
import { compatibleMachineIds } from "../utils/compatibleMachineIds";

export function useSawFilters(saws, machines) {
    const [viewMode, setViewMode] = useState('saws');
    const [selectedMachine, setSelectedMachine] = useState(null);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedManufacturers, setSelectedManufacturers] = useState([]);
    const [lengthRange, setLengthRange] = useState([0, 0]);
    const [selectedTpi, setSelectedTpi] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [machineSearch, setMachineSearch] = useState('');

    const sawTypes = useMemo(() => [...new Set(saws.map((s) => s.Type))].sort(), [saws]);
    const manufacturers = useMemo(() => [...new Set(machines.map((m) => m.manufacturer))].sort(), [machines]);
    const tpiOptions = useMemo(() => {
        const rawValues = saws.map((s) => String(s.Tpi || "").trim());
        const unique = [...new Set(rawValues)].filter(Boolean);

        return unique.sort((a, b) => {
            const [aMin, aMax] = a.split('/').map(parseFloat);
            const [bMin, bMax] = b.split('/').map(parseFloat);
            if (aMin !== bMin) {
                return aMin - bMin;
            }
            return (aMax || 0) - (bMax || 0);
        });
    }, [saws]);
    const categoryOptions = useMemo(() => {
        const raw = machines.map(m => m.category).filter(Boolean);
        return [...new Set(raw)].sort();
    }, [machines]);

    const lengthSteps = useMemo(() => {
        const available = saws.filter((saw) => {
            if (selectedMachine) {
                const compatible = compatibleMachineIds(saw, machines);
                if (!compatible.includes(selectedMachine.id)) return false;
            }
            if (selectedTypes.length > 0 && !selectedTypes.includes(saw.Type)) return false;
            if (selectedTpi.length > 0 && !selectedTpi.includes(saw.Tpi)) return false;
            return true;
        });

        const unique = [...new Set(available.map((s) => Number(s.Length)))].sort((a, b) => a - b);
        return unique.length > 0 ? unique : [0];
    }, [saws, selectedMachine, selectedTypes, selectedTpi, machines]);

    useEffect(() => {
        setLengthRange([0, lengthSteps.length - 1]);
    }, [lengthSteps]);

    const filteredSaws = useMemo(() => {
        return saws.filter((saw) => {
            if (selectedMachine) {
                const compatible = compatibleMachineIds(saw, machines);
                if (!compatible.includes(selectedMachine.id)) return false;
            }
            if (selectedTypes.length > 0 && !selectedTypes.includes(saw.Type)) return false;
            if (selectedTpi.length > 0 && !selectedTpi.includes(saw.Tpi)) return false;

            const currentLen = Number(saw.Length);
            const minVal = lengthSteps[lengthRange[0]];
            const maxVal = lengthSteps[lengthRange[1]];
            if (currentLen < minVal || currentLen > maxVal) return false;

            return true;

        });
    }, [saws, selectedMachine, selectedTypes, selectedTpi, lengthRange, lengthSteps, machines]);

  const filteredMachines = useMemo(() => {
    const query = (machineSearch || "").toLowerCase().trim();

    const filtered = machines.filter((m) => {
        const matchesManufacturer = selectedManufacturers.length === 0 ||
            selectedManufacturers.includes(m.manufacturer);
        const matchesCategory = selectedCategories.length === 0 ||
            (m.category && selectedCategories.includes(m.category));
        const matchesSearch = !query ||
            (m.name && m.name.toLowerCase().includes(query)) ||
            (m.manufacturer && m.manufacturer.toLowerCase().includes(query));

        return matchesManufacturer && matchesCategory && matchesSearch;
    });
    if (query) {
        return filtered.sort((a, b) => {
            const nameA = (a.name || "").toLowerCase();
            const nameB = (b.name || "").toLowerCase();
            const manuA = (a.manufacturer || "").toLowerCase();
            const manuB = (b.manufacturer || "").toLowerCase();

            const startsA = nameA.startsWith(query) || manuA.startsWith(query);
            const startsB = nameB.startsWith(query) || manuB.startsWith(query);

            if (startsA && !startsB) return -1;
            if (!startsA && startsB) return 1;
            return 0;
        });
    }
    return filtered;
}, [machines, selectedManufacturers, selectedCategories, machineSearch]);

    const handlers = {
        handleSelectMachine: (machine) => {
            setSelectedTpi([]);
            setSelectedTypes([]);
            setLengthRange([0, 0]);
            setSelectedMachine(machine);
            setViewMode('saws');
        },
        handleClearMachine: () => setSelectedMachine(null),
        handleShowMachines: () => {
            setViewMode('machines');
            setSelectedManufacturers([]);
        },
        handleShowSaws: () => setViewMode('saws'),
        handleClearFilters: () => {
            setSelectedMachine(null);
            setSelectedTypes([]);
            setSelectedManufacturers([]);
            setSelectedTpi([]);
            setSelectedCategories([]);
            setLengthRange([0, 0]);
            setMachineSearch('');
        },
        setSelectedTypes,
        setSelectedManufacturers,
        setLengthRange,
        setSelectedTpi,
        setSelectedCategories,
        setMachineSearch,
    };

    const facetCounts = useMemo(() => {
        const countSaws = (field) => {
            const filters = {
                Type: selectedTypes,
                Tpi: selectedTpi,
                Length: lengthRange,
                MachineId: selectedMachine?.id
            };
            delete filters[field];

            return saws.reduce((acc, saw) => {
                const matchesOther = Object.entries(filters).every(([key, val]) => {
                    if (!val || (Array.isArray(val) && val.length === 0)) return true;

                    if (key === 'Length') {
                        const len = Number(saw.Length);
                        return len >= lengthSteps[val[0]] && len <= lengthSteps[val[1]];
                    }
                    if (key === 'MachineId') {
                        return compatibleMachineIds(saw, machines).includes(val);
                    }
                    return Array.isArray(val) ? val.includes(saw[key]) : saw[key] === val;
                });

                if (matchesOther) {
                    const v = saw[field];
                    acc[v] = (acc[v] || 0) + 1;
                }
                return acc;
            }, {});
        };

        const countMachines = (field) => {
            const filters = {
                manufacturer: selectedManufacturers,
                category: selectedCategories
            };
            delete filters[field];

            return machines.reduce((acc, m) => {
                const matchesOther = Object.entries(filters).every(([key, val]) => {
                    if (!val || val.length === 0) return true;
                    return val.includes(m[key]);
                });

                if (matchesOther) {
                    const v = m[field];
                    acc[v] = (acc[v] || 0) + 1;
                }
                return acc;
            }, {});
        };

        return {
            saws: {
                Type: countSaws('Type'),
                Tpi: countSaws('Tpi')
            },
            machines: {
                manufacturer: countMachines('manufacturer'),
                category: countMachines('category')
            }
        };
    }, [saws, machines, selectedTypes, selectedTpi, lengthRange, selectedMachine, lengthSteps, selectedManufacturers, selectedCategories, machineSearch]);

    return {
        state: {
            viewMode,
            selectedMachine,
            selectedTypes,
            selectedManufacturers,
            lengthRange,
            lengthSteps,
            selectedTpi,
            selectedCategories,
            machineSearch,
        },
        results: {
            filteredSaws,
            filteredMachines,
            sawTypes,
            manufacturers,
            tpiOptions,
            categoryOptions,
            facetCounts,
        },
        handlers
    };
}
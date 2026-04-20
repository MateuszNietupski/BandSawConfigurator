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

    // --- DANE POMOCNICZE (Opcje w filtrach) ---
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

    // --- LOGIKA SUWAKA (KROKI) ---
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

    // Reset suwaka przy zmianie dostępnych kroków
    useEffect(() => {
        setLengthRange([0, lengthSteps.length - 1]);
    }, [lengthSteps]);

    // --- FILTROWANIE GŁÓWNE ---
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
        return machines.filter((m) => {
            const matchesManufacturer = selectedManufacturers.length === 0 ||
                selectedManufacturers.includes(m.manufacturer);
            const matchesCategory = selectedCategories.length === 0 ||
                (m.category && selectedCategories.includes(m.category));
            return matchesManufacturer && matchesCategory;
        });
    }, [machines, selectedManufacturers, selectedCategories]);

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
        },
        setSelectedTypes,
        setSelectedManufacturers,
        setLengthRange,
        setSelectedTpi,
        setSelectedCategories
    };

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
        },
        results: {
            filteredSaws,
            filteredMachines,
            sawTypes,
            manufacturers,
            tpiOptions,
            categoryOptions
        },
        handlers
    };
}
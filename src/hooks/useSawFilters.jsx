import { useState, useMemo, useEffect } from 'react';
import { compatibleMachineIds } from "../utils/compatibleMachineIds";

export function useSawFilters(saws, machines) {
    const [viewMode, setViewMode] = useState('saws');
    const [selectedMachine, setSelectedMachine] = useState(null);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedManufacturers, setSelectedManufacturers] = useState([]);
    const [lengthRange, setLengthRange] = useState([0, 0]);

    // --- DANE POMOCNICZE (Opcje w filtrach) ---
    const sawTypes = useMemo(() => [...new Set(saws.map((s) => s.Type))].sort(), [saws]);
    const manufacturers = useMemo(() => [...new Set(machines.map((m) => m.manufacturer))].sort(), [machines]);

    // --- LOGIKA SUWAKA (KROKI) ---
    const lengthSteps = useMemo(() => {
        const available = saws.filter((saw) => {
            if (selectedMachine) {
                const compatible = compatibleMachineIds(saw, machines);
                if (!compatible.includes(selectedMachine.id)) return false;
            }
            if (selectedTypes.length > 0 && !selectedTypes.includes(saw.Type)) return false;
            return true;
        });

        const unique = [...new Set(available.map((s) => Number(s.Length)))].sort((a, b) => a - b);
        return unique.length > 0 ? unique : [0];
    }, [saws, selectedMachine, selectedTypes, machines]);

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
            const currentLen = Number(saw.Length);
            const minVal = lengthSteps[lengthRange[0]];
            const maxVal = lengthSteps[lengthRange[1]];
            if (currentLen < minVal || currentLen > maxVal) return false;

            return true;
        });
    }, [saws, selectedMachine, selectedTypes, lengthRange, lengthSteps, machines]);

    const filteredMachines = useMemo(() => {
        if (selectedManufacturers.length === 0) return machines;
        return machines.filter((m) => selectedManufacturers.includes(m.manufacturer));
    }, [machines, selectedManufacturers]);

    const handlers = {
        handleSelectMachine: (machine) => {
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
        },
        setSelectedTypes,
        setSelectedManufacturers,
        setLengthRange
    };

    return {
        state: { 
            viewMode, selectedMachine, selectedTypes, 
            selectedManufacturers, lengthRange, lengthSteps 
        },
        results: { filteredSaws, filteredMachines, sawTypes, manufacturers },
        handlers
    };
}
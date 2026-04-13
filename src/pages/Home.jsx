import React, { useMemo, useState } from 'react';
import Footer from "../components/Footer";
import { useMediaQuery, useTheme, CircularProgress } from "@mui/material";
import ProductGridDesktop from "../components/ProductDataGridDesktop";
import { Typography, Box, Link } from "@mui/material";
import FilterPanel from "../components/FiltersPanel";
import BuildIcon from '@mui/icons-material/Build';
import MachineDataGrid from "../components/MachineDataGrid";
import useMachines from "../hooks/useMachines.jsx";
import { compatibleMachineIds } from "../utils/compatibleMachineIds.jsx"
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';


export default function Home({ saws, loading }) {
    const theme = useTheme();
    const [selectedMachines, setSelectedMachines] = useState([]);
    const { machines } = useMachines();
    const [viewMode, setViewMode] = useState('saws'); // 'saws' | 'machines'
    const [selectedMachine, setSelectedMachine] = useState(null);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedManufacturers, setSelectedManufacturers] = useState([]);

    const sawTypes = useMemo(() => [...new Set(saws.map((s) => s.Type))].sort(), []);
    const manufacturers = useMemo(() => [...new Set(machines.map((m) => m.manufacturer))].sort(), []);

    const filteredSaws = useMemo(() => {
        return saws.filter((saw) => {
            if (selectedMachine) {
                const compatible = compatibleMachineIds(saw, machines);
                if (!compatible.includes(selectedMachine.id)) return false;
            }
            if (selectedTypes.length > 0 && !selectedTypes.includes(saw.Type)) return false;
            return true;
        })
            .map((p, index) => ({
                ...p,
                id: `row-${index}`,
                Length: Number(p.Length),
                Width: Number(p.Width),
                Thickness: Number(p.Thickness),
                Price: Number(p.Price)
            }));
        ;
    }, [selectedMachine, selectedTypes, machines]);

    const handleSelectMachine = (machine) => {
        setSelectedMachine(machine);
        setViewMode('saws');
    };

    const handleClearMachine = () => {
        setSelectedMachine(null);
    };

    const handleShowMachines = () => {
        setViewMode('machines');
    };

    const handleShowSaws = () => {
        setViewMode('saws');
    };

    const handleClearFilters = () => {
        setSelectedMachine(null);
        setSelectedTypes([]);
        setSelectedManufacturers([]);
    };

    const filteredMachines = useMemo(() => {
        if (selectedManufacturers.length === 0) return machines;
        return machines.filter((m) => selectedManufacturers.includes(m.manufacturer))
            .map((p, index) => ({
                ...p,
                id: `row-${index}`,
            }));
    }, [selectedManufacturers]);

    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const filterProps = {
        sawTypes,
        selectedTypes,
        onTypesChange: setSelectedTypes,
        onClearFilters: handleClearFilters,
        viewMode,
        selectedMachine,
        onShowMachines: handleShowMachines,
        onClearMachine: handleClearMachine,
        onShowSaws: handleShowSaws,
        manufacturers,
        selectedManufacturers,
        onManufacturersChange: setSelectedManufacturers,
    };

    const MobileHeader = ({ filteredCount, totalCount, viewMode }) => (
        <Box
            sx={{
                px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider',
                bgcolor: 'background.paper', display: 'flex', alignItems: 'center', gap: 1.5,
            }}
        >
            <Link href="https://www.e-darmet.pl/darmet/darmet_logo_1.png" target="_blank" rel="noopener" sx={{ display: 'flex', textDecoration: 'none' }}>
                <Box
                    sx={{
                        width: 100, height: 36, bgcolor: 'primary.main', borderRadius: 1,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', fontWeight: 700, fontSize: 10, letterSpacing: 1,
                    }}
                >
                    <img
                        src="/darmet_logo_1.png"
                        alt="Darmet"
                        style={{
                            height: 40,
                            objectFit: "contain",
                        }}
                    />
                </Box>
            </Link>
            <Typography variant="subtitle1" fontWeight={700} color="primary.main" sx={{ flex: 1 }}>
                {viewMode === 'machines' ? 'Wybierz maszynę' : 'Konfigurator Pił'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
                {filteredCount}/{totalCount}
            </Typography>
        </Box>
    );

    const DesktopHeader = ({ filteredCount, totalCount, viewMode }) => (
        <Box
            sx={{
                px: 3, py: 2, borderBottom: '1px solid', borderColor: 'divider',
                display: 'flex', alignItems: 'center', gap: 1.5, bgcolor: 'background.paper',
            }}
        >
            {viewMode === 'machines' ? (
                <PrecisionManufacturingIcon color="primary" />
            ) : (
                <BuildIcon color="primary" />
            )}
            <Typography variant="h5" fontWeight={700} color="primary.main">
                {viewMode === 'machines' ? 'Wybierz maszynę' : 'Konfigurator Pił Taśmowych'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
                {viewMode === 'machines'
                    ? `Dostępne maszyny: ${totalCount}`
                    : `Wyświetlono: ${filteredCount} / ${totalCount} piły`
                }
            </Typography>
        </Box>
    ); if (loading) return <CircularProgress />;
    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', height: 'auto', overflow: 'hidden' }}>
                {!isMobile && <FilterPanel {...filterProps} />}

                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    {isMobile ? (
                        <>
                            <MobileHeader
                                filteredCount={viewMode === 'machines' ? filteredMachines.length : filteredSaws.length}
                                totalCount={viewMode === 'machines' ? machines.length : saws.length}
                                viewMode={viewMode}
                            />
                            <FilterPanel {...filterProps} />
                        </>
                    ) : (
                        <DesktopHeader
                            filteredCount={viewMode === 'machines' ? filteredMachines.length : filteredSaws.length}
                            totalCount={viewMode === 'machines' ? machines.length : saws.length}
                            viewMode={viewMode}
                        />
                    )}

                    <Box sx={{ flex: 1, p: isMobile ? 1 : 2 }}>
                        {viewMode === 'machines' ? (
                            <MachineDataGrid machines={filteredMachines} onSelectMachine={handleSelectMachine} />
                        ) : (
                            <ProductGridDesktop rows={filteredSaws} />
                        )}
                    </Box>
                </Box>
            </Box>
            <Footer />
        </>
    )
}

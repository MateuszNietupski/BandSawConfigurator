import React from 'react';
import Footer from "../components/Footer";
import { useMediaQuery, useTheme, CircularProgress } from "@mui/material";
import ProductGridDesktop from "../components/ProductDataGridDesktop";
import { Box } from "@mui/material";
import FilterPanel from "../components/FiltersPanel";
import MachineDataGrid from "../components/MachineDataGrid";
import useMachines from "../hooks/useMachines.jsx";
import { useSawFilters } from '../hooks/useSawFilters.jsx';
import MobileHeader from '../components/MobileHeader.jsx';
import DesktopHeader from '../components/DesktopHeader.jsx';


export default function Home({ saws, loading }) {
    const theme = useTheme();
    const { machines } = useMachines();
    const { state, results, handlers } = useSawFilters(saws, machines);

    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const filterProps = {
        sawTypes: results.sawTypes,
        manufacturers: results.manufacturers,
        lengthSteps: state.lengthSteps,
        tpiOptions: results.tpiOptions,
        categoryOptions: results.categoryOptions,
        facetCounts: results.facetCounts,

        selectedTypes: state.selectedTypes,
        selectedMachine: state.selectedMachine,
        selectedManufacturers: state.selectedManufacturers,
        selectedCategories: state.selectedCategories,
        lengthSteps: state.lengthSteps,
        lengthRange: state.lengthRange,
        viewMode: state.viewMode,
        selectedTpi: state.selectedTpi,
        machineSearch: state.machineSearch,

        onTpiChange: handlers.setSelectedTpi,
        onTypesChange: handlers.setSelectedTypes,
        onManufacturersChange: handlers.setSelectedManufacturers,
        onCategoriesChange: handlers.setSelectedCategories,
        onLengthChange: handlers.setLengthRange,
        onClearFilters: handlers.handleClearFilters,
        onShowMachines: handlers.handleShowMachines,
        onClearMachine: handlers.handleClearMachine,
        onShowSaws: handlers.handleShowSaws,
        onMachineSearchChange: handlers.setMachineSearch,
    };

    if (loading) return <CircularProgress />;

    const counts = {
        filtered: state.viewMode === 'machines' ? results.filteredMachines.length : results.filteredSaws.length,
        total: state.viewMode === 'machines' ? machines.length : saws.length
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Box sx={{
                display: 'flex',
                flex: 1,
                flexDirection: isMobile ? 'column' : 'row',
                overflow: 'hidden'
            }}>
                {!isMobile && <FilterPanel {...filterProps} />}

                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    {isMobile ? (
                        <>
                            <MobileHeader
                                filteredCount={counts.filtered}
                                totalCount={counts.total}
                                viewMode={state.viewMode}
                            />
                            <FilterPanel {...filterProps} />
                        </>
                    ) : (
                        <DesktopHeader
                            filteredCount={counts.filtered}
                            totalCount={counts.total}
                            viewMode={state.viewMode}
                        />
                    )}

                    <Box sx={{ flex: 1, p: isMobile ? 1 : 2 }}>
                        {state.viewMode === 'machines' ? (
                            <MachineDataGrid
                                machines={results.filteredMachines}
                                onSelectMachine={handlers.handleSelectMachine}
                            />
                        ) : (
                            <ProductGridDesktop
                                rows={results.filteredSaws}
                                selectedMachine={state.selectedMachine}
                            />
                        )}
                    </Box>
                </Box>
            </Box>
            <Footer />
        </Box>
    )
}

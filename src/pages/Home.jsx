import React, { useMemo, useState } from 'react';
import Footer from "../components/Footer";
import { useMediaQuery, useTheme, CircularProgress } from "@mui/material";
import ProductGridDesktop from "../components/ProductDataGridDesktop";
import { Typography, Box } from "@mui/material";
import FilterPanel from "../components/FiltersPanel";


export default function Home({ products, loading }) {
    const machines = [];
    const theme = useTheme();
    const [selectedMachines, setSelectedMachines] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const sawTypes = useMemo(() => {
        return [...new Set(products.map((s) => s.Type))].sort();
    }, []);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            if (selectedMachines.length > 0 && !selectedMachines.some((mid) => product.compatibleMachines.includes(mid))) return false;
            if (selectedTypes.length > 0 && !selectedTypes.includes(product.Type)) {
                return false;
            }
            return true;
        });
    }, [selectedTypes]);

    const handleClearFilters = () => {
        setSelectedMachines([]);
        setSelectedTypes([]);
    };

    const filterProps = {
        machines, sawTypes, selectedMachines, selectedTypes,
        onMachinesChange: setSelectedMachines,
        onTypesChange: setSelectedTypes,
        onClearFilters: handleClearFilters,
    };

    const rows = filteredProducts.map((p, index) => ({
        id: index + 1,
        Title: p.Title,
        Image: p.Image,
        URL: p.Title_URL,
        Type: p.Type,
        Length: Number(p.Length),
        Width: Number(p.Width),
        Thickness: Number(p.Thickness),
        Tpi: p.Tpi,
        Price: p.Price,
    }));
    console.log(rows);
    if (loading) return <CircularProgress />;
    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', height: 'auto', overflow: 'hidden' }}>
                {!isMobile && <FilterPanel {...filterProps} />}

                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <Box
                        sx={{
                            px: 3,
                            py: 2,
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            bgcolor: 'background.paper',
                        }}
                    >

                        <Typography variant="h5" fontWeight={700} color="primary.main">
                            Konfigurator Pił Taśmowych
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
                            Wyświetlono: {filteredProducts.length} / {rows.length} piły
                        </Typography>
                    </Box>

                    <Box sx={{ flex: 1, p: 2 }}>
                        <ProductGridDesktop rows={rows} />
                    </Box>
                </Box>
            </Box>
            <Footer />
        </>
    )
}

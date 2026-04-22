import React, { useState } from 'react';
import {
    Box, Typography,
    Chip, Divider, Button,
    useMediaQuery, useTheme,
    Accordion, AccordionSummary, AccordionDetails, Badge, IconButton, Tooltip, Link
} from '@mui/material';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import LengthFilter from './filters/LengthFilter.jsx';
import SawTypeFilter from './filters/SawTypeFilter.jsx';
import TpiFilter from './filters/TpiFilter.jsx';
import MachineCategoryFilter from './filters/MachineCategoryFilter.jsx';
import ManufacturerFilter from './filters/ManufacturerFilter.jsx';

const ClearButton = ({ onClick, size = 'small', label = "Wyczyść" }) => (
    <Button
        size={size}
        startIcon={<FilterAltOffIcon />}
        onClick={onClick}
        color="inherit"
        sx={{ whiteSpace: 'nowrap', textTransform: 'none' }}
    >
        {label}
    </Button>
);

const SectionTitle = ({ children, extra }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1, mt: 2 }}>
        <Typography variant="body2" fontWeight={600} color="text.secondary">
            {children}
        </Typography>
        {extra}
    </Box>
);

const FilterPanel = ({
    sawTypes,
    selectedTypes,
    onTypesChange,
    onClearFilters,
    viewMode,
    selectedMachine,
    onShowMachines,
    onClearMachine,
    onShowSaws,
    manufacturers = [],
    selectedManufacturers = [],
    onManufacturersChange,
    lengthSteps,
    lengthRange,
    onLengthChange,
    selectedTpi = [],
    tpiOptions = [],
    onTpiChange,
    selectedCategories = [],
    categoryOptions = [],
    onCategoriesChange,
    facetCounts,
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isMachineView = viewMode === 'machines';
    const [expandedPanel, setExpandedPanel] = useState(null);

    const renderTypeFilter = (size = "medium") => (
        <SawTypeFilter
            value={selectedTypes}
            options={sawTypes}
            onChange={onTypesChange}
            size={size}
            facetCounts={facetCounts?.saws?.Type || {}}
        />
    );

    const renderManufacturerFilter = (size = "medium") => (
        <ManufacturerFilter
            value={selectedManufacturers}
            options={manufacturers}
            onChange={onManufacturersChange}
            size={size}
            facetCounts={facetCounts?.machines?.manufacturer || {}}
        />
    );

    const renderLengthSlider = () => (
        <LengthFilter
            steps={lengthSteps}
            range={lengthRange}
            onChange={onLengthChange}
            isMachineSelected={!!selectedMachine}
        />
    );

    const renderTpiFilter = (size = "medium") => (
        <TpiFilter
            value={selectedTpi}
            options={tpiOptions}
            onChange={onTpiChange}
            size={size}
            facetCounts={facetCounts.saws.Tpi}
        />
    );

    const renderCategoryFilter = (size = "medium") => (
        <MachineCategoryFilter
            value={selectedCategories}
            options={categoryOptions}
            onChange={onCategoriesChange}
            size={size}
            facetCounts={facetCounts.machines.category}
        />
    );

    // --- WIDOK MOBILNY ---
    if (isMobile) {
        // Liczniki aktywnych filtrów per sekcja
        const typesTpiCount = selectedTypes.length + selectedTpi.length;
        const lengthActive = lengthSteps && lengthSteps.length > 1
            && (lengthRange[0] !== 0 || lengthRange[1] !== lengthSteps.length - 1);
        const lengthCount = lengthActive ? 1 : 0;
        const hasAnySawFilter = !!selectedMachine || typesTpiCount > 0 || lengthCount > 0;

        // Auto-rozwijanie: sekcja otwarta gdy ma aktywne filtry (chyba że user ręcznie zmienił)
        const autoExpanded = (panelId) => {
            if (expandedPanel !== null) return expandedPanel === panelId;
            if (panelId === 'typesTpi') return typesTpiCount > 0;
            if (panelId === 'length') return lengthCount > 0;
            return false;
        };

        const handleAccordionChange = (panelId) => (_, isExpanded) => {
            setExpandedPanel(isExpanded ? panelId : false);
        };

        if (isMachineView) {
            // Widok maszyn — zostawiamy bez akordeonu (tylko 2 pola)
            return (
                <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Button onClick={onShowSaws} startIcon={<ListAltIcon />} size="small" sx={{ textTransform: 'none' }}>
                                Wróć do pił
                            </Button>
                            {(selectedManufacturers.length > 0 || selectedCategories.length > 0) && (
                                <Tooltip title="Wyczyść filtry maszyn">
                                    <IconButton
                                        size="small"
                                        onClick={() => { onManufacturersChange([]); onCategoriesChange([]); }}
                                    >
                                        <FilterAltOffIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Box sx={{ flex: 1 }}>{renderManufacturerFilter('small')}</Box>
                            <Box sx={{ flex: 1 }}>{renderCategoryFilter('small')}</Box>
                        </Box>
                    </Box>
                </Box>
            );
        }

        // ===== Widok pił (mobile) — Maszyna na górze + akordeony =====
        return (
            <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
                <Box sx={{ px: 2, py: 1.5, display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        {selectedMachine ? (
                            <Chip
                                icon={<PrecisionManufacturingIcon />}
                                label={selectedMachine.name}
                                onDelete={onClearMachine}
                                color="primary"
                                variant="outlined"
                                sx={{
                                    width: '100%',
                                    height: 'auto',
                                    py: 0.75,
                                    fontWeight: 600,
                                    '& .MuiChip-label': {
                                        whiteSpace: 'normal',
                                        py: 0.25,
                                        overflow: 'visible',
                                        textOverflow: 'clip',
                                    },
                                }}
                            />
                        ) : (
                            <Button
                                fullWidth
                                variant="outlined"
                                size="medium"
                                startIcon={<PrecisionManufacturingIcon />}
                                onClick={onShowMachines}
                                sx={{ textTransform: 'none', justifyContent: 'flex-start', fontWeight: 600 }}
                            >
                                Wybierz maszynę
                            </Button>
                        )}
                    </Box>
                    {hasAnySawFilter && (
                        <Tooltip title="Wyczyść wszystkie filtry">
                            <IconButton
                                onClick={onClearFilters}
                                size="medium"
                                sx={{ flexShrink: 0, border: '1px solid', borderColor: 'divider' }}
                            >
                                <FilterAltOffIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )}
                </Box>



                <Box sx={{ px: 2, pb: 1.5 }}>
                    <Badge
                        badgeContent={selectedTypes.length}
                        color="primary"
                        invisible={selectedTypes.length === 0}
                        sx={{ width: '100%', '& .MuiBadge-badge': { top: 4, right: 20 } }}
                    >
                        {renderTypeFilter('small')}
                    </Badge>
                </Box>

                <Box sx={{ px: 2, pb: 2 }}>
                    <Badge
                        badgeContent={selectedTpi.length}
                        color="primary"
                        invisible={selectedTpi.length === 0}
                        sx={{ width: '100%', '& .MuiBadge-badge': { top: 4, right: 20 } }}
                    >
                        {renderTpiFilter('small')}
                    </Badge>
                </Box>

                <Accordion
                    expanded={autoExpanded('length')}
                    onChange={handleAccordionChange('length')}
                    disableGutters
                    elevation={0}
                    square
                    sx={{
                        '&:before': { display: 'none' },
                        borderTop: '1px solid',
                        borderColor: 'divider',

                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        sx={{ minHeight: 44, '& .MuiAccordionSummary-content': { my: 0.75 } }}
                    >
                        <Badge badgeContent={lengthCount} color="primary" sx={{ '& .MuiBadge-badge': { right: -16 } }}>
                            <Typography variant="body2" fontWeight={600}>
                                Długość piły
                            </Typography>
                        </Badge>
                    </AccordionSummary>
                    <AccordionDetails sx={{ pt: 0, pb: 2 }}>
                        {renderLengthSlider()}
                    </AccordionDetails>
                </Accordion>
            </Box>
        );
    }

    // --- WIDOK DESKTOP ---
    return (
        <Box sx={{ width: 280, borderRight: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', display: 'flex', flexDirection: 'column' }}>
            <Link
                href="https://www.e-darmet.pl"
                target="_blank"
                rel="noopener"
                sx={{
                    textDecoration: 'none',
                    display: 'block',
                    '&:hover .logo-box': { filter: 'brightness(0.9)' }, 
                    '&:hover .text-link': { color: 'primary.main' }
                }}
            >
                <Box sx={{ p: 2.5, textAlign: 'center', borderBottom: '1px solid', borderColor: 'divider' }}>
                    <Box sx={{ bgcolor: 'primary.main', p: 1, borderRadius: 1, mb: 1 }}>
                        <img src="/darmet_logo_1.png" alt="Darmet" style={{ height: 40, objectFit: "contain" }} />
                    </Box>
                    <Typography variant="caption" color="text.secondary">wróć do strony głównej</Typography>
                </Box>
            </Link>

            <Box sx={{ p: 2.5, overflowY: 'auto' }}>
                {isMachineView ? (
                    <>
                        <SectionTitle
                            extra={(selectedManufacturers.length > 0 || selectedCategories.length > 0) && (
                                <ClearButton onClick={() => {
                                    onManufacturersChange([]);
                                    onCategoriesChange([]);
                                }} />
                            )}
                        >
                            FILTRY MASZYN
                        </SectionTitle>
                        <Typography variant="caption" fontWeight={700} sx={{ display: 'block', mb: 1, mt: 1 }}>
                            PRODUCENCI
                        </Typography>
                        {renderManufacturerFilter()}

                        <Divider sx={{ mb: 3 }} />
                        <Typography variant="caption" fontWeight={700} sx={{ display: 'block', mb: 1 }}>
                            TYP MASZYNY
                        </Typography>
                        <Box sx={{ mb: 4 }}>
                            {renderCategoryFilter()}
                        </Box>

                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={onShowSaws}
                            startIcon={<ListAltIcon />}
                            sx={{ mt: 2 }}
                        >
                            Wróć do pił
                        </Button>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                mt: 1.5,
                                px: 1,
                                lineHeight: 1.2
                            }}
                        >
                            <InfoOutlinedIcon sx={{ fontSize: 16 }} />
                            Wróć do listy pił taśmowych bez wybierania konkretnego modelu maszyny
                        </Typography>
                    </>
                ) : (
                    <>
                        <SectionTitle extra={<ClearButton onClick={onClearFilters} />}>
                            FILTRY PIŁ
                        </SectionTitle>

                        <Typography variant="caption" fontWeight={700} sx={{ display: 'block', mb: 1 }}>MASZYNA</Typography>
                        {selectedMachine ? (
                            <Chip
                                label={selectedMachine.name}
                                onDelete={onClearMachine}
                                color="primary"
                                variant="outlined"
                                sx={{ width: '100%', mb: 2 }}
                            />
                        ) : (
                            <Button fullWidth variant="outlined" onClick={onShowMachines} sx={{ mb: 2 }}>
                                Wybierz maszynę
                            </Button>
                        )}

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="caption" fontWeight={700} sx={{ display: 'block', mb: 1 }}>TYP PRODUKTU</Typography>
                        {renderTypeFilter()}

                        <Divider sx={{ my: 2 }} />
                        <Typography variant="caption" fontWeight={700} sx={{ display: 'block', mb: 1 }}>
                            Liczba zębów na cal (TPI)
                        </Typography>
                        {renderTpiFilter()}

                        <Divider sx={{ my: 2 }} />

                        {renderLengthSlider()}
                    </>
                )}
            </Box>
        </Box>
    );
};

export default FilterPanel;
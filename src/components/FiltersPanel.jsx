import React from 'react';
import {
    Box, Typography, FormControl, InputLabel, Select, MenuItem,
    Chip, OutlinedInput, Checkbox, ListItemText, Divider,
    Button, useMediaQuery, useTheme, Slider,
} from '@mui/material';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LengthFilter from './LengthFilter.jsx'

// --- PODKOMPONENTY POMOCNICZE ---

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

// --- GŁÓWNY KOMPONENT ---

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
    onLengthChange
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isMachineView = viewMode === 'machines';

    const handleSliderChange = (event, newValue) => onLengthChange(newValue);
    const valueLabelFormat = (index) => lengthSteps[index] ? `${lengthSteps[index]} mm` : "";

    // --- RENDERERY SEKCJI ---

    const renderTypeFilter = (size = "medium") => (
        <FormControl fullWidth size={size}>
            <InputLabel>Typ piły</InputLabel>
            <Select
                multiple
                value={selectedTypes}
                onChange={(e) => onTypesChange(e.target.value)}
                input={<OutlinedInput label="Typ piły" />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((type) => <Chip key={type} label={type} size="small" />)}
                    </Box>
                )}
            >
                {sawTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                        <Checkbox checked={selectedTypes.includes(type)} size="small" />
                        <ListItemText primary={type} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );

    const renderManufacturerFilter = (size = "medium") => (
        <FormControl fullWidth size={size}>
            <InputLabel>Producent</InputLabel>
            <Select
                multiple
                value={selectedManufacturers}
                onChange={(e) => onManufacturersChange(e.target.value)}
                input={<OutlinedInput label="Producent" />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((m) => <Chip key={m} label={m} size="small" />)}
                    </Box>
                )}
            >
                {manufacturers.map((m) => (
                    <MenuItem key={m} value={m}>
                        <Checkbox checked={selectedManufacturers.includes(m)} size="small" />
                        <ListItemText primary={m} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );

    const renderLengthSlider = () => (
        <LengthFilter
            steps={lengthSteps}
            range={lengthRange}
            onChange={onLengthChange}
        />
    );

    // --- WIDOK MOBILNY ---
    if (isMobile) {
        return (
            <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {isMachineView ? (
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <Button variant="outlined" size="small" onClick={onShowSaws} startIcon={<ListAltIcon />}>
                                Wróć
                            </Button>
                            <Box sx={{ flex: 1 }}>{renderManufacturerFilter("small")}</Box>
                        </Box>
                    ) : (
                        <>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                {selectedMachine ? (
                                    <Chip
                                        label={selectedMachine.name}
                                        onDelete={onClearMachine}
                                        color="primary"
                                        size="small"
                                    />
                                ) : (
                                    <Button variant="outlined" size="small" onClick={onShowMachines}>Maszyna</Button>
                                )}
                                <Box sx={{ flex: 1 }}>{renderTypeFilter("small")}</Box>
                                <ClearButton onClick={onClearFilters} />
                            </Box>
                            {renderLengthSlider()}
                        </>
                    )}
                </Box>
            </Box>
        );
    }

    // --- WIDOK DESKTOP ---
    return (
        <Box sx={{ width: 280, borderRight: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', display: 'flex', flexDirection: 'column' }}>
            {/* Logo Section */}
            <Box sx={{ p: 2.5, textAlign: 'center', borderBottom: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ bgcolor: 'primary.main', p: 1, borderRadius: 1, mb: 1 }}>
                    <img src="/darmet_logo_1.png" alt="Darmet" style={{ height: 40, objectFit: "contain" }} />
                </Box>
                <Typography variant="caption" color="text.secondary">wróć do strony głównej</Typography>
            </Box>

            <Box sx={{ p: 2.5, overflowY: 'auto' }}>
                {isMachineView ? (
                    <>
                        <SectionTitle
                            extra={selectedManufacturers.length > 0 && <ClearButton onClick={() => onManufacturersChange([])} />}
                        >
                            PRODUCENCI
                        </SectionTitle>
                        {renderManufacturerFilter()}

                        <Typography variant="body2" color="text.secondary" sx={{ mt: 3, mb: 2, fontStyle: 'italic' }}>
                            Wybierz producenta, aby przefiltrować listę maszyn.
                        </Typography>

                        <Button fullWidth variant="outlined" onClick={onShowSaws} startIcon={<ListAltIcon />}>
                            Pokaż wszystkie piły
                        </Button>
                    </>
                ) : (
                    <>
                        <SectionTitle extra={<ClearButton onClick={onClearFilters} />}>
                            FILTRY PIŁ
                        </SectionTitle>

                        {/* Sekcja Maszyny */}
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

                        {/* Sekcja Typu */}
                        <Typography variant="caption" fontWeight={700} sx={{ display: 'block', mb: 1 }}>TYP PRODUKTU</Typography>
                        {renderTypeFilter()}

                        <Divider sx={{ my: 2 }} />

                        {/* Sekcja Suwaka */}
                        <Typography variant="caption" fontWeight={700} sx={{ display: 'block', mb: 1 }}>DŁUGOŚĆ PIŁY (MM)</Typography>
                        {renderLengthSlider()}
                    </>
                )}
            </Box>
        </Box>
    );
};

export default FilterPanel;
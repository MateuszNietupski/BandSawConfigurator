import React from 'react';
import {
    Box,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    OutlinedInput,
    Checkbox,
    ListItemText,
    Divider,
    Button,
    Link,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import CancelIcon from '@mui/icons-material/Cancel';
import ListAltIcon from '@mui/icons-material/ListAlt';

const ClearButton = ({ onClick, size = 'small' }) => (
    <Button size={size} startIcon={<FilterAltOffIcon />} onClick={onClick} color="inherit" sx={{ whiteSpace: 'nowrap' }}>
        Wyczyść
    </Button>
);

const TypeSelect = ({ sawTypes, selectedTypes, onTypesChange, size, labelId }) => (
    <Select
        labelId={labelId}
        multiple
        value={selectedTypes}
        onChange={(e) => onTypesChange(e.target.value)}
        input={<OutlinedInput label="Typ piły" />}
        renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((type) => (
                    <Chip key={type} label={type} size="small" />
                ))}
            </Box>
        )}
    >
        {sawTypes.map((type) => (
            <MenuItem key={type} value={type}>
                <Checkbox checked={selectedTypes.includes(type)} size={size} />
                <ListItemText primary={type} />
            </MenuItem>
        ))}
    </Select>
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
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const hasFilters = selectedTypes.length > 0 || !!selectedMachine || selectedManufacturers.length > 0;
    const isMachineView = viewMode === 'machines';

    if (isMobile) {
        return (
            <Box
                sx={{
                    px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider',
                    bgcolor: 'background.paper', display: 'flex', alignItems: 'center',
                    gap: 2, flexWrap: 'wrap',
                }}
            >
                {isMachineView ? (
                    <>
                        <Button
                            size="small"
                            variant="outlined"
                            startIcon={<ListAltIcon />}
                            onClick={onShowSaws}
                            sx={{ textTransform: 'none', fontWeight: 600 }}
                        >
                            ← Wróć do pił
                        </Button>
                        <FormControl size="small" sx={{ minWidth: 140, flex: 1 }}>
                            <InputLabel id="manufacturer-filter-label-mobile">Producent</InputLabel>
                            <Select
                                labelId="manufacturer-filter-label-mobile"
                                multiple
                                value={selectedManufacturers}
                                onChange={(e) => onManufacturersChange(e.target.value)}
                                input={<OutlinedInput label="Producent" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((m) => (
                                            <Chip key={m} label={m} size="small" />
                                        ))}
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
                        {selectedManufacturers.length > 0 && <ClearButton onClick={() => onManufacturersChange([])} />}
                    </>
                ) : (
                    <>
                        {selectedMachine ? (
                            <Chip
                                label={selectedMachine.name}
                                onDelete={onClearMachine}
                                deleteIcon={<CancelIcon />}
                                size="small"
                                color="primary"
                                variant="outlined"
                                sx={{ fontWeight: 600 }}
                            />
                        ) : (
                            <Button
                                size="small"
                                variant="outlined"
                                onClick={onShowMachines}
                                sx={{ textTransform: 'none', fontWeight: 600 }}
                            >
                                Wybierz maszynę
                            </Button>
                        )}

                        <FormControl size="small" sx={{ minWidth: 140, flex: 1 }}>
                            <InputLabel id="type-filter-label-mobile">Typ piły</InputLabel>
                            <TypeSelect sawTypes={sawTypes} selectedTypes={selectedTypes} onTypesChange={onTypesChange} size="small" labelId="type-filter-label-mobile" />
                        </FormControl>

                        {hasFilters && <ClearButton onClick={onClearFilters} />}
                    </>
                )}
            </Box>
        );
    }

    return (
        <Box
            sx={{
                width: 280, minWidth: 280, display: 'flex', flexDirection: 'column',
                borderRight: '1px solid', borderColor: 'divider', height: 'auto', bgcolor: 'background.paper',
            }}
        >
            <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Link href="https://www.e-darmet.pl/darmet/darmet_logo_1.png" target="_blank" rel="noopener" sx={{ display: 'block', textDecoration: 'none' }}>
                    <Box sx={{ width: 200, height: 60, bgcolor: 'primary.main', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14, letterSpacing: 1 }}>
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
                <Typography variant="caption" color="text.secondary">przejdź do strony głównej</Typography>
            </Box>

            <Box sx={{ p: 2.5, overflowY: 'auto', flex: 1 }}>
                {isMachineView ? (
                    <>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                            <Typography variant="h6" fontWeight={700} color="primary.main">Filtry maszyn</Typography>
                            {selectedManufacturers.length > 0 && <ClearButton onClick={() => onManufacturersChange([])} />}
                        </Box>

                        <Divider sx={{ mb: 3 }} />

                        <Typography variant="body2" fontWeight={600} color="text.secondary" sx={{ mb: 1 }}>
                            Producent
                        </Typography>
                        <FormControl fullWidth sx={{ mb: 3 }}>
                            <InputLabel id="manufacturer-filter-label">Producent</InputLabel>
                            <Select
                                labelId="manufacturer-filter-label"
                                multiple
                                value={selectedManufacturers}
                                onChange={(e) => onManufacturersChange(e.target.value)}
                                input={<OutlinedInput label="Producent" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((m) => (
                                            <Chip key={m} label={m} size="small" />
                                        ))}
                                    </Box>
                                )}
                            >
                                {manufacturers.map((m) => (
                                    <MenuItem key={m} value={m}>
                                        <Checkbox checked={selectedManufacturers.includes(m)} />
                                        <ListItemText primary={m} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Divider sx={{ mb: 3 }} />

                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            Kliknij „Wybierz maszynę" w tabeli, aby wyfiltrować piły kompatybilne z daną maszyną.
                        </Typography>

                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<ListAltIcon />}
                            onClick={onShowSaws}
                            sx={{ textTransform: 'none', fontWeight: 600 }}
                        >
                            Wróć do pił bez wyboru
                        </Button>
                    </>
                ) : (
                    <>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                            <Typography variant="h6" fontWeight={700} color="primary.main">Filtry</Typography>
                            {hasFilters && <ClearButton onClick={onClearFilters} />}
                        </Box>

                        <Divider sx={{ mb: 3 }} />

                        {/* Machine selection */}
                        <Typography variant="body2" fontWeight={600} color="text.secondary" sx={{ mb: 1 }}>
                            Maszyna
                        </Typography>
                        {selectedMachine ? (
                            <Chip
                                label={selectedMachine.name}
                                onDelete={onClearMachine}
                                deleteIcon={<CancelIcon />}
                                color="primary"
                                variant="outlined"
                                sx={{ fontWeight: 600, mb: 3, maxWidth: '100%' }}
                            />
                        ) : (
                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={onShowMachines}
                                sx={{ textTransform: 'none', fontWeight: 600, mb: 3, justifyContent: 'flex-start' }}
                            >
                                Wybierz maszynę
                            </Button>
                        )}

                        {/* Type filter */}
                        <FormControl fullWidth sx={{ mb: 3 }}>
                            <InputLabel id="type-filter-label">Typ piły</InputLabel>
                            <TypeSelect sawTypes={sawTypes} selectedTypes={selectedTypes} onTypesChange={onTypesChange} labelId="type-filter-label" />
                        </FormControl>

                        <Divider sx={{ my: 2 }} />
                        <Typography variant="body2" color="text.secondary">
                            Aktywne filtry: {(selectedMachine ? 1 : 0) + selectedTypes.length}
                        </Typography>
                    </>
                )}
            </Box>
        </Box>
    )
};

export default FilterPanel;
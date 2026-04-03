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

const MachineSelect = ({ machines, selectedMachines, onMachinesChange, size, labelId }) => (
    <Select
        labelId={labelId}
        multiple
        value={selectedMachines}
        onChange={(e) => onMachinesChange(e.target.value)}
        input={<OutlinedInput label="Maszyna" />}
        renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((id) => {
                    const machine = machines.find((m) => m.id === id);
                    return <Chip key={id} label={machine?.name ?? id} size="small" />;
                })}
            </Box>
        )}
    >
        {machines.map((machine) => (
            <MenuItem key={machine.id} value={machine.id}>
                <Checkbox checked={selectedMachines.includes(machine.id)} size={size} />
                <ListItemText primary={machine.name} secondary={machine.manufacturer} />
            </MenuItem>
        ))}
    </Select>
);

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
    machines,
    selectedMachines,
    sawTypes,
    selectedTypes,
    onMachinesChange,
    onTypesChange,
    onClearFilters,
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const hasFilters = selectedTypes.length > 0;

    if (isMobile) {
        return (
            <Box
                sx={{
                    px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider',
                    bgcolor: 'background.paper', display: 'flex', alignItems: 'center',
                    gap: 2, flexWrap: 'wrap',
                }}
            >
                <FormControl size="small" sx={{ minWidth: 160, flex: 1 }}>
                    <InputLabel id="machine-filter-label-mobile">Maszyna</InputLabel>
                    <MachineSelect machines={machines} selectedMachines={selectedMachines} onMachinesChange={onMachinesChange} size="small" labelId="machine-filter-label-mobile" />
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 140, flex: 1 }}>
                    <InputLabel id="type-filter-label-mobile">Typ piły</InputLabel>
                    <TypeSelect sawTypes={sawTypes} selectedTypes={selectedTypes} onTypesChange={onTypesChange} size="small" labelId="type-filter-label-mobile" />
                </FormControl>

                {hasFilters && <ClearButton onClick={onClearFilters} />}
            </Box>
        );
    }

    return (
        <Box
            sx={{
                width: 280,
                minWidth: 280,
                display: 'flex',
                flexDirection: 'column',
                borderRight: '1px solid',
                borderColor: 'divider',
                height: '100vh',
                bgcolor: 'background.paper',
            }}
        >
            {/* Logo area */}
            <Box
                sx={{
                    p: 2.5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Link
                    href="https://www.e-darmet.pl"
                    target="_blank"
                    rel="noopener"
                    sx={{ display: 'block', textDecoration: 'none' }}
                >
                    <Box
                        sx={{
                            width: 200,
                            height: 60,
                            bgcolor: 'primary.main',
                            borderRadius: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            fontWeight: 700,
                            fontSize: 14,
                            letterSpacing: 1,
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
                <Typography variant="caption" color="text.secondary">
                    przejdź do strony głównej
                </Typography>
            </Box>

            <Box sx={{ p: 2.5, overflowY: 'auto', flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="h6" fontWeight={700} color="primary.main">
                        Filtry
                    </Typography>
                    {hasFilters && (
                        <Button
                            size="small"
                            startIcon={<FilterAltOffIcon />}
                            onClick={onClearFilters}
                            color="inherit"
                        >
                            Wyczyść
                        </Button>
                    )}
                </Box>

                <Divider sx={{ mb: 3 }} />


                <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel id="machine-filter-label">Maszyna</InputLabel>
                    <MachineSelect machines={machines} selectedMachines={selectedMachines} onMachinesChange={onMachinesChange} labelId="machine-filter-label" />
                </FormControl>

                <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel id="type-filter-label">Typ piły</InputLabel>
                    <TypeSelect sawTypes={sawTypes} selectedTypes={selectedTypes} onTypesChange={onTypesChange} labelId="type-filter-label" />
                </FormControl>

                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" color="text.secondary">
                    Aktywne filtry: {selectedTypes.length}
                </Typography>
            </Box>
        </Box>
    );
};

export default FilterPanel;
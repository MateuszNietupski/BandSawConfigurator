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
} from '@mui/material';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

const FilterPanel = ({
    productsTypes,
    selectedTypes,
    onTypesChange,
    onClearFilters,
}) => {
    const hasFilters =  selectedTypes.length > 0;

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
                    <InputLabel id="type-filter-label">Typ piły</InputLabel>
                    <Select
                        labelId="type-filter-label"
                        multiple
                        value={selectedTypes}
                        onChange={(e) => onTypesChange(e.target.value)}
                        input={<OutlinedInput label="Typ piły" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selectedTypes.map((type) => (
                                    <Chip key={type} label={type} size="small" />
                                ))}
                            </Box>
                        )}
                    >
                        {productsTypes.map((type) => (
                            <MenuItem key={type} value={type}>
                                <Checkbox checked={selectedTypes.includes(type)} />
                                <ListItemText primary={type} />
                            </MenuItem>
                        ))}
                    </Select>
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
import React from 'react';
import {
    FormControl, InputLabel, Select, MenuItem, Box,
    Chip, OutlinedInput, Checkbox, ListItemText, Typography
} from '@mui/material';

const MachineManufacturerFilter = ({ value, options, onChange, size = 'medium', facetCounts = {} }) => {
    return (
        <FormControl fullWidth size={size}>
            <InputLabel id="manufacturer-select-label">Producent</InputLabel>
            <Select
                labelId="manufacturer-select-label"
                multiple
                value={value}
                onChange={(e) => onChange(e.target.value)}
                input={<OutlinedInput label="Producent" />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((m) => (
                            <Chip key={m} label={m} size="small" />
                        ))}
                    </Box>
                )}
                MenuProps={{
                    PaperProps: { sx: { maxHeight: 360, mt: 1 } },
                    anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                    transformOrigin: { vertical: 'top', horizontal: 'left' }
                }}
            >
                {options.map((m) => {
                    const count = facetCounts[m] || 0;
                    const isSelected = value.includes(m);

                    return (
                        <MenuItem
                            key={m}
                            value={m}
                            disabled={count === 0 && !isSelected}
                            sx={{
                                py: 0.5,
                                minHeight: 'auto',
                                opacity: count === 0 && !isSelected ? 0.6 : 1
                            }}
                        >
                            <Checkbox checked={isSelected} size="small" sx={{ p: 0.5 }} />
                            <ListItemText
                                primary={
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', pr: 1 }}>
                                        <Typography variant="body2" sx={{ fontWeight: isSelected ? 600 : 400 }}>
                                            {m}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            ({count})
                                        </Typography>
                                    </Box>
                                }
                            />
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
};

export default MachineManufacturerFilter;
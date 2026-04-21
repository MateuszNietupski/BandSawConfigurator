import React from 'react';
import {
    FormControl, InputLabel, Select, MenuItem, Box,
    Chip, OutlinedInput, Checkbox, ListItemText, Typography
} from '@mui/material';

const SawTypeFilter = ({ value, options, onChange, size = 'medium', facetCounts = {} }) => {
    return (
        <FormControl fullWidth size={size}>
            <InputLabel id="saw-type-select-label">Typ piły</InputLabel>
            <Select
                labelId="saw-type-select-label"
                multiple
                value={value}
                onChange={(e) => onChange(e.target.value)}
                input={<OutlinedInput label="Typ piły" />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((type) => (
                            <Chip key={type} label={type} size="small" />
                        ))}
                    </Box>
                )}
                MenuProps={{
                    PaperProps: { sx: { maxHeight: 360, mt: 1 } },
                    anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                    transformOrigin: { vertical: 'top', horizontal: 'left' }
                }}
            >
                {options.map((type) => {
                    const count = facetCounts[type] || 0;
                    const isSelected = value.includes(type);

                    return (
                        <MenuItem
                            key={type}
                            value={type}
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
                                            {type}
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

export default SawTypeFilter;
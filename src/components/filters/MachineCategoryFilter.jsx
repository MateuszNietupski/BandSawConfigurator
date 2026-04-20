import React from 'react';
import { 
    FormControl, 
    InputLabel, 
    Select, 
    OutlinedInput, 
    Box, 
    Chip, 
    MenuItem, 
    Checkbox, 
    ListItemText 
} from '@mui/material';

const MachineCategoryFilter = ({ value, options, onChange, size = "medium" }) => {
    return (
        <FormControl fullWidth size={size}>
            <InputLabel id="category-filter-label">Typ maszyny</InputLabel>
            <Select
                labelId="category-filter-label"
                multiple
                value={value}
                onChange={(e) => onChange(e.target.value)}
                input={<OutlinedInput label="Typ maszyny" />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((category) => (
                            <Chip key={category} label={category} size="small" />
                        ))}
                    </Box>
                )}
            >
                {options.map((category) => (
                    <MenuItem key={category} value={category}>
                        <Checkbox checked={value.includes(category)} size="small" />
                        <ListItemText primary={category} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default MachineCategoryFilter;
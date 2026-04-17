import React from 'react';
import {
    FormControl, InputLabel, Select, MenuItem, Box,
    Chip, OutlinedInput, Checkbox, ListItemText, Typography
} from '@mui/material';
import { getTpiHint } from '../../utils/sawConst';

const TpiFilter = ({ value, options, onChange, size = "medium" }) => (
    <FormControl fullWidth size={size}>
        <InputLabel id="tpi-select-label">Podziałka (TPI)</InputLabel>
        <Select
            labelId="tpi-select-label"
            multiple
            value={value}
            onChange={(e) => onChange(e.target.value)}
            input={<OutlinedInput label="Podziałka (TPI)" />}
            renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((t) => (
                        <Chip key={t} label={`${t} TPI`} size="small" />
                    ))}
                </Box>
            )}
        >
            {options.map((tpi) => (
                <MenuItem key={tpi} value={tpi} sx={{ flexDirection: 'column', alignItems: 'flex-start', py: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        <Checkbox checked={value.includes(tpi)} size="small" />
                        <ListItemText 
                            primary={<strong>{tpi} TPI</strong>} 
                            secondaryTypographyProps={{ fontSize: '0.7rem' }}
                        />
                    </Box>
                    <Typography
                        variant="caption"
                        sx={{
                            ml: 4, px: 0.8, py: 0.2,
                            bgcolor: '#f0f7ff', color: '#0e2135',
                            borderRadius: '4px', fontSize: '0.7rem',
                            border: '1px solid #d0e2f2'
                        }}
                    >
                        {getTpiHint(tpi)}
                    </Typography>
                </MenuItem>
            ))}
        </Select>
    </FormControl>
);

export default TpiFilter;
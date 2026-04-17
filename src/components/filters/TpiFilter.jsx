import React from 'react';
import {
    FormControl, InputLabel, Select, MenuItem, Box,
    Chip, OutlinedInput, Checkbox, ListItemText, Typography,
} from '@mui/material';
import { getTpiHint } from '../../utils/sawConst';

const TpiFilter = ({ value, options, onChange, size = 'medium' }) => (
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
            MenuProps={{
                PaperProps: { sx: { maxHeight: 360 } },
            }}
        >
            {options.map((tpi) => {
                const hint = getTpiHint(tpi);
                return (
                    <MenuItem
                        key={tpi}
                        value={tpi}
                        sx={{
                            py: 0.5,
                            minHeight: 'auto',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                        }}
                    >
                        <Checkbox
                            checked={value.includes(tpi)}
                            size="small"
                            sx={{ p: 0.5 }}
                        />
                        <ListItemText
                            primary={
                                <Typography variant="body2" fontWeight={700} sx={{ lineHeight: 1.2 }}>
                                    {tpi} TPI
                                </Typography>
                            }
                            sx={{ m: 0, flex: '0 0 auto', minWidth: 56 }}
                        />
                        {hint && (
                            <Typography
                                variant="caption"
                                title={hint}
                                sx={{
                                    flex: 1,
                                    px: 0.75,
                                    py: 0.25,
                                    bgcolor: 'primary.50',
                                    color: 'primary.dark',
                                    border: '1px solid',
                                    borderColor: 'primary.100',
                                    borderRadius: 0.75,
                                    fontSize: '0.7rem',
                                    lineHeight: 1.3,
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {hint}
                            </Typography>
                        )}
                    </MenuItem>
                );
            })}
        </Select>
    </FormControl>
);

export default TpiFilter;
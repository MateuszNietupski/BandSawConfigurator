import React from 'react';
import {
    FormControl, InputLabel, Select, MenuItem, Box,
    Chip, OutlinedInput, Checkbox, ListItemText, Typography, useMediaQuery, useTheme
} from '@mui/material';
import { getTpiHint } from '../../utils/sawConst';


const TpiFilter = ({ value, options, onChange, size = 'medium', facetCounts = {} }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
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
                    PaperProps: { 
                        sx: { 
                            maxHeight: 360,
                            marginTop: '8px'
                        } 
                    },
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                    },
                    transformOrigin: {
                        vertical: 'top',
                        horizontal: 'left',
                    }
                }}
            >
                {options.map((tpi) => {
                    const hint = getTpiHint(tpi, isMobile);
                    const count = facetCounts[tpi] || 0;
                    const isSelected = value.includes(tpi);

                    return (
                        <MenuItem
                            key={tpi}
                            value={tpi}
                            disabled={count === 0 && !isSelected}
                            sx={{
                                py: 0.5,
                                minHeight: 'auto',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                opacity: count === 0 && !isSelected ? 0.5 : 1
                            }}
                        >
                            <Checkbox
                                checked={isSelected}
                                size="small"
                                sx={{ p: 0.5 }}
                            />
                            <ListItemText
                                primary={
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <Typography variant="body2" fontWeight={700}>
                                            {tpi} TPI
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 400 }}>
                                            ({count})
                                        </Typography>
                                    </Box>
                                }
                                sx={{ m: 0, flex: '0 0 auto', minWidth: 80 }}
                            />
                            {hint && (
                                <Typography
                                    variant="caption"
                                    sx={{
                                        flex: 1,
                                        px: 0.75,
                                        py: 0.25,
                                        bgcolor: 'primary.50',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'primary.dark',
                                        border: '1px solid',
                                        borderColor: 'primary.100',
                                        borderRadius: 0.75,
                                        fontSize: '0.65rem',
                                        lineHeight: 1.2,
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
};

export default TpiFilter;
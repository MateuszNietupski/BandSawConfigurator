import React from 'react';
import {
    Autocomplete,
    TextField,
    Checkbox,
    Box,
    Typography,
    Chip
} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const MachineManufacturerFilter = ({ value, options, onChange, size = 'medium', facetCounts = {} }) => {
    return (
        <Autocomplete
            multiple
            size={size}
            options={options}
            disableCloseOnSelect
            value={value}
            onChange={(event, newValue) => {
                onChange(newValue);
            }}
            renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => (
                    <Chip
                        label={option}
                        {...getTagProps({ index })}
                        size="small"
                        key={option}
                    />
                ))
            }
            renderOption={(props, option, { selected }) => {
                const count = facetCounts[option] || 0;
                const isDisabled = count === 0 && !selected;

                return (
                    <li {...props} style={{
                        opacity: isDisabled ? 0.5 : 1,
                        pointerEvents: isDisabled ? 'none' : 'auto'
                    }}>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <Typography variant="body2">{option}</Typography>
                            <Typography variant="caption" color="text.secondary">
                                ({count})
                            </Typography>
                        </Box>
                    </li>
                );
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Producent"
                    placeholder={value.length === 0 ? "Szukaj..." : ""}
                />
            )}
            filterOptions={(options, state) => {
                const query = state.inputValue.toLowerCase().trim();
                const displayOptions = options.filter((f) =>
                    f.toLowerCase().includes(query)
                );
                return displayOptions.sort((a, b) => {
                    const valA = a.toLowerCase();
                    const valB = b.toLowerCase();
                    if (query) {
                        const startsA = valA.startsWith(query);
                        const startsB = valB.startsWith(query);
                        if (startsA && !startsB) return -1;
                        if (!startsA && startsB) return 1;
                    }
                    const countA = facetCounts[a] || 0;
                    const countB = facetCounts[b] || 0;
                    if (countB !== countA) return countB - countA;
                    return valA.localeCompare(valB);
                });
            }}
        />
    );
};

export default MachineManufacturerFilter;
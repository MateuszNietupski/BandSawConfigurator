import { Slider, Box, Typography, Chip } from '@mui/material';

export default function LengthFilter({ steps, range, onChange, isMachineSelected }) {
    if (!steps || steps.length === 0) return null;

    const handleChange = (event, newValue) => {
        onChange(newValue);
    };

    const valueLabelFormat = (index) => {
        return steps[index] ? `${steps[index]} mm` : '';
    };

    if (steps.length === 1 && isMachineSelected) {
        return (
            <Box sx={{ px: 2, mt: 2, mb: 2 }}>
                <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                    DŁUGOŚĆ PIŁY (MM)
                </Typography>
                <Chip
                    label={`${steps[0]} mm`}
                    color="primary"
                    variant="filled"
                    size="small"
                    sx={{ fontWeight: 600, width: '100%', borderRadius: 1 }}
                />
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block', fontStyle: 'italic' }}>
                    Wymiar stały dla wybranej maszyny.
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{
            px: 4,
            mt: 3,
            width: '100%',
            boxSizing: 'border-box'
        }}>
            <Typography variant="caption" fontWeight={700} sx={{ display: 'block', mb: 1 }}>DŁUGOŚĆ PIŁY (MM)</Typography>
            <Slider
                value={range}
                onChange={handleChange}
                min={0}
                max={steps.length - 1}
                step={1}
                valueLabelDisplay="auto"
                valueLabelFormat={valueLabelFormat}
                marks={[
                    { value: 0, label: `${steps[0]}` },
                    { value: steps.length - 1, label: `${steps[steps.length - 1]}` }
                ]}
                sx={{
                    '& .MuiSlider-valueLabel': {
                        bgcolor: 'primary.main',
                        zIndex: 1000,
                    },
                    '& .MuiSlider-markLabel[data-index="0"]': {
                        transform: 'translateX(0%)',
                    },
                    '& .MuiSlider-markLabel[data-index="1"]': {
                        transform: 'translateX(-100%)',
                    },
                }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Typography variant="caption" color="text.secondary">
                    Od: <strong>{steps[range[0]]} mm</strong>
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    Do: <strong>{steps[range[1]]} mm</strong>
                </Typography>
            </Box>
        </Box>
    );
}
import { Slider, Box, Typography } from '@mui/material';

export default function LengthFilter({ steps, range, onChange }) {
    // Zabezpieczenie na wypadek, gdyby tablica steps była pusta
    if (!steps || steps.length === 0) return null;

    const handleChange = (event, newValue) => {
        onChange(newValue);
    };

    const valueLabelFormat = (index) => {
        return steps[index] ? `${steps[index]} mm` : '';
    };

    return (
        <Box sx={{ 
            px: 4, // To kluczowy odstęp, który chroni dymki przed ucinaniem
            mt: 3, 
            width: '100%', 
            boxSizing: 'border-box' 
        }}>
            
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
                        // Opcjonalnie: upewniamy się, że z-index dymka jest wysoki
                        zIndex: 1000, 
                    },
                    // Poprawka dla labeli "marks" (tych na końcach), żeby nie wystawały
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
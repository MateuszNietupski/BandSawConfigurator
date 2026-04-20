import { Typography, Box, useTheme, useMediaQuery } from "@mui/material";
import ContactData from "./ContactData";

export default function CustomNoRowsOveraly({ selectedMachine }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const machineSpecs = selectedMachine
        ? [selectedMachine.length, selectedMachine.width, selectedMachine.thickness]
            .filter(Boolean)
            .join(' x ') + ' mm'
        : "";

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            textAlign: 'center',
            px: isMobile ? 2 : 5,
            gap: 2,
        }}>
            <Typography
                variant={isMobile ? "subtitle1" : "h6"}
                color="primary.main"
                sx={{
                    fontWeight: 800,
                    whiteSpace: isMobile ? 'normal' : 'nowrap', 
                }}
            >
                {selectedMachine ? `Piły dla modelu ${selectedMachine.name}` : "Brak wyników"}
            </Typography>

            <Typography variant="body2" sx={{ maxWidth: isMobile ? '100%' : 600, color: 'text.secondary', whiteSpace: isMobile ? 'normal' : 'nowrap' }}>
                {selectedMachine ? (
                    <>
                        Nie znaleźliśmy gotowych pił o wymiarach <strong>{machineSpecs}</strong>.<br />
                        Dostarczamy piły zgrzewane pod wymiar na indywidualne zapytanie – skontaktuj się z nami!
                    </>
                ) : (
                    "Obecnie nie posiadamy w standardowej ofercie pił taśmowych o tych parametrach. Spróbuj zmienić filtry wyszukiwania, aby zobaczyć zbliżone modele. Potrzebujesz czegoś niestandardowego? Dostarczamy piły zgrzewane pod wymiar na indywidualne zapytanie – skontaktuj się z nami!"
                )}
            </Typography>
            <ContactData />
        </Box>
    );
}

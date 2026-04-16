import { Box, Typography, Link } from "@mui/material";
import ContactData from "./ContactData";

export default function Footer() {
    return (
        <Box
            sx={(theme) => ({
                mt: 4,
                py: 3,
                px: 2,
                textAlign: "center",
                backgroundColor: theme.palette.primary.main,      // niebieskie tło
                color: theme.palette.background.default,          // jasny tekst
            })}
        >
            <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
                Nie znalazłeś odpowiedniej piły taśmowej?
            </Typography>

            <Typography variant="body2" sx={{ mb: 1 }}>
                Skontaktuj się z nami — oferujemy piły na zamówienie, wykonane precyzyjnie według Twoich wymagań.
            </Typography>

            <ContactData/>
        </Box>
    );
}
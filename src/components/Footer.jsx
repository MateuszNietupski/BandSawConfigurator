import { Box, Typography, Link } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/LocalPhone";

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

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 1 }}>
                <EmailIcon sx={{ fontSize: 20 }} />
                <Link href="mailto:sklep@e-darmet.pl" sx={{ color: "inherit", textDecoration: "none", fontWeight: "bold" }}>
                    sklep@e-darmet.pl
                </Link>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                <PhoneIcon sx={{ fontSize: 20 }} />
                <Link href="tel:+48123456789" sx={{ color: "inherit", textDecoration: "none", fontWeight: "bold" }}>
                    +48 123 456 789
                </Link>
            </Box>
        </Box>
    );
}
import { Box, Link } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/LocalPhone";


export default function ContactData() {
    return (
        <>
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
        </>
    );
}
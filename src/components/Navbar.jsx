import React from "react";
import { AppBar, Toolbar, Typography, Box, Link } from "@mui/material";

export default function Navbar() {
    return (
        <AppBar position="static" color="primary" elevation={2} sx={{width: "100%"}}>
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%"
                }}
            >
                {/* LEWA STRONA: logo + tytuł */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Link
                        href="https://www.e-darmet.pl"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ display: "inline-block" }} 
                    >
                        <img
                            src="/darmet_logo_1.png"
                            alt="Darmet"
                            style={{
                                height: 40,
                                objectFit: "contain",
                            }}
                        />
                    </Link>
                </Box>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: "bold",
                        fontSize: { xs: "1rem", md: "1.25rem" },
                        textAlign: "right",
                    }}
                >
                    Konfigurator pił taśmowych
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
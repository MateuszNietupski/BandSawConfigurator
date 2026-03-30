import React from "react";
import { Box, Typography, Button } from "@mui/material";

export default function ProductCardCell({ product, mobile = false }) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "100%",
                border: mobile ? "none" : "1px solid #ccc",
                borderRadius: 2,
                p: 1,
                boxShadow: mobile ? 0 : 1,
            }}
        >
            {/* Zdjęcie */}
            {product.Image ? (
                <Box
                    component="img"
                    src={product.Image}
                    alt={product.Title}
                    sx={{
                        width: "100%",
                        height: mobile ? 100 : { xs: 100, sm: 120, md: 140 },
                        objectFit: "cover",
                        borderRadius: 1,
                        mb: 1,
                    }}
                />
            ) : (
                <Typography sx={{ mb: 1 }}>Brak zdjęcia</Typography>
            )}

            {/* Tytuł i opis */}
            <Box sx={{ flexGrow: 1 }}>
                <Typography
                    variant="subtitle1"
                    sx={{
                        fontWeight: "bold",
                        display: "-webkit-box",
                        WebkitLineClamp: mobile ? 2 : 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        mb: 1,
                    }}
                >
                    {product.Title}
                </Typography>
                {!mobile && product.Title && (
                    <Typography
                        variant="body2"
                        sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {product.Title}
                    </Typography>
                )}
            </Box>

            {/* Cena i przycisk */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 1,
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {product.Price} zł
                </Typography>
                <Button
                    variant="contained"
                    size="small"
                    href={product.Title_URL}
                    target="_blank"
                >
                    Zobacz
                </Button>
            </Box>
        </Box>
    );
}
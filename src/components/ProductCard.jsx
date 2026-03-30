import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";

export default function ProductCard({ product }) {
    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minWidth: 250,
                maxWidth: 345,
                height: "100%", // pozwala Grid wyrównać wszystkie karty
                boxShadow: 3,
                m: 1,
            }}
        >
            {product.Image ? (
                <CardMedia
                    component="img"
                    image={product.Image}
                    alt={product.Title}
                    sx={{
                        height: { xs: 100, sm: 120, md: 140 },
                        objectFit: 'cover',
                    }}
                />
            ) : (
                <Typography sx={{ p: 2 }}>Brak zdjęcia</Typography>
            )}

            <CardContent sx={{
                fontWeight: 'bold',
                overflow: 'hidden',
                flexGrow: 1,
                textOverflow: 'ellipsis',
                fontSize: {
                    xs: '1rem', md: '1.25rem',
                    flexGrow: 1, pb: 1
                }
            }}>
                <Typography
                    variant="subtitle1"
                    sx={{
                        fontWeight: 'bold',
                        display: '-webkit-box',
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {product.Title}
                </Typography>

            </CardContent>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    px: 2,
                    pb: 2
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {product.Price} zł
                </Typography>

                <Button
                    variant="contained"
                    size="small"
                    href={product.Title_URL}
                    target="_blank"
                >
                    Zobacz szczegóły
                </Button>
            </Box>
        </Card>
    );
}
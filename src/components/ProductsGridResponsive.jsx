import React from "react";
import { useMediaQuery, useTheme, CircularProgress } from "@mui/material";
import ProductGridDesktop from "./ProductDataGridDesktop";
import ProductGridMobile from "./ProductDataGridMobile";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ProductGridResponsive({ products, loading }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const rows = products.map((p, index) => ({
        id: index + 1,
        Title: p.Title,
        Image: p.Image,
        URL: p.Title_URL,
        Type: p.Type,
        Length: Number(p.Length),
        Width: Number(p.Width),
        Thickness: Number(p.Thickness),
        Tpi: Number(p.Tpi),
        Price: p.Price,
    }));
    if (loading) return <CircularProgress />;


    return (
        <>
            <Navbar/>
            {isMobile ? (
                <ProductGridMobile rows={rows} />
            ) : (
                <ProductGridDesktop rows={rows} />
            )};
            <Footer/>
        </>
    )
}
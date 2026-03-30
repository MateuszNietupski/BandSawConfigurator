import React, { useState } from "react";
import { Box, Container, Pagination } from "@mui/material";
import ProductCard from "./ProductCard.jsx";

export default function ProductsGrid2({ products, loading }) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleProducts = products.slice(startIndex, endIndex);

  const handleChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container sx={{ py: 4 }}>
      {loading ? (
        <Box sx={{ p: 2 }}>Ładowanie produktów...</Box>
      ) : visibleProducts.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 2, // spacing między kartami
          }}
        >
          {visibleProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </Box>
      ) : (
        <Box sx={{ p: 2 }}>Brak produktów do wyświetlenia</Box>
      )}

      <Pagination
        count={Math.ceil(products.length / itemsPerPage)}
        page={page}
        onChange={handleChange}
        color="primary"
        sx={{ mt: 4, display: "flex", justifyContent: "center" }}
      />
    </Container>
  );
}
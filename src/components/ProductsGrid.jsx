import React, { useState } from 'react';
import { Grid, Container, Typography, Pagination } from "@mui/material";
import ProductCard from "./ProductCard.jsx";

export default function ProductsGrid({ products, loading }) {
  const [page, setPage] = useState(1)
  const itemsPerPage = 20;

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleProducts = products.slice(startIndex, endIndex);

  const handleChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // przewijanie na górę po zmianie strony
  };

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={2}>
        {loading ? (
          <Grid item size={{ xs: 12 }}>
            <Typography>Ładowanie produktów...</Typography>
          </Grid>
        ) : products.length > 0 ? (
          visibleProducts.map((prod) => (
            <Grid key={prod.id} item size={{ xs: 12, sm: 6, md: 4, lg: 3 }} sx={{ minWidth: 250, display: 'flex' }}>
              <ProductCard product={prod} />
            </Grid>
          ))
        ) : (
          <Grid item size={{ xs: 12 }}>
            <Typography>Brak produktów do wyświetlenia</Typography>
          </Grid>
        )}
      </Grid>
      <Pagination
        count={Math.ceil(products.length / itemsPerPage)}
        page={page}
        onChange={handleChange}
        color="primary"
        sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}
      />
    </Container>
  );
}
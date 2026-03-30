import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Grid, Container, Box, Pagination } from '@mui/material';
/*import {BrokenImage} from "@mui/icons-material";
*/


function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1)
  const itemsPerPage = 20;

  useEffect(() => {
    fetch('/piły_taśmowe_short2.json')
      .then(res => res.json())
      .then(data => {
        setProducts(data.root.items);
        setLoading(false);
        console.log(data.root.items);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleProducts = products.slice(startIndex, endIndex);

  const handleChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // przewijanie na górę po zmianie strony
  };

  return (
    <Container sx={{ py: 4 }}>
      <>
        <Grid container spacing={3}>
          {loading ? (
            <Grid item xs={12}>
              <Typography>Ładowanie produktów...</Typography>
            </Grid>
          ) : products.length > 0 ? (
            visibleProducts.map((prod, idx) => (
              <Grid item key={idx} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <Card
                  sx={{
                    maxWidth: { xs: '100%', sm: 300, md: 345 },
                    minHeight: 'clamp(320px, 50vh, 380px)',
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between', m: 1, boxShadow: 3
                  }}>
                  {prod.Image ? (<CardMedia
                    component="img"
                    sx={{
                      height: { xs: 140, md: 180 },
                      objectFit: 'cover'
                    }}
                    image={prod.Image}
                    alt={prod.Title}
                  />
                  ) : (
                    <p>brak</p>
                  )}
                  <CardContent sx={{
                    fontWeight: 'bold',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: {
                      xs: '1rem', md: '1.25rem',
                      flexGrow: 1, pb: 1
                    }
                  }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{prod.Title}</Typography>
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
                      {prod.Price} zł
                    </Typography>

                    <Button
                      variant="contained"
                      size="small"
                      href={prod.Title_URL}
                      target="_blank"
                    >
                      Zobacz szczegóły
                    </Button>
                  </Box>
                </Card>

              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
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
      </>
    </Container>
  );
}

export default ProductsList;
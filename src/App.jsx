
import { ThemeProvider, Typography, CssBaseline } from '@mui/material'
import ProductsList from './ProductList'
import theme from './utils/theme'
import useProducts from './hooks/useProducts.jsx'
import ProductsGrid2 from './components/ProductsGrid2.jsx'
import ProductsGridResponsive from './components/ProductsGridResponsive.jsx'
import Home from './pages/Home.jsx';

function App() {
  const { products, loading, error } = useProducts()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {error && <Typography color="error">Błąd ładowania produktów: {error.message}</Typography>}
      <Home products={products} loading={loading} />
    </ThemeProvider>
  )
}

export default App

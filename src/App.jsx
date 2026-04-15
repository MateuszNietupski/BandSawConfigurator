
import { ThemeProvider, Typography, CssBaseline } from '@mui/material'
import ProductsList from './ProductList'
import theme from './utils/theme'
import useSaws from './hooks/useSaws.jsx'
import ProductsGrid2 from './components/ProductsGrid2.jsx'
import ProductsGridResponsive from './components/ProductsGridResponsive.jsx'
import Home from './pages/Home.jsx';

function App() {
  const { saws } = useSaws()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Home saws={saws} />
    </ThemeProvider>
  )
}

export default App

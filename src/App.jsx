
import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from './utils/theme'
import useSaws from './hooks/useSaws.jsx'
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

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#0e2135",
        },
        background: {
            default: "#f5f5f5",
        },
    },
    typography: {
        fontFamily: "Roboto, Arial, sans-serif",
    },
    typography: {
        fontFamily: '"Inter", "Roboto", sans-serif',
    },
    shape: { borderRadius: 8 },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: { backgroundColor: '#F0F4F8' },
            },
        },
    },
});

export default theme;
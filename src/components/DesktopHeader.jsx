import { Typography, Box } from "@mui/material";
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import BuildIcon from '@mui/icons-material/Build';


const DesktopHeader = ({ filteredCount, totalCount, viewMode }) => {
    return (
        <Box
            sx={{
                px: 3, py: 2, borderBottom: '1px solid', borderColor: 'divider',
                display: 'flex', alignItems: 'center', gap: 1.5, bgcolor: 'background.paper',
            }}
        >
            {viewMode === 'machines' ? (
                <PrecisionManufacturingIcon color="primary" />
            ) : (
                <BuildIcon color="primary" />
            )}
            <Typography variant="h5" fontWeight={700} component="h1" color="primary.main">
                {viewMode === 'machines' ? 'Wybierz maszynę' : 'Konfigurator Pił Taśmowych'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
                {viewMode === 'machines'
                    ? `Dostępne maszyny: ${totalCount}`
                    : `Wyświetlono: ${filteredCount} / ${totalCount} piły`
                }
            </Typography>
        </Box>
    );
}

export default DesktopHeader;
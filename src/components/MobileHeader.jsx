import { Box, Typography, Link } from "@mui/material";


const MobileHeader = ({ filteredCount, totalCount, viewMode }) => {
    return (
        <Box
            sx={{
                px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider',
                bgcolor: 'background.paper', display: 'flex', alignItems: 'center', gap: 1.5,
            }}
        >
            <Link href="https://www.e-darmet.pl/darmet/darmet_logo_1.png" target="_blank" rel="noopener" sx={{ display: 'flex', textDecoration: 'none' }}>
                <Box
                    sx={{
                        width: 100, height: 36, bgcolor: 'primary.main', borderRadius: 1,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', fontWeight: 700, fontSize: 10, letterSpacing: 1,
                    }}
                >
                    <img
                        src="/darmet_logo_1.png"
                        alt="Darmet"
                        style={{
                            height: 40,
                            objectFit: "contain",
                        }}
                    />
                </Box>
            </Link>
            <Typography variant="subtitle1" fontWeight={700} color="primary.main" sx={{ flex: 1 }}>
                {viewMode === 'machines' ? 'Wybierz maszynę' : 'Konfigurator Pił'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
                {filteredCount}/{totalCount}
            </Typography>
        </Box>
    );
}

export default MobileHeader;
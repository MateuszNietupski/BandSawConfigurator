import { useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Avatar, useMediaQuery, useTheme, Dialog, IconButton, Typography, CircularProgress, Zoom } from '@mui/material';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';

const MachineDataGrid = ({ machines, onSelectMachine }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [openImage, setOpenImage] = useState(null);
    const [imgLoading, setImgLoading] = useState(true);
    const handleOpenImage = (machine) => {
        setImgLoading(true);
        setOpenImage(machine);
    };
    const handleCloseImage = () => setOpenImage(null);

    const columns = [
        {
            field: 'imageUrl',
            headerName: '',
            width: isMobile ? 58 : 116,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <Avatar
                        variant="rounded"
                        src={params.row.imageUrl || params.row.Image}
                        onClick={(e) => {
                            e.stopPropagation();
                            const imgUrl = params.row.imageUrl || params.row.Image;
                            if (imgUrl) handleOpenImage(params.row); 
                        }}
                        sx={{
                            width: isMobile ? 48 : 100,
                            height: isMobile ? 48 : 100,
                            bgcolor: '#E3F2FD',
                            cursor: params.row.imageUrl ? 'zoom-in' : 'default',
                            '& img': { objectFit: 'contain', p: 0.5 }
                        }}
                    >
                        <PrecisionManufacturingIcon sx={{ fontSize: isMobile ? 20 : 36, color: '#90CAF9' }} />
                    </Avatar>
                </Box>
            ),
        },
        {
            field: 'name',
            headerName: 'Nazwa maszyny',
            flex: 2,
            minWidth: isMobile ? 100 : 200,
            renderCell: (params) => (
                <Box sx={{
                    fontSize: isMobile ? 11 : 14,
                    fontWeight: 600,
                    lineHeight: 1.2,
                    whiteSpace: 'normal',
                    wordBreak: 'break-word',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                }}>
                    {params.value}
                </Box>
            ),
        },
        {
            field: 'manufacturer',
            headerName: 'Producent',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            minWidth: isMobile ? 70 : 100,
            renderCell: (params) => (
                <Box sx={{ fontSize: isMobile ? 10 : 12, fontWeight: 600, lineHeight: 1.3 }}>
                    {params.value}
                </Box>
            ),
        },
        {
            field: 'actions',
            headerName: '',
            width: isMobile ? 42 : 180,
            sortable: false,
            filterable: false,
            renderCell: (params) =>
                isMobile ? (
                    <Button
                        size="small"
                        color="primary"
                        sx={{ minWidth: 0, p: 0.5 }}
                        onClick={() => onSelectMachine(params.row)}
                    >
                        <CheckCircleIcon fontSize="small" />
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        startIcon={<CheckCircleIcon />}
                        onClick={() => onSelectMachine(params.row)}
                        sx={{ textTransform: 'none', fontWeight: 600, fontSize: 12 }}
                    >
                        Wybierz maszynę
                    </Button>
                ),
        },
    ];

    return (
        <Box sx={{ height: '100%', width: '100%' }}>
            <DataGrid
                rows={machines}
                columns={columns}
                rowHeight={isMobile ? 60 : 80}
                pageSizeOptions={[5, 10, 20, 50]}
                initialState={{
                    pagination: { paginationModel: { pageSize: 10 } },
                    sorting: { sortModel: [{ field: 'name', sort: 'asc' }] },
                }}
                disableRowSelectionOnClick
                disableColumnMenu
                sx={{
                    border: 'none',
                    fontSize: isMobile ? 11 : 14,
                    '& .MuiDataGrid-columnHeaders': {
                        bgcolor: 'action.hover',
                        fontWeight: 700,
                        fontSize: isMobile ? 11 : 14,
                    },
                    '& .MuiDataGrid-row:hover': {
                        bgcolor: '#BBDEFB',
                        cursor: 'pointer',
                    },
                    '& .MuiDataGrid-cell': {
                        display: 'flex',
                        alignItems: 'center',
                        ...(isMobile && { px: 0.5 }),
                    },
                }}
            />
            <Dialog
                open={Boolean(openImage)}
                onClose={handleCloseImage}
                maxWidth="md"
                fullWidth={false}
                TransitionComponent={Zoom}
                PaperProps={{
                    sx: {
                        bgcolor: 'transparent',
                        boxShadow: 'none',
                        overflow: 'visible',
                    }
                }}
            >
                <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <IconButton
                        onClick={handleCloseImage}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            zIndex: 1,
                            bgcolor: 'rgba(0,0,0,0.5)',
                            color: 'white',
                            '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' }
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    {imgLoading && (
                        <Box sx={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <CircularProgress />
                        </Box>
                    )}
                    <img
                        src={openImage?.imageUrl || openImage?.Image}
                        alt={openImage?.name || 'Podgląd maszyny'}
                        onLoad={() => setImgLoading(false)}
                        onError={() => setImgLoading(false)}
                        style={{
                            maxWidth: '95vw',
                            maxHeight: '80vh',
                            objectFit: 'contain',
                            borderRadius: '8px',
                            backgroundColor: '#fff',
                            padding: '10px',
                            display: imgLoading ? 'none' : 'block',
                            transition: 'opacity 0.3s ease',
                        }}
                    />
                    {openImage?.name && (
                        <Typography
                            variant="subtitle1"
                            sx={{
                                mt: 1,
                                px: 2,
                                py: 0.5,
                                bgcolor: '#0e2135',
                                color: '#fff',
                                borderRadius: 1,
                                fontWeight: 600,
                                textAlign: 'center',
                                maxWidth: '90vw',
                            }}
                        >
                            {openImage.name}
                        </Typography>
                    )}
                </Box>
            </Dialog>
        </Box>
    );
};

export default MachineDataGrid;
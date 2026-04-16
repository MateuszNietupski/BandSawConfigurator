import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Avatar, useMediaQuery, useTheme, Dialog, Tooltip, Chip, IconButton, Typography, CircularProgress, Zoom } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { plPL } from '@mui/x-data-grid/locales';
import CloseIcon from '@mui/icons-material/Close';
import CustomNoRowsOverlay from './CustomNoRowsOverlay'

export default function ProductGridDesktop({ rows, selectedMachine }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [openImage, setOpenImage] = useState(null);
    const [imgLoading, setImgLoading] = useState(true);
    const handleOpenImage = (rows) => {
        setImgLoading(true);
        setOpenImage(rows);
    };
    const handleCloseImage = () => setOpenImage(null);


    const typeDescriptions = {
        'OPTI CUT M42': 'Uniwersalna piła bimetalowa M42. Optymalna do cięcia stali konstrukcyjnych, profili i prętów. Dobry stosunek ceny do wydajności.',
        'BEST CUT M51': 'Wysokowydajna piła bimetalowa M51. Do stali trudnoobrabialnych, stopowych i nierdzewnych. Zwiększona trwałość i odporność na ciepło.',
        'PROFIL CUT M42': 'Piła bimetalowa M42 do cięcia profili i rur cienkościennych. Zmienny podziałka zębów zapewnia czyste cięcie bez drgań.',
    };

    const typeColors = {
        'OPTI CUT M42': { bg: '#FFF3E0', border: '#FB8C00', text: '#E65100' },
        'BEST CUT M51': { bg: '#FFEBEE', border: '#E53935', text: '#B71C1C' },
        'PROFIL CUT M42': { bg: '#E8F5E9', border: '#43A047', text: '#1B5E20' },
    };
    const columns = [
        {
            field: "Image",
            headerName: "Piła taśmowa",
            flex: 1.5,
            sortable: false,
            width: isMobile ? 58 : 116,

            headerAlign: 'center',
            align: 'center',
            cellClassName: 'no-focus-cell',
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
                            cursor: params.row.Image ? 'zoom-in' : 'default',
                            '& img': { objectFit: 'contain', p: 0 }
                        }}
                    />
                </Box>
            ),
        },

        {
            field: 'Type',
            headerName: 'Typ',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            minWidth: 160,
            renderCell: (params) => {
                const colors = typeColors[params.value] || { bg: '#F5F5F5', border: '#9E9E9E', text: '#616161' };
                return (
                    <Tooltip title={typeDescriptions[params.value] || ''} arrow placement="right">
                        <Chip
                            label={params.value}
                            size="small"
                            variant="outlined"
                            sx={{
                                cursor: 'help',
                                fontWeight: 600,
                                bgcolor: colors.bg,
                                borderColor: colors.border,
                                color: colors.text,
                            }}
                        />
                    </Tooltip>
                );
            },
        },
        {
            field: "Length", headerAlign: 'center', align: 'center', flex: 1, headerName: "Długość", minWidth: 100, type: "number", renderCell: (params) => `${params.value} mm`,
        },
        { field: "Width", headerAlign: 'center', align: 'center', flex: 1, headerName: "Szerokość", minWidth: 100, type: "number", renderCell: (params) => `${params.value} mm`, },
        { field: "Thickness", flex: 1, headerAlign: 'center', align: 'center', headerName: "Grubość", minWidth: 100, type: "number", renderCell: (params) => `${params.value} mm`, },
        {
            field: "Tpi",
            headerName: "TPI",
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            minWidth: 70,
            valueGetter: (value, row) => {
                const raw = row.Tpi;
                if (!raw) return null;
                const [num, den] = raw.split('/').map(Number);
                if (!den || isNaN(num) || isNaN(den)) return null;
                return num / den;
            },
            renderCell: (params) => params.row.Tpi ?? ''
        },
        {
            field: 'Title_URL',
            headerName: '',
            minWidth: 200,
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    size="small"
                    color="primary"
                    startIcon={<StorefrontIcon />}
                    component="a"
                    href={params.row.Title_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    sx={{
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: 12,
                    }}
                >
                    Sprawdź cenę w sklepie
                </Button>
            ),
        }
    ];

    if (!rows || rows.length === 0) {
    }

    return (
        <Box sx={{ width: "100%", width: '100%' }}>
            <DataGrid
                disableColumnMenu
                rows={rows}
                columns={columns}
                rowHeight={80}
                initialState={{
                    pagination: { paginationModel: { pageSize: 10 } },
                    sorting: { sortModel: [{ field: 'name', sort: 'asc' }] },
                }}
                pageSizeOptions={[5, 10, 20, 50]}
                disableRowSelectionOnClick
                localeText={plPL.components.MuiDataGrid.defaultProps.localeText}
                slots={{
                    noRowsOverlay: () => <CustomNoRowsOverlay selectedMachine={selectedMachine} />,
                }}
                sx={{
                    '& .no-focus-cell:focus, & .no-focus-cell:focus-within': {
                        outline: 'none !important',
                    },
                    border: 'none',
                    '& .MuiDataGrid-columnHeaders': {
                        bgcolor: 'action.hover',
                        fontWeight: 700,
                    },
                    '& .MuiDataGrid-row:hover': {
                        bgcolor: '#BBDEFB',
                    },
                    '& .MuiDataGrid-cell': {
                        display: 'flex',
                        alignItems: 'center',
                    },
                    minHeight: 400
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
                    {openImage?.Title && (
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
                            {openImage.Title}
                        </Typography>
                    )}
                </Box>
            </Dialog>
        </Box>
    );
}
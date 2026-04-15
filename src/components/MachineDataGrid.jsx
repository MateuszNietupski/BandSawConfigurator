import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Avatar, useMediaQuery, useTheme } from '@mui/material';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const MachineDataGrid = ({ machines, onSelectMachine }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    console.log(machines);
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
                        // Avatar sam sprawdzi czy src istnieje i czy obrazek się ładuje
                        src={params.row.imageUrl || params.row.Image}
                        sx={{
                            width: isMobile ? 48 : 100,
                            height: isMobile ? 48 : 100,
                            bgcolor: '#E3F2FD',
                            // Dodajemy styl dla obrazka wewnątrz Avatara, żeby pasował
                            '& img': { objectFit: 'contain', p: 0.5 }
                        }}
                    >
                        {/* To wyświetli się tylko jeśli src będzie puste lub obrazek nie zadziała */}
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
                    whiteSpace: 'normal', // Pozwala na zawijanie tekstu
                    wordBreak: 'break-word', // Rozbija długie słowa, jeśli to konieczne
                    display: '-webkit-box',
                    WebkitLineClamp: 3, // Ogranicza do np. 3 linii (opcjonalnie)
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
        </Box>
    );
};

export default MachineDataGrid;
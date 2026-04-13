import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Tooltip, Chip } from "@mui/material";
import StorefrontIcon from '@mui/icons-material/Storefront';


export default function ProductGridDesktop({ rows }) {
    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 10,
        page: 0,
    });

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
    console.log(rows);
    const columnsDefinitions = [
        {
            field: "Image",
            headerName: "Piła taśmowa",
            flex: 1,
            sortable: false,
            headerAlign: 'center',
            align: 'center',
            minWidth: 100,
            renderCell: (params) => (
                <Box>

                    <img
                        src={params.row.Image}
                        alt={params.value}
                        style={{ width: 100, height: 100, objectFit: "contain", display: "block" }}
                    />

                </Box>
            ),
        },

        {
            field: 'Type',
            headerName: 'Typ',
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
            field: "Length", headerName: "Długość", minWidth: 100, type: "number", renderCell: (params) => `${params.value} mm`,
        },
        { field: "Width", headerName: "Szerokość", minWidth: 100, type: "number", renderCell: (params) => `${params.value} mm`, },
        { field: "Thickness", headerName: "Grubość", minWidth: 100, type: "number", renderCell: (params) => `${params.value} mm`, },
        {
            field: "Tpi",
            headerName: "TPI",
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
    const columns = columnsDefinitions.map(col => ({
    headerAlign: 'center', // Centrowanie nagłówka
    align: 'center',       // Centrowanie treści
    ...col                 // Nadpisanie specyficznymi danymi
}));

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
                sx={{
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
                }}

            />
        </Box>
    );
}
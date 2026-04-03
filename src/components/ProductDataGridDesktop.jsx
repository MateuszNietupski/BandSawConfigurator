import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Link } from "@mui/material";
import StorefrontIcon from '@mui/icons-material/Storefront';


export default function ProductGridDesktop({ rows }) {
    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 10,
        page: 0,
    });
    const columns = [
        {
            field: "Image",
            headerName: "Produkt",
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

        { field: "Type", headerName: "Typ", width: 150 },
        {
            field: "Length", headerName: "Długość", width: 100, type: "number", renderCell: (params) => `${params.value} mm`,
        },
        { field: "Width", headerName: "Szerokość", width: 100, type: "number", renderCell: (params) => `${params.value} mm`, },
        { field: "Thickness", headerName: "Grubość", width: 100, type: "number", renderCell: (params) => `${params.value} mm`, },
        {
            field: "Tpi",
            headerName: "TPI",
            width: 70,
            valueGetter: (value, row) => {
                const raw = row.Tpi;
                if (!raw) return null;
                const [num, den] = raw.split('/').map(Number);
                if (!den || isNaN(num) || isNaN(den)) return null;
                return num / den;
            },
            renderCell: (params) => params.row.Tpi ?? ''
        },
        { field: "Price", headerName: "Cena brutto", width: 120, type: "number", renderCell: (params) => `${params.value} zł`, },
        {
            field: 'Title_URL',
            headerName: '',
            width: 170,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    size="small"
                    color="primary"
                    startIcon={<StorefrontIcon />}
                    component="a"
                    href={params.row.URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    sx={{
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: 12,
                    }}
                >
                    Przejdź do sklepu
                </Button>
            ),
        }
    ];

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
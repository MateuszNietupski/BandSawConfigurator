import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import ProductCardCell from "./ProductCardCell";

export default function ProductDataGridMobile({ rows }) {
    const [pageSize, setPageSize] = useState(5);

    const columns = [
        {
            field: "product",
            headerName: "Produkt",
            flex: 1,
            minWidth: 150,
            sortable: false,
            filterable: false,
            renderCell: (params) => <ProductCardCell product={params.row} mobile />,
        },
    ];

    return (
        <Box sx={{ width: "100%", overflowX: "auto" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                autoHeight
                pageSize={pageSize}
                rowsPerPageOptions={[5, 10, 20]}
                onPageSizeChange={(newSize) => setPageSize(newSize)}
                disableColumnMenu
                sx={{
                    "& .MuiDataGrid-cell": { py: 1, alignItems: "start" },
                    "& .MuiDataGrid-row": { alignItems: "start" },
                }}
            />
        </Box>
    );
}
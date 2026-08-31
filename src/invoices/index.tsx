import {
  Box,
  Dialog,
  DialogTitle,
  Typography,
  useTheme,
  Button,
  IconButton,
} from "@mui/material";
import { DataGrid, type GridRenderCellParams } from "@mui/x-data-grid";
import Header from "../component/Header";
import { tokens } from "../theme";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useState } from "react";
import DynamicForm from "../component/DynamicForm";
import { useAuth } from "../hooks/useAuth";
import { useSupabaseCRUD } from "../hooks/useSupabaseCrud";
import { useIsMobile } from "../hooks/useIsMobile";

type InvoiceD = {
  id: number;
  name: string;
  email: string;
  cost: number;
  phone: string;
  date: string;
  invoice_type: "Product" | "Service" | "Subscription";
};

const invoiceFields = [
  { name: "name", label: "name", type: "text" },
  { name: "email", label: "email", type: "email" },
  { name: "cost", label: "cost", type: "number" },
  { name: "phone", label: "phone", type: "text" },
  { name: "date", label: "date", type: "date" },
  {
    name: "invoice_type",
    label: "invoice type",
    type: "select",
    options: ["Product", "Service", "Subscription"],
  },
];

const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { role } = useAuth();
  const isAdmin = role === "admin";

  const {
    data: invoices,
    insert,
    update,
    remove,
  } = useSupabaseCRUD<InvoiceD>("invoices");

  const [open, setOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<InvoiceD | null>(null);

  const isMobile = useIsMobile();

  const handleSubmit = async (formValues: InvoiceD) => {
    const payload = {
      name: formValues.name,
      email: formValues.email,
      cost: formValues.cost,
      phone: formValues.phone,
      date: formValues.date,
      invoice_type: formValues.invoice_type,
    };

    const { error } = editingInvoice
      ? await update(editingInvoice.id, payload)
      : await insert(payload);

    if (error) return;

    setOpen(false);
    setEditingInvoice(null);
  };

  const handleEditClick = (row: InvoiceD) => {
    setEditingInvoice(row);
    setOpen(true);
  };

  const handleDeleteClick = async (row: InvoiceD) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the invoice "${row.name}"?`
    );
    if (!confirmed) return;
    await remove(row.id);
  };

  const handleAddClick = () => {
    setEditingInvoice(null);
    setOpen(true);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "NAME", flex: 0.7 },
    { field: "email", headerName: "EMAIL", flex: 1 },
    { field: "cost", headerName: "COST", flex: 0.5 },
    { field: "phone", headerName: "PHONE", flex: 0.7 },
    { field: "date", headerName: "DATE", flex: 0.7 },
    { field: "invoice_type", headerName: "TYPE", flex: 0.6 },
    ...(isAdmin
      ? [
          {
            field: "actions",
            headerName: "ACTIONS",
            flex: 0.6,
            sortable: false,
            filterable: false,
            renderCell: (params: GridRenderCellParams<InvoiceD>) => (
              <Box>
                <IconButton
                  onClick={() => handleEditClick(params.row)}
                  size="small"
                >
                  <EditOutlinedIcon sx={{ color: colors.blueAccent[400] }} />
                </IconButton>
                <IconButton
                  onClick={() => handleDeleteClick(params.row)}
                  size="small"
                >
                  <DeleteOutlineOutlinedIcon
                    sx={{ color: colors.redAccent[400] }}
                  />
                </IconButton>
              </Box>
            ),
          },
        ]
      : []),
  ];

  return (
    <Box>
      <Box className="px-3">
        <Header title={"INVOICES"} subtitle={"Manging the Invoices Member"} />
      </Box>

      {isAdmin && (
        <Button
          sx={{ background: colors.blueAccent[500], ml: "10px", mb: "10px" }}
          variant="contained"
          onClick={handleAddClick}
        >
          Add Invoice
        </Button>
      )}

      {isMobile ? (
        <Box className="flex flex-col gap-3 px-2">
          {invoices.map((invoice) => (
            <Box
              key={invoice.id}
              sx={{
                background: colors.primary[400],
                borderRadius: "8px",
                p: 2,
              }}
            >
              <Box className="flex justify-between items-start">
                <Typography variant="h6">{invoice.name}</Typography>
                {isAdmin && (
                  <Box>
                    <IconButton
                      size="small"
                      onClick={() => handleEditClick(invoice)}
                    >
                      <EditOutlinedIcon
                        sx={{ color: colors.blueAccent[400] }}
                        fontSize="small"
                      />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteClick(invoice)}
                    >
                      <DeleteOutlineOutlinedIcon
                        sx={{ color: colors.redAccent[400] }}
                        fontSize="small"
                      />
                    </IconButton>
                  </Box>
                )}
              </Box>

              <Typography sx={{ fontSize: "13px", opacity: 0.8 }}>
                {invoice.email}
              </Typography>
              <Typography sx={{ fontSize: "13px", opacity: 0.8 }}>
                {invoice.phone}
              </Typography>

              <Box
                className="flex justify-between items-center"
                sx={{
                  borderTop: `1px solid ${colors.primary[600]}`,
                  mt: 1,
                  pt: 1,
                }}
              >
                <Typography
                  sx={{
                    color: colors.greenAccent[500],
                    fontWeight: "bold",
                  }}
                >
                  ${invoice.cost}
                </Typography>
                <Typography sx={{ fontSize: "12px", opacity: 0.7 }}>
                  {invoice.date}
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: "12px",
                  opacity: 0.7,
                  mt: 0.5,
                  display: "inline-block",
                  background: colors.blueAccent[700],
                  px: 1,
                  py: 0.3,
                  borderRadius: "4px",
                }}
              >
                {invoice.invoice_type}
              </Typography>
            </Box>
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            minHeight: 400,
            width: "98%",
            display: "flex",
            margin: "auto",
          }}
        >
          <DataGrid
            sx={{
              "& .MuiDataGrid-virtualScrollerRenderZone": {
                background: colors.primary[400],
              },
              "& .MuiTablePagination-root": {
                background: colors.blueAccent[400],
              },
            }}
            rows={invoices}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            checkboxSelection
          />
        </Box>
      )}

      <Box>
        <Dialog
          open={open}
          onClose={() => {
            setOpen(false);
            setEditingInvoice(null);
          }}
        >
          <DialogTitle>
            {editingInvoice ? "Edit Invoice" : "Add New Invoice"}
          </DialogTitle>
          <DynamicForm
            fields={invoiceFields}
            onSubmit={handleSubmit}
            initialValues={editingInvoice ?? undefined}
          />
        </Dialog>
      </Box>
    </Box>
  );
};

export default Invoices;
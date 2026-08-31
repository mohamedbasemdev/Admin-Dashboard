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
import { useNavigate } from "react-router-dom";
import DynamicForm from "../component/DynamicForm";
import { useAuth } from "../hooks/useAuth";
import { useSupabaseCRUD } from "../hooks/useSupabaseCrud";
import { useIsMobile } from "../hooks/useIsMobile";

type ContactD = {
  id: number;
  name: string;
  email: string;
  age: number;
  phone: string;
  address: string;
  city: string;
  zip_code: string;
};

const contactFields = [
  { name: "name", label: "name", type: "text" },
  { name: "email", label: "email", type: "email" },
  { name: "age", label: "age", type: "number" },
  { name: "phone", label: "phone", type: "text" },
  { name: "address", label: "address", type: "text" },
  { name: "city", label: "city", type: "text" },
  { name: "zip_code", label: "zip code", type: "text" },
];

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { role } = useAuth();
  const isAdmin = role === "admin";
  const navigate = useNavigate();

  const {
    data: contacts,
    update,
    remove,
  } = useSupabaseCRUD<ContactD>("contacts");

  const [open, setOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<ContactD | null>(null);

  const isMobile = useIsMobile();

  const handleSubmit = async (formValues: ContactD) => {
    if (!editingContact) return;

    const payload = {
      name: formValues.name,
      email: formValues.email,
      age: formValues.age,
      phone: formValues.phone,
      address: formValues.address,
      city: formValues.city,
      zip_code: formValues.zip_code,
    };

    const { error } = await update(editingContact.id, payload);
    if (error) return;

    setOpen(false);
    setEditingContact(null);
  };

  const handleEditClick = (row: ContactD) => {
    setEditingContact(row);
    setOpen(true);
  };

  const handleDeleteClick = async (row: ContactD) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${row.name}"?`
    );
    if (!confirmed) return;
    await remove(row.id);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "NAME", flex: 0.7 },
    { field: "age", headerName: "AGE", flex: 0.3 },
    { field: "email", headerName: "EMAIL", flex: 0.7 },
    { field: "phone", headerName: "PHONE", flex: 0.7 },
    { field: "address", headerName: "ADDRESS", flex: 0.7 },
    { field: "city", headerName: "CITY", flex: 0.5 },
    { field: "zip_code", headerName: "ZIP CODE", flex: 0.5 },
    ...(isAdmin
      ? [
          {
            field: "actions",
            headerName: "ACTIONS",
            flex: 0.5,
            sortable: false,
            filterable: false,
            renderCell: (params: GridRenderCellParams<ContactD>) => (
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
        <Header title={"CONTACTS"} subtitle={"Manging the Contacts Member"} />
      </Box>

      {isAdmin && (
        <Button
          sx={{ background: colors.blueAccent[500], ml: "10px", mb: "10px" }}
          variant="contained"
          onClick={() => navigate("/form")}
        >
          Add Contact
        </Button>
      )}

      {isMobile ? (
        <Box className="flex flex-col gap-3 px-2">
          {contacts.map((contact) => (
            <Box
              key={contact.id}
              sx={{
                background: colors.primary[400],
                borderRadius: "8px",
                p: 2,
              }}
            >
              <Box className="flex justify-between items-start">
                <Typography variant="h6">{contact.name}</Typography>
                {isAdmin && (
                  <Box>
                    <IconButton
                      size="small"
                      onClick={() => handleEditClick(contact)}
                    >
                      <EditOutlinedIcon
                        sx={{ color: colors.blueAccent[400] }}
                        fontSize="small"
                      />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteClick(contact)}
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
                {contact.email}
              </Typography>
              <Typography sx={{ fontSize: "13px", opacity: 0.8 }}>
                {contact.phone} — Age: {contact.age}
              </Typography>
              <Typography sx={{ fontSize: "13px", opacity: 0.8, mt: 0.5 }}>
                {contact.address}, {contact.city} {contact.zip_code}
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
            rows={contacts}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
        </Box>
      )}

      <Box>
        <Dialog
          open={open}
          onClose={() => {
            setOpen(false);
            setEditingContact(null);
          }}
        >
          <DialogTitle>Edit Contact</DialogTitle>
          <DynamicForm
            fields={contactFields}
            onSubmit={handleSubmit}
            initialValues={editingContact ?? undefined}
          />
        </Dialog>
      </Box>
    </Box>
  );
};

export default Contacts;
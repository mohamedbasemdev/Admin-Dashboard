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
import AdminPannelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettings";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useState } from "react";
import DynamicForm from "../component/DynamicForm";
import { useAuth } from "../hooks/useAuth";
import { useSupabaseCRUD } from "../hooks/useSupabaseCrud";
import { useIsMobile } from "../hooks/useIsMobile";

type TeamD = {
  id: number;
  name: string;
  email: string;
  age: number;
  phone: string;
  access: "admin" | "manager" | "user";
};

const teamFields = [
  { name: "name", label: "name", type: "text" },
  { name: "email", label: "email", type: "email" },
  { name: "age", label: "age", type: "number" },
  { name: "phone", label: "phone", type: "text" },
  { name: "access", label: "access", type: "select",options: ["admin","manager", "user"] },
];

const accessBadge = (
  access: TeamD["access"],
  colors: ReturnType<typeof tokens>
) => {
  if (access === "admin") {
    return (
      <Typography
        sx={{
          fontSize: "14px",
          background: colors.greenAccent[500],
          p: "10px",
          borderRadius: "4px",
        }}
      >
        <AdminPannelSettingsOutlinedIcon /> {access}
      </Typography>
    );
  } else if (access === "manager") {
    return (
      <Typography
        sx={{
          fontSize: "14px",
          background: colors.greenAccent[600],
          p: "10px",
          borderRadius: "4px",
        }}
      >
        <LockOpenOutlinedIcon /> {access}
      </Typography>
    );
  }
  return (
    <Typography
      sx={{
        fontSize: "14px",
        background: colors.greenAccent[700],
        p: "10px",
        borderRadius: "4px",
      }}
    >
      <SecurityOutlinedIcon /> {access}
    </Typography>
  );
};

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { role } = useAuth();
  const isAdmin = role === "admin";

  const { data: team, insert, update, remove } = useSupabaseCRUD<TeamD>(
    "team"
  );

  const [open, setOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamD | null>(null);

  const isMobile = useIsMobile();

  const handleSubmit = async (formValues: TeamD) => {
    const payload = {
      name: formValues.name,
      email: formValues.email,
      age: formValues.age,
      phone: formValues.phone,
      access: formValues.access,
    };

    const { error } = editingMember
      ? await update(editingMember.id, payload)
      : await insert(payload);

    if (error) return;

    setOpen(false);
    setEditingMember(null);
  };

  const handleEditClick = (row: TeamD) => {
    setEditingMember(row);
    setOpen(true);
  };

  const handleDeleteClick = async (row: TeamD) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${row.name}"?`
    );
    if (!confirmed) return;
    await remove(row.id);
  };

  const handleAddClick = () => {
    setEditingMember(null);
    setOpen(true);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "NAME", flex: 1 },
    { field: "age", headerName: "AGE", flex: 0.5 },
    { field: "phone", headerName: "PHONE", flex: 0.7 },
    { field: "email", headerName: "EMAIL", flex: 1 },
    {
      field: "access",
      headerName: "ACCESS LEVEL",
      flex: 1,
      renderCell: (params: GridRenderCellParams<TeamD>) =>
        accessBadge(params.row.access, colors),
    },
    ...(isAdmin
      ? [
          {
            field: "actions",
            headerName: "ACTIONS",
            flex: 0.7,
            sortable: false,
            filterable: false,
            renderCell: (params: GridRenderCellParams<TeamD>) => (
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
        <Header title={"TEAM"} subtitle={"Manging the Team Member"} />
      </Box>

      {isAdmin && (
        <Button
          sx={{ background: colors.blueAccent[500], ml: "10px", mb: "10px" }}
          variant="contained"
          onClick={handleAddClick}
        >
          Add Member
        </Button>
      )}

      {isMobile ? (
        <Box className="flex flex-col gap-3 px-2">
          {team.map((member) => (
            <Box
              key={member.id}
              sx={{
                background: colors.primary[400],
                borderRadius: "8px",
                p: 2,
              }}
            >
              <Box className="flex justify-between items-start">
                <Typography variant="h6">{member.name}</Typography>
                {isAdmin && (
                  <Box>
                    <IconButton
                      size="small"
                      onClick={() => handleEditClick(member)}
                    >
                      <EditOutlinedIcon
                        sx={{ color: colors.blueAccent[400] }}
                        fontSize="small"
                      />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteClick(member)}
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
                {member.email}
              </Typography>
              <Typography sx={{ fontSize: "13px", opacity: 0.8 }}>
                {member.phone} — Age: {member.age}
              </Typography>

              <Box sx={{ mt: 1 }}>{accessBadge(member.access, colors)}</Box>
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
            rows={team}
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
            setEditingMember(null);
          }}
        >
          <DialogTitle>
            {editingMember ? "Edit Member" : "Add New Member"}
          </DialogTitle>
          <DynamicForm
            fields={teamFields}
            onSubmit={handleSubmit}
            initialValues={editingMember ?? undefined}
          />
        </Dialog>
      </Box>
    </Box>
  );
};

export default Team;
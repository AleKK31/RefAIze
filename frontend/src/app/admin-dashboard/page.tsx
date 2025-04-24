"use client";

import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  IconButton,
  useTheme,
  styled,
  CssBaseline,
  Divider,
} from "@mui/material";
import {
  Style as StyleIcon,
  Event as EventIcon,
  WbSunny as SeasonIcon,
  Checkroom as ClothingIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import { fetchStyles, createStyle, deleteStyle } from "../../services/styleService";
import { fetchSeasons, createSeason, deleteSeason } from "../../services/seasonService";
import { fetchOccasions, createOccasion, deleteOccasion } from "../../services/occasionService";
import { fetchClothingTypes, createClothingType, deleteClothingType } from "../../services/clothingTypeService";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function AdminDashboard() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [selectedSection, setSelectedSection] = useState("Styles");
  const [data, setData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({ name: "" });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, [selectedSection]);

  const fetchData = async () => {
    try {
      let fetchedData = [];
      switch (selectedSection) {
        case "Styles":
          fetchedData = await fetchStyles();
          break;
        case "Occasions":
          fetchedData = await fetchOccasions();
          break;
        case "Seasons":
          fetchedData = await fetchSeasons();
          break;
        case "Clothing Types":
          fetchedData = await fetchClothingTypes();
          break;
        default:
          console.error("Unknown section:", selectedSection);
      }
      setData(fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSectionChange = (section: string) => {
    setSelectedSection(section);
  };

  const handleOpenDialog = () => {
    setFormData({ name: "" });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      switch (selectedSection) {
        case "Styles":
          await createStyle(formData.name);
          break;
        case "Occasions":
          await createOccasion(formData.name);
          break;
        case "Seasons":
          await createSeason(formData.name);
          break;
        case "Clothing Types":
          await createClothingType(formData.name);
          break;
        default:
          console.error("Unknown section:", selectedSection);
      }
      fetchData();
      setOpenDialog(false);
    } catch (error) {
      console.error("Error creating data:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      switch (selectedSection) {
        case "Styles":
          await deleteStyle(id);
          break;
        case "Occasions":
          await deleteOccasion(id);
          break;
        case "Seasons":
          await deleteSeason(id);
          break;
        case "Clothing Types":
          await deleteClothingType(id);
          break;
        default:
          console.error("Unknown section:", selectedSection);
      }
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const getSectionIcon = () => {
    switch (selectedSection) {
      case "Styles":
        return <StyleIcon />;
      case "Occasions":
        return <EventIcon />;
      case "Seasons":
        return <SeasonIcon />;
      case "Clothing Types":
        return <ClothingIcon />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton
              selected={selectedSection === "Styles"}
              onClick={() => handleSectionChange("Styles")}
            >
              <ListItemIcon>
                <StyleIcon />
              </ListItemIcon>
              <ListItemText primary="Styles" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              selected={selectedSection === "Occasions"}
              onClick={() => handleSectionChange("Occasions")}
            >
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary="Occasions" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              selected={selectedSection === "Seasons"}
              onClick={() => handleSectionChange("Seasons")}
            >
              <ListItemIcon>
                <SeasonIcon />
              </ListItemIcon>
              <ListItemText primary="Seasons" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              selected={selectedSection === "Clothing Types"}
              onClick={() => handleSectionChange("Clothing Types")}
            >
              <ListItemIcon>
                <ClothingIcon />
              </ListItemIcon>
              <ListItemText primary="Clothing Types" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {getSectionIcon()}
            <Typography variant="h4" component="h1">
              {selectedSection}
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenDialog}
            sx={{ height: "fit-content" }}
          >
            Adicionar
          </Button>
        </Box>

        <TableContainer component={Paper} elevation={3}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: theme.palette.grey[100] }}>
                {Object.keys(data[0] || {}).map((key) => (
                  <TableCell key={key} sx={{ fontWeight: "bold" }}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </TableCell>
                ))}
                <TableCell sx={{ fontWeight: "bold" }} align="right">
                  Acoes
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row: { id: number; name?: string }) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {Object.values(row).map((value, index) => (
                    <TableCell key={index}>{value}</TableCell>
                  ))}
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => console.log("Edit", row.id)}
                      aria-label="edit"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(row.id)}
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Main>

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>
          {`Add New ${selectedSection}`}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              name="name"
              fullWidth
              variant="outlined"
              value={formData.name}
              onChange={handleFormChange}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={handleCloseDialog}
            variant="outlined"
            sx={{ minWidth: 100 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{ minWidth: 100 }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
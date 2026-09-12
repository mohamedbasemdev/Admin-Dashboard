import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useEffect, useState } from "react";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import IconButton from "@mui/material/IconButton";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlinedIcon from "@mui/icons-material/PieChartOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import logo from "../../src/assets/photo.jpg";

const SIDEBAR_TRANSITION = "width 0.3s ease";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    const checkSize = () => {
      const mobile = window.innerWidth < 768;

      setIsMobile(mobile);
      setCollapsed(mobile);
    };

    checkSize();

    window.addEventListener("resize", checkSize);

    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const menuItemStyles = {
    button: ({ active }: { active: boolean }) => ({
      background: active ? colors.primary[400] : "transparent",
      color: active ? colors.greenAccent[500] : colors.grey[100],

      "&:hover": {
        background: colors.primary[400],
        color: colors.greenAccent[500],
      },
    }),
  };

  const sidebarWidth = collapsed ? "70px" : isMobile ? "240px" : "270px";

  const wrapperWidth = isMobile ? "70px" : sidebarWidth;
  return (
    <Box
    sx={{
      position: "relative",
      width: wrapperWidth,   
      flexShrink: 0,
      height: "100vh",
      transition: SIDEBAR_TRANSITION,
    }}
  >
      <Box
      sx={{
        position: isMobile && !collapsed ? "absolute" : "relative",
        top: 0,
        left: 0,
        width: sidebarWidth,   
        height: "100vh",
        zIndex: 1200,
        transition: SIDEBAR_TRANSITION,
      }}
    >
        <Sidebar
          collapsed={collapsed}
          width={isMobile ? "240px" : "270px"}
          collapsedWidth="70px"
          transitionDuration={300} // نفس الرقم بالميلي ثانية (300ms = 0.3s)
          rootStyles={{
            height: "100vh",
            backgroundColor: colors.primary[500],

            "& .ps-sidebar-container": {
              backgroundColor: `${colors.primary[500]} !important`,
              height: "100vh",
            },
          }}
        >
          <Box
            className={`flex items-center ${
              collapsed ? "justify-center" : "justify-between"
            }`}
          >
            {!collapsed && (
              <Typography variant="h5" className="pl-2">
                ADMINS
              </Typography>
            )}
            <IconButton onClick={() => setCollapsed(!collapsed)}>
              <MenuOutlinedIcon />
            </IconButton>
          </Box>
          {!collapsed && (
            <Box>
              <img
                className="rounded-full w-24 m-auto"
                src={logo}
                alt="logo"
              />
              <Typography className="text-center" variant="h5">
                Mohamed Basem
              </Typography>
              <Typography
                sx={{ color: colors.blueAccent[700], fontSize: "14px" }}
                className="text-center"
                variant="h6"
              >
                Dashboard Pro
              </Typography>
            </Box>
          )}

          <Menu menuItemStyles={menuItemStyles}>
            <MenuItem
              component={<Link to="/" />}
              icon={<HomeOutlinedIcon />}
              active={location.pathname === "/"}
            >
              Dashboard
            </MenuItem>
            {!collapsed && (
              <Typography sx={{ ml: "10px" }} variant="h6">
                Data
              </Typography>
            )}
            <MenuItem
              component={<Link to="/team" />}
              icon={<PeopleOutlinedIcon />}
              active={location.pathname === "/team"}
            >
              Manage Team
            </MenuItem>
            <MenuItem
              component={<Link to="/contacts" />}
              icon={<ContactPageOutlinedIcon />}
              active={location.pathname === "/contacts"}
            >
              Contacts
            </MenuItem>
            <MenuItem
              component={<Link to="/invoices" />}
              icon={<ReceiptOutlinedIcon />}
              active={location.pathname === "/invoices"}
            >
              Invoices
            </MenuItem>
            {!collapsed && (
              <Typography sx={{ ml: "10px" }} variant="h6">
                Pages
              </Typography>
            )}
            <MenuItem
              component={<Link to="/form" />}
              icon={<PersonOutlinedIcon />}
              active={location.pathname === "/form"}
            >
              Porfile Form
            </MenuItem>
            <MenuItem
              component={<Link to="/calendar" />}
              icon={<CalendarTodayOutlinedIcon />}
              active={location.pathname === "/calendar"}
            >
              Calendar
            </MenuItem>
            <MenuItem
              component={<Link to="/faq" />}
              icon={<HelpOutlinedIcon />}
              active={location.pathname === "/faq"}
            >
              FAQ
            </MenuItem>
            {!collapsed && (
              <Typography sx={{ ml: "10px" }} variant="h6">
                Charts
              </Typography>
            )}
            <MenuItem
              component={<Link to="/bar" />}
              icon={<BarChartOutlinedIcon />}
              active={location.pathname === "/bar"}
            >
              Bar Chart
            </MenuItem>
            <MenuItem
              component={<Link to="/pie" />}
              icon={<PieChartOutlinedIcon />}
              active={location.pathname === "/pie"}
            >
              Pie Chart
            </MenuItem>
            <MenuItem
              component={<Link to="/line" />}
              icon={<TimelineOutlinedIcon />}
              active={location.pathname === "/line"}
            >
              Line Chart
            </MenuItem>
            <MenuItem
              component={<Link to="/geography" />}
              icon={<MapOutlinedIcon />}
              active={location.pathname === "/geography"}
            >
              Geography
            </MenuItem>
          </Menu>
        </Sidebar>
      </Box>
    </Box>
  );
};

export default SideBar;
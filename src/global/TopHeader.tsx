import { TextField, Box, useTheme, useMediaQuery } from "@mui/material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { useContext, useState } from "react";
import { ColorModeContext } from "../context/ColorMode";
import { useNavigate } from "react-router-dom";

type PageItem = {
  label: string;
  path: string;
};

const pages: PageItem[] = [
  { label: "Dashboard", path: "/" },
  { label: "Manage Team", path: "/team" },
  { label: "Contacts", path: "/contacts" },
  { label: "Invoices", path: "/invoices" },
  { label: "Profile Form", path: "/form" },
  { label: "Calendar", path: "/calendar" },
  { label: "FAQ", path: "/faq" },
  { label: "Bar Chart", path: "/bar" },
  { label: "Pie Chart", path: "/pie" },
  { label: "Line Chart", path: "/line" },
  { label: "Geography", path: "/geography" },
];

const TopHeader = () => {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate("/register");
  };

  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredPages = pages.filter((page) =>
    page.label.toLowerCase().includes(query.trim().toLowerCase())
  );

  const goToPage = (path: string) => {
    navigate(path);
    setQuery("");
    setShowSuggestions(false);
  };

  const handleSearchSubmit = () => {
    if (filteredPages.length > 0) {
      goToPage(filteredPages[0].path);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
    if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const isMobile = useMediaQuery("(max-width:600px)")
return (
  <Box
    className={`py-3 px-3 flex ${
      isMobile
        ? "flex-col items-center gap-3"
        : "items-center justify-between"
    }`}
  >
    <Box sx={{ position: "relative" }}>
      <TextField
        size="small"
        className="w-50"
        placeholder="Search pages..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => {
          setTimeout(() => setShowSuggestions(false), 150);
        }}
        onKeyDown={handleKeyDown}
      />

      <IconButton
        onClick={handleSearchSubmit}
        sx={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <SearchIcon />
      </IconButton>

      {showSuggestions && query.trim() !== "" && (
        <Box
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 10,
            background: theme.palette.background.paper,
            boxShadow: 3,
            borderRadius: "4px",
            mt: "4px",
            maxHeight: "250px",
            overflowY: "auto",
          }}
        >
          {filteredPages.length > 0 ? (
            filteredPages.map((page) => (
              <Box
                key={page.path}
                onClick={() => goToPage(page.path)}
                sx={{
                  px: 2,
                  py: 1,
                  cursor: "pointer",
                  "&:hover": {
                    background: theme.palette.action.hover,
                  },
                }}
              >
                {page.label}
              </Box>
            ))
          ) : (
            <Box sx={{ px: 2, py: 1, opacity: 0.6 }}>
              No results
            </Box>
          )}
        </Box>
      )}
    </Box>

    <Box>
      <IconButton onClick={colorMode.toggleColorMode}>
        {theme.palette.mode === "light" ? (
          <LightModeOutlinedIcon />
        ) : (
          <DarkModeOutlinedIcon />
        )}
      </IconButton>

      <IconButton>
        <NotificationsOutlinedIcon />
      </IconButton>

      <IconButton>
        <SettingsOutlinedIcon />
      </IconButton>

      <IconButton onClick={goToRegister}>
        <PersonOutlinedIcon />
      </IconButton>
    </Box>
  </Box>
);
}

export default TopHeader;
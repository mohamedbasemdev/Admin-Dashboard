import { Box } from "@mui/material";
import SideBar from "../global/SideBar";
import TopHeader from "../global/TopHeader";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box className="flex" sx={{ height: "100vh", overflow: "hidden" }}>
      <SideBar />
      <div className="content" style={{ overflow: "auto" }}>
        <TopHeader />
        {children}
      </div>
    </Box>
  );
};

export default DashboardLayout;
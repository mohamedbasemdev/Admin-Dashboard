import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import ProgressRecycle from "./ProgressRecycle";
import type { ReactNode } from "react";
import { tokens } from "../theme";

type StatBoxProps = {
  progress: number;
  icon: ReactNode;
  title: string;
  subtitle: string;
  increase: string;
};
const StatBox = ({ progress, icon, title, subtitle, increase }: StatBoxProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <Box className="p-5 flex justify-between" sx={{background: colors.primary[400]}}>
      <Box>
        {icon}
        <Typography sx={{mt:'5px'}} variant="h5">{title}</Typography>
        <Typography sx={{color: colors.greenAccent[400], fontSize: `${isMobile ? '11px' : '14px'}`}} variant="h6">{subtitle}</Typography>
      </Box>
      <Box>
        <ProgressRecycle progress={progress} size={isMobile ? 20 : 40}/>
        <Typography sx={{mt: '10px'}} variant="h5">{increase}</Typography>
      </Box>
    </Box>
  );
};

export default StatBox;

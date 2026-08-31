import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const ProgressRecycle = ({ progress = 0.7, size = 40 }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const angle = progress * 360;

  return (
    <Box
      sx={{
        background: `radial-gradient(${colors.primary[400]} 55%, transparent 56%),
         conic-gradient( ${colors.greenAccent[500]} 0deg ${angle}deg, ${colors.blueAccent[500]} ${angle}deg 360deg )`,
        height: size + "px",
        width: size + "px",
        borderRadius: "50%",
      }}
    ></Box>
  );
};

export default ProgressRecycle;

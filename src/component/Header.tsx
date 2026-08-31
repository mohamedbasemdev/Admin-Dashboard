import { Box, Typography, useTheme } from "@mui/material"
import { tokens } from "../theme";

const Header = ({title, subtitle}: {title:string, subtitle:string}) => {
      const theme = useTheme();
      const colors = tokens(theme.palette.mode);
  return (
    <Box className="py-5">
        <Typography variant="h3">{title}</Typography>
        <Typography sx={{color: colors.greenAccent[400]}} variant="h5">{subtitle}</Typography>
    </Box>
  )
}

export default Header
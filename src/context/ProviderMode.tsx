import { useMode } from "../theme";
import { type PropsWithChildren } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {ColorModeContext} from "./ColorMode"

export const ProviderMode = ({ children }: PropsWithChildren) => {
  const [colorMode, theme] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

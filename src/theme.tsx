import { useMemo, useState } from "react";
import { createTheme } from "@mui/material/styles";

export const tokens = (mode: "light" | "dark") => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#F5F5F5",
          200: "#E0E0E0",
          300: "#BDBDBD",
          400: "#9E9E9E",
          500: "#757575",
          600: "#616161",
          700: "#424242",
          800: "#303030",
          900: "#212121",
        },

        primary: {
          100: "#EDE7F6",
          200: "#D1C4E9",
          300: "#B39DDB",
          400: "#2A2438",
          500: "#1C1825",
          600: "#16131D",
          700: "#100D15",
          800: "#0B0910",
          900: "#050407",
        },

        greenAccent: {
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
          800: "#065F46",
          900: "#064E3B",
        },

        redAccent: {
          100: "#FFE4E6",
          200: "#FECDD3",
          300: "#FDA4AF",
          400: "#FB7185",
          500: "#F43F5E",
          600: "#E11D48",
          700: "#BE123C",
          800: "#9F1239",
          900: "#881337",
        },

        blueAccent: {
          100: "#EDE9FE",
          200: "#DDD6FE",
          300: "#C4B5FD",
          400: "#A78BFA",
          500: "#8B5CF6",
          600: "#7C3AED",
          700: "#6D28D9",
          800: "#5B21B6",
          900: "#4C1D95",
        },
      }
    : {
        grey: {
          100: "#212121",
          200: "#303030",
          300: "#424242",
          400: "#616161",
          500: "#757575",
          600: "#9E9E9E",
          700: "#BDBDBD",
          800: "#E0E0E0",
          900: "#F5F5F5",
        },

        primary: {
          100: "#FAFAFA",
          200: "#F5F5F5",
          300: "#EEEEEE",
          400: "#FFFFFF",
          500: "#FFFFFF",
          600: "#F5F5F5",
          700: "#E0E0E0",
          800: "#BDBDBD",
          900: "#9E9E9E",
        },

        greenAccent: {
          100: "#064E3B",
          200: "#065F46",
          300: "#047857",
          400: "#059669",
          500: "#10B981",
          600: "#34D399",
          700: "#6EE7B7",
          800: "#A7F3D0",
          900: "#D1FAE5",
        },

        redAccent: {
          100: "#881337",
          200: "#9F1239",
          300: "#BE123C",
          400: "#E11D48",
          500: "#F43F5E",
          600: "#FB7185",
          700: "#FDA4AF",
          800: "#FECDD3",
          900: "#FFE4E6",
        },

        blueAccent: {
          100: "#4C1D95",
          200: "#5B21B6",
          300: "#6D28D9",
          400: "#7C3AED",
          500: "#8B5CF6",
          600: "#A78BFA",
          700: "#C4B5FD",
          800: "#DDD6FE",
          900: "#EDE9FE",
        },
      }),
});

export const settingTheme = (mode: "light" | "dark") => {
  const colors = tokens(mode);

  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#1C1825",
              paper: "#2A2438",
            },
          }
        : {
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#FAFAFA",
              paper: "#FFFFFF",
            },
          }),
    },
    typography: {
      fontFamily: ["DM Sans", "sans-serif"].join(","),
      fontSize: 12,
    },
    h1: {
      fontFamily: ["DM Sans", "sans-serif"].join(","),
      fontSize: 40,
    },
    h2: {
      fontFamily: ["DM Sans", "sans-serif"].join(","),
      fontSize: 32,
    },
    h3: {
      fontFamily: ["DM Sans", "sans-serif"].join(","),
      fontSize: 24,
    },
    h4: {
      fontFamily: ["DM Sans", "sans-serif"].join(","),
      fontSize: 20,
    },
    h5: {
      fontFamily: ["DM Sans", "sans-serif"].join(","),
      fontSize: 16,
    },
    h6: {
      fontFamily: ["DM Sans", "sans-serif"].join(","),
      fontSize: 14,
    },
  };
};

export const useMode = () => {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(() => createTheme(settingTheme(mode)), [mode]);

  return [colorMode, theme] as const;
};

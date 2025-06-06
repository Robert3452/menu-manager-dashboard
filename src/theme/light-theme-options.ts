// Colors

import { ThemeOptions } from "@mui/material";

const neutral = {
  100: "#f4f4f4", // converted from #F3F4F6
  200: "#e7e7e7", // converted from #E5E7EB
  300: "#d5d5d5", // converted from #D1D5DB
  400: "#a3a3a3", // converted from #9CA3AF
  500: "#727272", // converted from #6B7280
  600: "#565656", // converted from #4B5563
  700: "#404040", // converted from #374151
  800: "#292929", // converted from #1F2937
  900: "#161616", // converted from #111827
};

const background = {
  default: "#F9FAFC",
  paper: "#FAFAFA",
};

const divider = "#E6E8F0";

const primary = {
  // main: "#5048E5",
  // light: "#828DF8",
  // dark: "#3832A0",
  main: "#E2725B",
  light: "#F5B9AE",
  dark: "#A44C39",
  contrastText: "#FAFAFA",
};

// const secondary = {
//   main: "#FFC107",
//   light: "#FFDC69",
//   dark: "#CC9A06",
//   contrastText: "#FAFAFA",
// };

const secondary = {
  main: "#39831E",
  light: "#5CA344",
  dark: "#255912",
  contrastText: "#FAFAFA",
};

const success = {
  main: "#14B8A6",
  light: "#43C6B7",
  dark: "#0E8074",
  contrastText: "#FAFAFA",
};

const info = {
  main: "#2196F3",
  light: "#64B6F7",
  dark: "#0B79D0",
  contrastText: "#FAFAFA",
};

const warning = {
  main: "#FFB020",
  light: "#FFBF4C",
  dark: "#B27B16",
  contrastText: "#FAFAFA",
};

const error = {
  main: "#D14343",
  light: "#DA6868",
  dark: "#922E2E",
  contrastText: "#FAFAFA",
};

const text = {
  primary: "#121828",
  secondary: "#65748B",
  disabled: "rgba(55, 65, 81, 0.48)",
};

export const lightThemeOptions: ThemeOptions = {
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: neutral[500],
          color: "#FAFAFA",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          "&.MuiChip-filledDefault": {
            backgroundColor: neutral[200],
            "& .MuiChip-deleteIcon": {
              color: neutral[400],
            },
          },
          "&.MuiChip-outlinedDefault": {
            "& .MuiChip-deleteIcon": {
              color: neutral[300],
            },
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          "&::placeholder": {
            opacity: 1,
            color: text.secondary,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: divider,
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderColor: divider,
          borderStyle: "solid",
          borderWidth: 1,
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderColor: divider,
          borderStyle: "solid",
          borderWidth: 1,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { boxShadow: "5px 5px 16px 0px rgba(0,0,0,0.2)" ,},
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          color: neutral[500],
        },
        track: {
          backgroundColor: neutral[400],
          opacity: 1,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${divider}`,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: neutral[100],
          ".MuiTableCell-root": {
            color: neutral[700],
          },
        },
      },
    },
  },
  palette: {
    action: {
      active: neutral[500],
      focus: "rgba(55, 65, 81, 0.12)",
      hover: "rgba(55, 65, 81, 0.04)",
      selected: "rgba(55, 65, 81, 0.08)",
      disabledBackground: "rgba(55, 65, 81, 0.12)",
      disabled: "rgba(55, 65, 81, 0.26)",
    },
    background,
    divider,
    error,
    info,
    mode: "light",
    grey: neutral,
    primary,
    secondary,
    success,
    text,
    warning,
  },
  shadows: [
    "none",
    "0px 1px 1px rgba(100, 116, 139, 0.06), 0px 1px 2px rgba(100, 116, 139, 0.1)",
    "0px 1px 2px rgba(100, 116, 139, 0.12)",
    "0px 1px 4px rgba(100, 116, 139, 0.12)",
    "0px 1px 5px rgba(100, 116, 139, 0.12)",
    "0px 1px 6px rgba(100, 116, 139, 0.12)",
    "0px 2px 6px rgba(100, 116, 139, 0.12)",
    "0px 3px 6px rgba(100, 116, 139, 0.12)",
    "0px 2px 4px rgba(31, 41, 55, 0.06), 0px 4px 6px rgba(100, 116, 139, 0.12)",
    "0px 5px 12px rgba(100, 116, 139, 0.12)",
    "0px 5px 14px rgba(100, 116, 139, 0.12)",
    "0px 5px 15px rgba(100, 116, 139, 0.12)",
    "0px 6px 15px rgba(100, 116, 139, 0.12)",
    "0px 7px 15px rgba(100, 116, 139, 0.12)",
    "0px 8px 15px rgba(100, 116, 139, 0.12)",
    "0px 9px 15px rgba(100, 116, 139, 0.12)",
    "0px 10px 15px rgba(100, 116, 139, 0.12)",
    "0px 12px 22px -8px rgba(100, 116, 139, 0.25)",
    "0px 13px 22px -8px rgba(100, 116, 139, 0.25)",
    "0px 14px 24px -8px rgba(100, 116, 139, 0.25)",
    "0px 10px 10px rgba(31, 41, 55, 0.04), 0px 20px 25px rgba(31, 41, 55, 0.1)",
    "0px 25px 50px rgba(100, 116, 139, 0.25)",
    "0px 25px 50px rgba(100, 116, 139, 0.25)",
    "0px 25px 50px rgba(100, 116, 139, 0.25)",
    "0px 25px 50px rgba(100, 116, 139, 0.25)",
  ],
};

import { createTheme } from "@mui/material";

export const NAV_BAR = {
  height: 60,
};

export const darkForm = createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          "&.page-container": {
            minWidth: "100%",
            minHeight: `calc(100vh - ${NAV_BAR.height}px)`,
            backgroundColor: "#2e3440fc",
            display: "flex",
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "#fff",
          fontSize: 20,
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: "#fff",
          "&.Mui-checked": {
            color: "white",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiFilledInput-root": {
            backgroundColor: "#ffffff21",
            borderRadius: "4px",
            border: "2px solid #1976d2",
          },
          "& .MuiFormHelperText-root": {
            backgroundColor: "transparent",
          },
        },
      },
      defaultProps: {
        variant: "filled",
        InputProps: {
          style: {
            color: "#fff",
          },
        },
        InputLabelProps: {
          style: {
            color: "#fff",
          },
        },
      },
    },
  },
});

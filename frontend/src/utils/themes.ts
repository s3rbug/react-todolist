import { colors } from '@mui/material';
import {createTheme } from '@mui/material/styles';

export const themes = {
    lightTheme: createTheme({
        palette: {
            mode: "light",
            chip: "#E0E0E0",
            background: {
                default: "#D3D3D3",
                paper: "#FFFFFF"
            },
            primary: {
                main: colors.indigo[600]
            },
            secondary: {
                main: "#FF0000"
            },
        },
    }),
    darkTheme: createTheme({
        palette: {
            mode: "dark",
            chip: "#535353",
            primary: {
                main: "#3a86ff",
            },
            secondary: {
                main: "#e63946",
            },
            action: {
                disabledBackground: "#121212",
            },
            background: {
                default: "#303030",
                paper: "#424242"
            },
        },
    })
}

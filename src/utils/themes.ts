import { createMuiTheme } from '@material-ui/core/styles';

export const themes = {
    lightTheme: createMuiTheme({
        palette: {
            type: "light",
            chip: "#E0E0E0",
            success: {
                main: "#558B2F",
                dark: "#33691E",
            },
            background: {
                default: "#D3D3D3",
            },
        },
    }),
    darkTheme: createMuiTheme({
        palette: {
            type: "dark",
            chip: "#535353",
            primary: {
                main: "#2196F3",
            },
            success: {
                main: "#2a9d8f",
                dark: "#028090",
            },
            secondary: {
                main: "#e63946",
            },
            action: {
                disabledBackground: "#121212",
            },
        },
    })
}

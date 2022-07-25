import { makeStyles, StyleRules, Theme} from '@material-ui/core';

export const useStyles = makeStyles(
    (theme: Theme): StyleRules<string> => ({
        card: {
            display: "inline-flex",
            alignItems: "flex-start",
            flexDirection: "column",
            boxShadow: theme.shadows[6],
            marginTop: "10px",
            marginBottom: "20px",
            background: theme.palette.background.paper,
            borderRadius: "10px",
            padding: "20px",
            paddingBottom: "10px"
        },
        root: {
            display: "flex",
            justifyContent: "center"
        },
        textField: {
            marginTop: "20px",
            width: "100%"
        },
        register: {
            padding: "0"
        },
        confirmDiv: {
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            gap: "20px"
        },
        title: {
            alignSelf: "center"
        },
        link: {
            color: theme.palette.primary.light,
            textDecoration: "none"
        },
    })
);
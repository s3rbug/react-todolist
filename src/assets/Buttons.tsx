import React from "react";
import {
    StyleRules,
    Theme,
    makeStyles,
    Button,
    ButtonProps,
} from "@material-ui/core";

const useStyles = makeStyles(
    (theme: Theme): StyleRules<string> => ({
        bold: {
            fontWeight: "bold",
        },
        cancel: {
            color: theme.palette.action.active,
        },
    })
);

export const CancelDialogButton = (props: ButtonProps) => {
    const classes = useStyles();
    return (
        <Button {...props} className={classes.cancel + " , " + classes.bold} />
    );
};

export const ApplyDialogButton = (props: ButtonProps) => {
    const classes = useStyles();
    return <Button {...props} className={classes.bold} />;
};

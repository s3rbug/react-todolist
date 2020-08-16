import React from "react";
import {
	StyleRules,
	Theme,
	makeStyles,
	Button,
	ButtonProps,
} from "@material-ui/core";
import { combineStyles } from "../utils/helpers";

const useStyles = makeStyles(
	(theme: Theme): StyleRules<string> => ({
		bold: {
			fontWeight: "bold",
			color: "white",
		},
		cancel: {
			color: theme.palette.action.active,
		},
	})
);

export const CancelDialogButton = (props: ButtonProps) => {
	const classes = useStyles();
	return (
		<Button
			{...props}
			className={combineStyles([classes.cancel, classes.bold])}
		/>
	);
};

export const DeleteDialogButton = (props: ButtonProps) => {
	const classes = useStyles();
	return (
		<Button
			{...props}
			className={combineStyles([classes.delete, classes.bold])}
			variant="contained"
			color="secondary"
		/>
	);
};

export const ApplyDialogButton = (props: ButtonProps) => {
	const classes = useStyles();
	return (
		<Button
			{...props}
			className={classes.bold}
			variant="contained"
			color="primary"
		/>
	);
};

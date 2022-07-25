import React from "react";
import {
	StyleRules,
	Theme,
	makeStyles,
	Button,
	ButtonProps,
} from "@material-ui/core";
import clsx from "clsx";

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
			className={clsx(classes.cancel, classes.bold, props.className)}
		/>
	);
};

export const DeleteDialogButton = (props: ButtonProps) => {
	const classes = useStyles();
	return (
		<Button
			{...props}
			className={clsx(classes.delete, classes.bold, props.className)}
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

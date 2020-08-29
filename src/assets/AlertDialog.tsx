import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { CancelDialogButton, ApplyDialogButton } from "./Buttons";

type AlertDialogPropsType = {
	question: string;
	text: string;
	open: boolean;
	handleSuccess: () => void;
	handleFail: () => void;
};

const AlertDialog = ({
	question,
	text,
	open,
	handleSuccess,
	handleFail,
}: AlertDialogPropsType) => {
	return (
		<Dialog
			open={open}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">{question}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					{text}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<CancelDialogButton autoFocus onClick={handleFail} color="primary">
					No
				</CancelDialogButton>
				<ApplyDialogButton
					variant="contained"
					onClick={handleSuccess}
					color="primary"
				>
					Yes
				</ApplyDialogButton>
			</DialogActions>
		</Dialog>
	);
};

export default AlertDialog;

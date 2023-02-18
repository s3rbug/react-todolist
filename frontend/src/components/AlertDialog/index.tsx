import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { CancelDialogButton, ApplyDialogButton } from "../"

type AlertDialogPropsType = {
	question: string
	text?: string
	open: boolean
	handleSuccess: () => void
	handleFail: () => void
}

export const AlertDialog = ({
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
	)
}

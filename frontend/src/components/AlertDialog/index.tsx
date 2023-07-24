import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { DialogButtons } from "../"
import { useTranslation } from "react-i18next"

type PropsType = {
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
}: PropsType) => {
	const { t } = useTranslation()
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
			<DialogButtons
				handleClose={handleFail}
				handleSubmit={handleSuccess}
				closeText={t("dialog.no")}
				submitText={t("dialog.yes")}
			/>
		</Dialog>
	)
}

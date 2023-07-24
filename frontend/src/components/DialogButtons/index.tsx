import { Button, DialogActions, Box } from "@mui/material"
import { useTranslation } from "react-i18next"

type PropsType = {
	handleDelete?: () => void
	handleClose?: () => void
	handleSubmit?: () => void
	deleteText?: string
	closeText?: string
	submitText?: string
	padding?: number
}

export const DialogButtons = ({
	handleDelete,
	handleClose,
	handleSubmit,
	deleteText,
	closeText,
	submitText,
	padding,
}: PropsType) => {
	const { t } = useTranslation()
	return (
		<DialogActions
			sx={{
				display: "flex",
				justifyContent: handleDelete ? "space-between" : "flex-end",
				justifyItems: "flex-end",
				gap: 4,
				p: padding ?? 2,
			}}
		>
			{handleDelete && (
				<Button
					variant="contained"
					color="secondary"
					sx={{
						fontWeight: "bold",
					}}
					onClick={handleDelete}
				>
					{deleteText ?? t("dialog.delete")}
				</Button>
			)}
			<Box sx={{ display: "flex", gap: 1 }}>
				{handleClose && (
					<Button
						sx={{
							color: "action.active",
							fontWeight: "bold",
						}}
						onClick={handleClose}
					>
						{closeText ?? t("dialog.cancel")}
					</Button>
				)}
				<Button
					sx={{
						fontWeight: "bold",
					}}
					type="submit"
					variant="contained"
					color="primary"
					onClick={handleSubmit}
				>
					{submitText ?? t("dialog.done")}
				</Button>
			</Box>
		</DialogActions>
	)
}

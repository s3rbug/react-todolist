import { useState, ChangeEvent } from "react"
import { Dialog, Input, DialogContent } from "@mui/material"
import { DialogButtons } from "../../../../components"
import { addFolder } from "../../../../redux/middleware/goal"
import { useTypedDispatch, useTypedSelector } from "../../../../redux/store"
import { useTranslation } from "react-i18next"
import { uiActions } from "../../../../redux/slices/ui"

export const AddFolderDialog = () => {
	const [headline, setHeadline] = useState("")
	const dispatch = useTypedDispatch()
	const { addFolder: open } = useTypedSelector((state) => state.ui.modals)
	const { t } = useTranslation()

	const handleClose = () => {
		dispatch(uiActions.setModalOpen({ type: "addFolder", open: false }))
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length <= 15) {
			setHeadline(e.target.value)
		}
	}

	const handleAddFolder = () => {
		dispatch(addFolder({ headline }))
		setHeadline("")
		handleClose()
	}

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogContent>
				<Input
					autoFocus
					fullWidth
					placeholder={t("drawer.new-folder-placeholder")}
					value={headline}
					sx={{
						fontSize: "1.6rem",
					}}
					onChange={handleChange}
				/>
			</DialogContent>
			<DialogButtons
				handleClose={handleClose}
				handleSubmit={handleAddFolder}
				submitText={t("dialog.add")}
			/>
		</Dialog>
	)
}

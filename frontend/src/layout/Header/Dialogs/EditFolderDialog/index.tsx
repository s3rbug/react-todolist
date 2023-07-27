import { useState, useEffect, ChangeEvent } from "react"
import { Dialog, DialogTitle, Input } from "@mui/material"
import { DialogButtons } from "../../../../components"
import {
	deleteFolder,
	editFolderHeadline,
} from "../../../../redux/middleware/goal"
import { useTypedDispatch, useTypedSelector } from "../../../../redux/store"
import { useTranslation } from "react-i18next"
import { uiActions } from "../../../../redux/slices/ui"

type PropsType = {
	headline: string
	folderId: string
}

export const EditFolderDialog = ({ headline, folderId }: PropsType) => {
	const [newHeadline, setNewHeadline] = useState(headline)
	const dispatch = useTypedDispatch()
	const { t } = useTranslation()
	const { editFolder: open } = useTypedSelector((state) => state.ui.modals)

	useEffect(() => {
		setNewHeadline(headline)
	}, [headline])

	const handleClose = () => {
		setNewHeadline(headline)
		dispatch(uiActions.setModalOpen({ type: "editFolder", open: false }))
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length <= 15) {
			setNewHeadline(e.target.value)
		}
	}

	const handleSave = () => {
		dispatch(editFolderHeadline({ folderId, headline: newHeadline }))
		handleClose()
	}

	const handleDelete = () => {
		dispatch(deleteFolder({ folderId }))
		handleClose()
	}

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>
				<Input
					sx={{ fontSize: "1.6rem" }}
					value={newHeadline}
					placeholder={t("drawer.folder-placeholder")}
					onChange={handleChange}
					autoFocus
					fullWidth
				/>
			</DialogTitle>
			<DialogButtons
				handleDelete={handleDelete}
				handleClose={handleClose}
				handleSubmit={handleSave}
				submitText={t("dialog.apply")}
			/>
		</Dialog>
	)
}

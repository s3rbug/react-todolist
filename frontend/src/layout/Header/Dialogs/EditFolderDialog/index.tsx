import { useState, useEffect, ChangeEvent } from "react"
import { Dialog, DialogTitle, Input } from "@mui/material"
import { DialogButtons } from "../../../../components"
import {
	deleteFolder,
	editFolderHeadline,
} from "../../../../redux/middleware/goal"
import { useTypedDispatch } from "../../../../redux/store"
import { useTranslation } from "react-i18next"

type PropsType = {
	headline: string
	open: boolean
	setOpen: (open: boolean) => void
	folderId: string
}

export const EditFolderDialog = ({
	open,
	setOpen,
	headline,
	folderId,
}: PropsType) => {
	const [newHeadline, setNewHeadline] = useState(headline)
	const dispatch = useTypedDispatch()
	const { t } = useTranslation()

	useEffect(() => {
		setNewHeadline(headline)
	}, [headline])

	const handleClose = () => {
		setNewHeadline(headline)
		setOpen(false)
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

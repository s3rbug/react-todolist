import { useState, useEffect, ChangeEvent } from "react"
import { Dialog, DialogTitle, DialogActions, Input } from "@mui/material"
import {
	CancelDialogButton,
	ApplyDialogButton,
	DeleteDialogButton,
} from "../../../../components"
import {
	deleteFolder,
	editFolderHeadline,
} from "../../../../redux/middleware/goal"
import { useTypedDispatch } from "../../../../redux/store"

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
					onChange={handleChange}
					autoFocus
				/>
			</DialogTitle>
			<DialogActions sx={{ paddingLeft: 3 }}>
				<DeleteDialogButton
					sx={{
						marginRight: "auto",
					}}
					onClick={handleDelete}
				>
					Delete
				</DeleteDialogButton>
				<CancelDialogButton onClick={handleClose}>Cancel</CancelDialogButton>
				<ApplyDialogButton onClick={handleSave}>Apply</ApplyDialogButton>
			</DialogActions>
		</Dialog>
	)
}

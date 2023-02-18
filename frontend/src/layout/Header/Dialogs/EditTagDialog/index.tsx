import { useState, useEffect, ChangeEvent } from "react"
import { Dialog, DialogTitle, Input, DialogActions } from "@mui/material"
import {
	ApplyDialogButton,
	CancelDialogButton,
	DeleteDialogButton,
} from "../../../../components"
import { deleteTag, editTag } from "../../../../redux/middleware/goal"
import { useTypedDispatch } from "../../../../redux/reduxStore"

type PropsType = {
	open: boolean
	setOpen: (open: boolean) => void
	tagName: string
	tagId: string
}

export const EditTagDialog = ({ open, setOpen, tagId, tagName }: PropsType) => {
	const [newName, setNewName] = useState("")
	const dispatch = useTypedDispatch()
	useEffect(() => {
		setNewName(tagName)
	}, [tagName])

	const handleClose = () => {
		setOpen(false)
	}
	const handleEdit = () => {
		dispatch(editTag({ tagId, newTag: { name: newName } }))
		handleClose()
	}
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length <= 15) {
			setNewName(e.target.value)
		}
	}
	const handleDelete = () => {
		dispatch(deleteTag({ tagId }))
		handleClose()
	}
	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>
				<Input
					autoFocus
					onChange={handleChange}
					value={newName}
					sx={{ fontSize: "1.6em" }}
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
				<ApplyDialogButton onClick={handleEdit}>Save</ApplyDialogButton>
			</DialogActions>
		</Dialog>
	)
}

export default EditTagDialog

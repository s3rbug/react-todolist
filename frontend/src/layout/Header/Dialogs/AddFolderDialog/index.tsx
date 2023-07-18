import { useState, ChangeEvent } from "react"
import { Dialog, Input, DialogContent, DialogActions } from "@mui/material"
import { CancelDialogButton, ApplyDialogButton } from "../../../../components"
import { addFolder } from "../../../../redux/middleware/goal"
import { useTypedDispatch } from "../../../../redux/store"

type PropsType = {
	open: boolean
	setOpen: (open: boolean) => void
}

export const AddFolderDialog = ({ open, setOpen }: PropsType) => {
	const [headline, setHeadline] = useState("")
	const dispatch = useTypedDispatch()
	const handleClose = () => {
		setOpen(false)
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
					placeholder="Folder name"
					value={headline}
					sx={{
						fontSize: "1.6em",
					}}
					onChange={handleChange}
				/>
			</DialogContent>
			<DialogActions>
				<CancelDialogButton onClick={handleClose}>Cancel</CancelDialogButton>
				<ApplyDialogButton onClick={handleAddFolder}>Add</ApplyDialogButton>
			</DialogActions>
		</Dialog>
	)
}

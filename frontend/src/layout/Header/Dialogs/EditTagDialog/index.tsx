import { useState, useEffect, ChangeEvent } from "react"
import { Dialog, DialogTitle, Input } from "@mui/material"
import { DialogButtons } from "../../../../components"
import { deleteTag, editTag } from "../../../../redux/middleware/goal"
import { useTypedDispatch } from "../../../../redux/store"
import { useTranslation } from "react-i18next"

type PropsType = {
	open: boolean
	setOpen: (open: boolean) => void
	tagName: string
	tagId: string
}

export const EditTagDialog = ({ open, setOpen, tagId, tagName }: PropsType) => {
	const [newName, setNewName] = useState("")
	const dispatch = useTypedDispatch()
	const { t } = useTranslation()

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
					fullWidth
					onChange={handleChange}
					value={newName}
					placeholder={t("drawer.tag-placeholder")}
					sx={{ fontSize: "1.6rem" }}
				/>
			</DialogTitle>
			<DialogButtons
				handleDelete={handleDelete}
				handleClose={handleClose}
				handleSubmit={handleEdit}
				submitText={t("dialog.apply")}
			/>
		</Dialog>
	)
}

export default EditTagDialog

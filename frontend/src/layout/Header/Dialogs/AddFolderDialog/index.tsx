import { useState, ChangeEvent } from "react"
import { Dialog, Input, DialogContent } from "@mui/material"
import { DialogButtons } from "../../../../components"
import { addFolder } from "../../../../redux/middleware/goal"
import { useTypedDispatch } from "../../../../redux/store"
import { useTranslation } from "react-i18next"

type PropsType = {
	open: boolean
	setOpen: (open: boolean) => void
}

export const AddFolderDialog = ({ open, setOpen }: PropsType) => {
	const [headline, setHeadline] = useState("")
	const dispatch = useTypedDispatch()
	const { t } = useTranslation()

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

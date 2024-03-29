import { useState, ChangeEvent } from "react"
import {
	Dialog,
	DialogTitle,
	DialogContent,
	Input,
	useTheme,
} from "@mui/material"
import { ColorResult, HuePicker } from "react-color"
import { Goal, DialogButtons } from "../../../../components"
import { addTag } from "../../../../redux/middleware/goal"
import { useTypedDispatch, useTypedSelector } from "../../../../redux/store"
import { Box } from "@mui/system"
import { GoalType } from "../../../../redux/types/goal"
import { useTranslation } from "react-i18next"
import { uiActions } from "../../../../redux/slices/ui"

export const AddTagDialog = () => {
	const theme = useTheme()
	const dispatch = useTypedDispatch()
	const { t } = useTranslation()
	const { addTag: open } = useTypedSelector((state) => state.ui.modals)

	const [checked, setChecked] = useState(false)
	const [color, setColor] = useState(theme.palette.primary.main)
	const [tagName, setTagName] = useState("new tag")

	const testGoal: GoalType = {
		id: "example",
		checked,
		note: "example",
		tagId: undefined,
		text: "Example text",
	}

	const handleClose = () => {
		dispatch(uiActions.setModalOpen({ type: "addTag", open: false }))
	}
	const toggleCheckbox = () => {
		setChecked(!checked)
	}
	const handleChangeComplete = (newColor: ColorResult) => {
		setColor(newColor.hex)
	}
	const handleChange = (newColor: ColorResult) => {
		setColor(newColor.hex)
	}
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length <= 15) {
			setTagName(e.target.value)
		}
	}
	const handleAddTag = () => {
		dispatch(addTag({ name: tagName, color }))
		handleClose()
	}
	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle sx={{ width: "100%" }}>
				<Input
					autoFocus
					fullWidth
					value={tagName}
					sx={{ fontSize: "1.6rem" }}
					placeholder={t("drawer.new-tag-placeholder")}
					onChange={handleInputChange}
				/>
			</DialogTitle>
			<DialogContent>
				<Box
					sx={{
						borderLeft: `4px solid ${color}`,
						position: "relative",
						borderBottom: (theme) =>
							`1px solid ${theme.palette.action.selected}`,
						borderTop: (theme) => `1px solid ${theme.palette.action.selected}`,
						boxShadow: 3,
						cursor: "default",
						zIndex: 0,
						display: "flex",
						marginBottom: 2,
						px: 2,
						py: 1,
						alignItems: "center",
					}}
				>
					<Goal toggleCheckbox={toggleCheckbox} goal={testGoal} />
				</Box>
				<HuePicker
					width={"100%"}
					color={color}
					onChangeComplete={handleChangeComplete}
					onChange={handleChange}
				/>
			</DialogContent>
			<DialogButtons
				handleClose={handleClose}
				handleSubmit={handleAddTag}
				submitText={t("dialog.add")}
			/>
		</Dialog>
	)
}

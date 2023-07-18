import { useState, ChangeEvent } from "react"
import {
	Dialog,
	DialogTitle,
	DialogContent,
	Input,
	DialogActions,
	Checkbox,
	useTheme,
} from "@mui/material"
import { ColorResult, HuePicker } from "react-color"
import { CancelDialogButton, ApplyDialogButton } from "../../../../components"
import { addTag } from "../../../../redux/middleware/goal"
import { useTypedDispatch } from "../../../../redux/store"
import { Box } from "@mui/system"

type PropsType = {
	open: boolean
	setOpen: (open: boolean) => void
}

export const AddTagDialog = ({ open, setOpen }: PropsType) => {
	const theme = useTheme()
	const dispatch = useTypedDispatch()

	const [checked, setChecked] = useState(false)
	const [color, setColor] = useState(theme.palette.primary.main)
	const [tagName, setTagName] = useState("new tag")

	const handleClose = () => {
		setOpen(false)
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
		setOpen(false)
	}
	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle sx={{ width: "400px" }}>
				<Input
					autoFocus
					value={tagName}
					sx={{ fontSize: "1.6em" }}
					onChange={handleInputChange}
				/>
			</DialogTitle>
			<DialogContent>
				<Box
					sx={{
						borderLeft: `4px solid ${color}`,
						width: "100%",
						height: "100%",
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
					}}
				>
					<Box
						sx={{
							textDecoration: checked ? "line-through" : "none",
							userSelect: "none",
							alignSelf: "center",
							flexGrow: 1,
						}}
					>
						Example text
					</Box>
					<Box>
						<Checkbox
							color="secondary"
							edge="end"
							checked={checked}
							onChange={toggleCheckbox}
							value={0}
						/>
					</Box>
				</Box>
				<HuePicker
					width={"100%"}
					color={color}
					onChangeComplete={handleChangeComplete}
					onChange={handleChange}
				/>
			</DialogContent>
			<DialogActions>
				<CancelDialogButton onClick={handleClose}>Cancel</CancelDialogButton>
				<ApplyDialogButton onClick={handleAddTag}>Add</ApplyDialogButton>
			</DialogActions>
		</Dialog>
	)
}

import { useState } from "react"
import {
	Dialog,
	DialogActions,
	Typography,
	DialogContent,
	TextField,
	Box,
} from "@mui/material"
import { GoalType, TagType, TaskDetailsFormType } from "../../../types/index_d"
import {
	ApplyDialogButton,
	DeleteDialogButton,
	CancelDialogButton,
} from "../../../components"
import Chip from "@mui/material/Chip"
import { useForm } from "react-hook-form"
import { deleteGoal, editGoal } from "../../../redux/middleware/goal"
import { useTypedDispatch } from "../../../redux/store"

type PropsType = {
	open: boolean
	setOpen: (isOpen: boolean) => void
	goal: GoalType
	tags: ReadonlyArray<TagType>
	folderId: string
}

export const TaskDetails = ({
	open,
	goal,
	tags,
	folderId,
	setOpen,
}: PropsType) => {
	const dispatch = useTypedDispatch()

	const [newTagId, setNewTagId] = useState<string | undefined>(goal.tagId)
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TaskDetailsFormType>()

	const handleClose = () => {
		setOpen(false)
		setNewTagId(goal.tagId)
	}
	const deleteCurrentGoal = () => {
		dispatch(deleteGoal({ folderId, goalId: goal.id }))
		handleClose()
	}
	const onSubmit = (data: TaskDetailsFormType) => {
		setOpen(false)
		dispatch(
			editGoal({
				folderId,
				goalId: goal.id,
				newGoal: {
					text: data.goalText,
					note: data.noteText,
					tagId: newTagId,
				},
			})
		)
	}
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			sx={{
				"& .MuiPaper-rounded": {
					borderRadius: 3,
				},
			}}
		>
			<Box
				component={"form"}
				sx={{
					mx: 2.5,
					mb: 1.5,
					mt: 3,
				}}
				key={"task-details-" + goal.id + "-folder-" + folderId}
				onSubmit={handleSubmit(onSubmit)}
			>
				<DialogContent sx={{ padding: 0 }}>
					<TextField
						{...register("goalText", {
							required: {
								value: true,
								message: "Goal can not be empty",
							},
							maxLength: {
								value: 30,
								message: "Max goal length is 30",
							},
						})}
						sx={{
							mb: 1.5,
							"& input": {
								fontSize: "1.7em",
							},
						}}
						defaultValue={goal.text}
						fullWidth
						error={!!errors.goalText}
						helperText={errors.goalText?.message}
						variant="standard"
						placeholder="Goal title"
					/>
					<div>
						{tags.map((tag) => {
							return (
								<Chip
									key={`tags-${tag.name}-${tag.color}`}
									label={tag.name}
									sx={{
										fontSize: "0.9em",
										fontWeight: "bold",
										borderStyle: "solid",
										letterSpacing: "0.05em",
										marginRight: 1,
										marginBottom: 2,
										color: "text.secondary",
										boxSizing: "border-box",
										transition: "all .5s",
										borderColor:
											tag.id === newTagId ? tag.color : "action.disabled",
										borderWidth: tag.id === newTagId ? "3.3px" : "2px",
										background:
											tag.id === newTagId
												? tag.color + "48" // #48 - 0.3 opacity
												: "palette.chip",
									}}
									onClick={() => {
										if (tag.id === newTagId) {
											setNewTagId(undefined)
										} else {
											setNewTagId(tag.id)
										}
									}}
								/>
							)
						})}
					</div>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
						}}
					>
						<Typography
							color="textSecondary"
							sx={{
								marginTop: 1,
								marginBottom: 1,
								fontSize: "1.1em",
							}}
						>
							NOTES
						</Typography>
						<TextField
							{...register("noteText", {
								maxLength: { value: 50, message: "Max note length is 50" },
							})}
							sx={{
								mb: 3,
								"& input": {
									fontSize: "1.1em",
								},
							}}
							error={!!errors.noteText}
							helperText={errors.noteText?.message}
							defaultValue={goal.note}
							placeholder="There is no notes, but you can change it"
							variant="standard"
						/>
					</Box>
				</DialogContent>
				<DialogActions sx={{ padding: 0 }}>
					<DeleteDialogButton onClick={deleteCurrentGoal} sx={{ mr: 15 }}>
						Delete
					</DeleteDialogButton>
					<CancelDialogButton onClick={handleClose}>Cancel</CancelDialogButton>
					<ApplyDialogButton type="submit">Done</ApplyDialogButton>
				</DialogActions>
			</Box>
		</Dialog>
	)
}

import { useState } from "react"
import {
	Dialog,
	Typography,
	DialogContent,
	TextField,
	Box,
} from "@mui/material"
import {
	GoalType,
	TagType,
	TaskDetailsFormType,
} from "../../../redux/types/goal"
import { DialogButtons } from "../../../components"
import Chip from "@mui/material/Chip"
import { useForm } from "react-hook-form"
import { deleteGoal, editGoal } from "../../../redux/middleware/goal"
import { useTypedDispatch } from "../../../redux/store"
import { useTranslation } from "react-i18next"

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
	const { t } = useTranslation()

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
				key={`details-${goal.id}-folder-${folderId}`}
				onSubmit={handleSubmit(onSubmit)}
			>
				<DialogContent sx={{ padding: 0 }}>
					<TextField
						{...register("goalText", {
							required: {
								value: true,
								message: t("form.required", { name: "Goal" }),
							},
							maxLength: {
								value: 30,
								message: t("form.max-length", { maxLength: 30 }),
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
						placeholder={t("folder.goal-title")}
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
							{t("folder.notes").toUpperCase()}
						</Typography>
						<TextField
							{...register("noteText", {
								maxLength: {
									value: 50,
									message: t("form.max-length", { maxLength: 50 }),
								},
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
							placeholder={t("folder.no-notes")}
							variant="standard"
						/>
					</Box>
				</DialogContent>
				<DialogButtons
					handleDelete={deleteCurrentGoal}
					handleClose={handleClose}
					padding={0}
				/>
				{/* <DialogActions sx={{ padding: 0 }}>
					<DeleteDialogButton onClick={deleteCurrentGoal} sx={{ mr: 15 }}>
						{t("dialog.delete")}
					</DeleteDialogButton>
					<CancelDialogButton onClick={handleClose}>
						{t("dialog.cancel")}
					</CancelDialogButton>
					<ApplyDialogButton type="submit">
						{t("dialog.done")}
					</ApplyDialogButton>
				</DialogActions> */}
			</Box>
		</Dialog>
	)
}

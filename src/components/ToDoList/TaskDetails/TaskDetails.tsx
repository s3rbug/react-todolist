import React, { useState } from "react";
import {
	Dialog,
	DialogActions,
	makeStyles,
	StyleRules,
	Theme,
	DialogTitle,
	Typography,
	DialogContent,
	useTheme,
	TextField,
} from "@material-ui/core";
import { GoalType, TagType, TaskDetailsFormType } from "../../../types/index_d";
import {
	ApplyDialogButton,
	DeleteDialogButton,
	CancelDialogButton,
} from "../../../assets/Buttons";
import Chip from "@material-ui/core/Chip";
import { useForm } from "react-hook-form";
import { saveTaskDetails, deleteGoal } from "../../../redux/middleware/todo";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../redux/reduxStore";
import {
	setTagAction,
	setNoteAction,
	setGoalAction,
	deleteTaskAction,
} from "../../../redux/actions/todo";

const useStyles = makeStyles(
	(theme: Theme): StyleRules<string> => ({
		buttons: {
			display: "flex",
			width: "100%",
		},
		button: {
			width: "50%",
		},
		notes: {
			display: "flex",
			flexDirection: "column",
		},
		taskInput: {
			fontSize: "2em",
		},
		infoFontSize: {
			fontSize: "1.3em",
		},
		notesLabel: {
			marginTop: theme.spacing(1),
			marginBottom: "5px",
		},
		cancel: {
			flexGrow: 1,
		},
		dialogTitle: {
			paddingBottom: theme.spacing(1),
		},
		chip: {
			fontSize: "1em",
			fontFamily: "sans-serif",
			fontWeight: "bolder",
			borderStyle: "solid",
			letterSpacing: "0.05em",
			marginRight: "5px",
			marginBottom: "5px",
			color: theme.palette.text.secondary,
			boxSizing: "border-box",
			transition: "all .5s",
		},
	})
);

type PropsType = {
	open: boolean;
	setOpen: (isOpen: boolean) => void;
	goal: GoalType;
	deleteTask: (id: number, folderId: number) => void;
	tags: ReadonlyArray<TagType>;
	folderId: number;
};

const TaskDetails = ({
	open,
	goal,
	tags,
	folderId,
	setOpen,
	deleteTask,
}: PropsType) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const theme = useTheme();
	const serverless = useTypedSelector((state) => state.ui.serverless);
	const [newTagId, setNewTagId] = useState<number | undefined | null>(goal.tag);
	const { register, handleSubmit, formState: { errors } } = useForm<TaskDetailsFormType>();
	const handleClose = () => {
		setOpen(false);
		setNewTagId(null);
	};
	const deleteCurrentTask = () => {
		if (serverless) dispatch(deleteTaskAction(goal.id, folderId));
		else dispatch(deleteGoal(goal.id, folderId));
		handleClose();
	};
	const onSubmit = (data: TaskDetailsFormType) => {
		setOpen(false);
		if (serverless) {
			dispatch(setTagAction(goal.id, newTagId, folderId));
			dispatch(setNoteAction(goal.id, data.noteText, folderId));
			dispatch(setGoalAction(goal.id, data.goalText, folderId));
		} else
			dispatch(
				saveTaskDetails(
					goal.id,
					data.goalText,
					data.noteText,
					newTagId,
					folderId
				)
			);
	};
	return (
		<Dialog open={open} onClose={handleClose}>
			<form
				key={"task-details-" + goal.id + "-folder-" + folderId}
				onSubmit={handleSubmit(onSubmit)}
			>
				<DialogTitle className={classes.dialogTitle}>
					<TextField
						{...register("goalText", {
							required: {
								value: true,
								message: "Goal can not be empty"},
							maxLength: {
								value: 30,
								message: "Max goal length is 30",
							},
						})}
						InputProps={{
							classes: {
								input: classes.taskInput,
							},
						}}
						defaultValue={goal.text}
						fullWidth
						error={!!errors.goalText}
						helperText={errors.goalText?.message}
					/>
				</DialogTitle>
				<DialogContent>
					<div>
						{tags.map((tag, tagId) => {
							return (
								<Chip
									key={"tags-" + tag.name + tag.color}
									label={tag.name}
									className={classes.chip}
									style={{
										borderColor:
											tagId === newTagId
												? tags[newTagId].color
												: theme.palette.action.disabled,
										borderWidth: tagId === newTagId ? "3.3px" : "2px",
										background:
											tagId === newTagId
												? tags[newTagId].color + "48" // #48 - 0.3 opacity
												: theme.palette.chip,
									}}
									onClick={() => {
										if (tagId === newTagId) setNewTagId(null);
										else setNewTagId(tagId);
									}}
								/>
							);
						})}
					</div>
					<div className={classes.notes}>
						<Typography
							variant="h6"
							color="textSecondary"
							className={classes.notesLabel}
						>
							NOTES
						</Typography>
						<TextField
							{...register("noteText", {
								required: {value: true, message: "Note can not be empty"},
								maxLength: {value: 50, message: "Max note length is 50"}
							})}
							error={!!errors.noteText}
							helperText={errors.noteText?.message}
							defaultValue={goal.note}
							className={classes.infoFontSize}
							placeholder="There is no notes, but you can change it!"
						/>
					</div>
				</DialogContent>
				<DialogContent>
					<DialogActions style={{ paddingLeft: 0 }}>
						<DeleteDialogButton onClick={deleteCurrentTask}>
							Delete
						</DeleteDialogButton>
						<div className={classes.cancel}></div>
						<CancelDialogButton onClick={handleClose}>
							Cancel
						</CancelDialogButton>
						<ApplyDialogButton type="submit">Done</ApplyDialogButton>
					</DialogActions>
				</DialogContent>
			</form>
		</Dialog>
	);
};

export default TaskDetails;

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

const useStyles = makeStyles(
	(theme: Theme): StyleRules<string> => ({
		root: {
			padding: "100px",
		},
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
			marginTop: "15px",
			marginBottom: "5px",
		},
		createdLabel: {
			marginTop: "5px",
			marginBottom: "5px",
		},
		cancel: {
			flexGrow: 1,
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
		},
	})
);

type PropsType = {
	open: boolean;
	setOpen: (isOpen: boolean) => void;
	goal: GoalType;
	setGoal: (id: number, text: string, folderId: number) => void;
	setNote: (id: number, newNote: string, folderId: number) => void;
	deleteTask: (id: number, folderId: number) => void;
	setTag: (taskId: number, tagId: number, folderId: number) => void;
	tags: ReadonlyArray<TagType>;
	deleteTag: (tagId: number) => void;
	folderId: number;
};

const TaskDetails = ({
	open,
	goal,
	tags,
	folderId,
	setOpen,
	setGoal,
	setNote,
	deleteTask,
	setTag,
	deleteTag,
}: PropsType) => {
	const classes = useStyles();
	const theme = useTheme();
	const [newTagId, setNewTagId] = useState<number | undefined>(goal.tag);
	const { register, handleSubmit, errors } = useForm<TaskDetailsFormType>();
	const handleClose = () => {
		setNewTagId(undefined);
		setOpen(false);
	};
	const deleteCurrentTask = () => {
		deleteTask(goal.id, folderId);
		handleClose();
	};
	const onSubmit = (data: TaskDetailsFormType) => {
		setGoal(goal.id, data.goalText, folderId);
		setNote(goal.id, data.noteText, folderId);
		if (newTagId !== undefined) setTag(goal.id, newTagId, folderId);
		setOpen(false);
	};
	return (
		<Dialog open={open} onClose={handleClose}>
			<form
				key={"task-details-" + goal.id + "-folder-" + folderId}
				onSubmit={handleSubmit(onSubmit)}
			>
				<DialogTitle id="task-dialog-title">
					<TextField
						inputRef={register({
							required: "Goal can not be empty",
							maxLength: {
								value: 30,
								message: "Max goal length is 30",
							},
						})}
						name="goalText"
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
									onDelete={() => deleteTag(tagId)}
									onClick={() => setNewTagId(tagId)}
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
							inputRef={register({
								required: "Note can not be empty",
								maxLength: {
									value: 50,
									message: "Max note length is 50",
								},
							})}
							error={!!errors.noteText}
							helperText={errors.noteText?.message}
							name="noteText"
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

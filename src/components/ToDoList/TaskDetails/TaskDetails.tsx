import React from "react";
import {
	Dialog,
	Input,
	DialogActions,
	makeStyles,
	StyleRules,
	Theme,
	DialogTitle,
	Typography,
	DialogContent,
	useTheme,
} from "@material-ui/core";
import { GoalType, TagType } from "../../../types/index_d";
import { ApplyDialogButton, DeleteDialogButton } from "../../../assets/Buttons";
import Chip from "@material-ui/core/Chip";

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
	tags: Array<TagType>;
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
	const handleClose = () => {
		if (goal.text !== "") setOpen(false);
	};
	const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length <= 30) setGoal(goal.id, e.target.value, folderId);
	};
	const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length <= 40) setNote(goal.id, e.target.value, folderId);
	};
	const deleteCurrentTask = () => {
		deleteTask(goal.id, folderId);
		handleClose();
	};
	const handleKeys = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") handleClose();
	};
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="add-task-dialog"
			onKeyDown={handleKeys}
		>
			<DialogTitle id="task-dialog-title">
				<Input
					className={classes.taskInput}
					value={goal.text}
					onChange={handleTaskChange}
					fullWidth
				/>
			</DialogTitle>
			<DialogContent>
				<div>
					{tags.map((tag, tagId) => {
						return (
							<Chip
								key={"tags-" + tag.name + tag.color}
								label={tag.name}
								style={{
									color: theme.palette.text.secondary,
									borderColor:
										tagId === goal.tag
											? tag.color
											: theme.palette.action.disabled,
									fontSize: "1em",
									fontFamily: "sans-serif",
									fontWeight: "bolder",
									borderWidth: "2px",
									borderStyle: "solid",
									letterSpacing: "0.05em",
									marginRight: "5px",
									marginBottom: "5px",
								}}
								onDelete={() => deleteTag(tagId)}
								onClick={() => setTag(goal.id, tagId, folderId)}
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
					<Input
						value={goal.note}
						onChange={handleNoteChange}
						className={classes.infoFontSize}
						placeholder="There is no notes, but you can change it!"
					/>
				</div>
			</DialogContent>
			<DialogContent>
				<DialogActions>
					<DeleteDialogButton onClick={deleteCurrentTask}>
						Delete task
					</DeleteDialogButton>
					<ApplyDialogButton onClick={handleClose}>Done</ApplyDialogButton>
				</DialogActions>
			</DialogContent>
		</Dialog>
	);
};

export default TaskDetails;

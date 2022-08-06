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
import { deleteGoal, editGoal } from "../../../redux/middleware/goal";
import { useTypedDispatch } from "../../../redux/reduxStore";

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
	tags: ReadonlyArray<TagType>;
	folderId: string;
};

const TaskDetails = ({
	open,
	goal,
	tags,
	folderId,
	setOpen,
}: PropsType) => {
	const classes = useStyles();
	const dispatch = useTypedDispatch();
	const theme = useTheme();

	const [newTagId, setNewTagId] = useState<string | undefined>(goal.tagId);
	const { register, handleSubmit, formState: { errors } } = useForm<TaskDetailsFormType>();
	
	const handleClose = () => {
		setOpen(false);
		setNewTagId(goal.tagId);
	};
	const deleteCurrentGoal = () => {
		dispatch(deleteGoal(folderId, goal.id));
		handleClose();
	};
	const onSubmit = (data: TaskDetailsFormType) => {
		setOpen(false);		
		dispatch(editGoal(
			folderId,
			goal.id, 
			{
				text: data.goalText,
				note: data.noteText,
				tagId: newTagId
			}
		))
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
						{tags.map((tag) => {
							return (
								<Chip
									key={`tags-${tag.name}-${tag.color}`}
									label={tag.name}
									className={classes.chip}
									style={{
										borderColor:
											tag.id === newTagId
												? tag.color
												: theme.palette.action.disabled,
										borderWidth: tag.id === newTagId ? "3.3px" : "2px",
										background:
											tag.id === newTagId
												? tag.color + "48" // #48 - 0.3 opacity
												: theme.palette.chip,
									}}
									onClick={() => {
										if (tag.id === newTagId){
											setNewTagId(undefined);
										}
										else { 
											setNewTagId(tag.id);
										}
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
						<DeleteDialogButton onClick={deleteCurrentGoal}>
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

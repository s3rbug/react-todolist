import React, { useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import { GoalType } from "./../../types/index_d";
import TaskDetails from "./TaskDetails/TaskDetails";
import { Theme, makeStyles, StyleRules, Tooltip } from "@material-ui/core";
import { combineStyles } from "../../utils/helpers";
import { useDispatch } from "react-redux";
import { deleteTaskAction } from "../../redux/actions/todo";
import { useTypedSelector } from "../../redux/reduxStore";

const useStyles = makeStyles(
	(theme: Theme): StyleRules<string> => ({
		item: {
			position: "relative",
			borderBottom: "1px solid " + theme.palette.action.selected,
			borderTop: "1px solid " + theme.palette.action.selected,
			boxShadow: theme.shadows[3],
			cursor: "default",
			zIndex: 0,
			overflow: "hidden",
		},
		checkedText: {
			textDecoration: "line-through",
			opacity: 0.95,
			color: theme.palette.text.secondary,
		},
		notSelectable: {
			userSelect: "none",
		},
	})
);

type PropsType = {
	goal: GoalType;
	folderId: number;
	toggleCheckbox: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ToDo = ({ goal, folderId, toggleCheckbox }: PropsType) => {
	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();

	const tags = useTypedSelector((state) => state.todo.tags);

	const deleteTask = (id: number, folderId: number) =>
		dispatch(deleteTaskAction(id, folderId));

	const currentColor =
		goal.tag === undefined || goal.tag === null
			? undefined
			: tags[goal.tag].color;
	const classes = useStyles();
	const handleClick = () => {
		setOpen(true);
	};
	return (
		<div>
			<ListItem
				onClick={handleClick}
				className={classes.item}
				style={{
					borderLeft:
						currentColor === undefined ? "none" : "4px solid " + currentColor,
				}}
			>
				<Tooltip
					title={
						goal.tag === null || goal.tag === undefined
							? ""
							: tags[goal.tag].name
					}
					placement="right"
					arrow
				>
					<span
						className={combineStyles(
							goal.checked ? classes.checkedText : "",
							classes.notSelectable
						)}
					>
						{goal.text}
					</span>
				</Tooltip>
				<ListItemSecondaryAction>
					<Checkbox
						edge="end"
						checked={goal.checked}
						onChange={toggleCheckbox}
						value={goal.id}
						className={classes.checkbox}
					/>
				</ListItemSecondaryAction>
			</ListItem>
			<TaskDetails
				open={open}
				setOpen={setOpen}
				goal={goal}
				deleteTask={deleteTask}
				tags={tags}
				folderId={folderId}
			/>
		</div>
	);
};

export default ToDo;

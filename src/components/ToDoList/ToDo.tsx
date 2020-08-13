import React, { useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import { GoalType, TagType } from "./../../types/index_d";
import TaskDetails from "./TaskDetails/TaskDetails";
import {
	Theme,
	makeStyles,
	StyleRules,
	useTheme,
	Tooltip,
} from "@material-ui/core";
import { combineStyles } from "../../utils/helpers";

const useStyles = (color: string) =>
	makeStyles(
		(theme: Theme): StyleRules<string> => ({
			root: {
				background: theme.palette.background.paper,
			},
			item: {
				width: "100%",
				height: "100%",
				position: "relative",
				borderBottom: "1px solid " + theme.palette.action.selected,
				borderTop: "1px solid " + theme.palette.action.selected,
				boxShadow: theme.shadows[3],
				cursor: "default",
				zIndex: 0,
				borderLeft: "4px solid " + color,
			},
			checked: {
				textDecoration: "line-through",
			},
			notSelectable: {
				userSelect: "none",
			},
		})
	);

type PropsType = {
	goal: GoalType;
	tags: Array<TagType>;
	folderId: number;
	toggleCheckbox: (event: React.ChangeEvent<HTMLInputElement>) => void;
	setGoal: (id: number, text: string, folderId: number) => void;
	setNote: (id: number, newNote: string, folderId: number) => void;
	deleteTask: (id: number, folderId: number) => void;
	setTag: (taskId: number, tagId: number, folderId: number) => void;
	deleteTag: (tagId: number) => void;
};

const ToDo = ({
	goal,
	folderId,
	tags,
	toggleCheckbox,
	setGoal,
	setNote,
	deleteTask,
	setTag,
	deleteTag,
}: PropsType) => {
	const [open, setOpen] = useState(false);
	const theme = useTheme();
	const currentColor =
		goal.tag === undefined
			? theme.palette.background.paper
			: tags[goal.tag].color;
	const classes = useStyles(currentColor)();
	const handleClick = () => {
		setOpen(true);
	};
	return (
		<div className={classes.root}>
			<ListItem onClick={handleClick} className={classes.item}>
				<Tooltip
					title={goal.tag === undefined ? "" : tags[goal.tag].name}
					placement="right"
					arrow
				>
					<span
						className={combineStyles([
							goal.checked ? classes.checked : "",
							classes.notSelectable,
						])}
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
					/>
				</ListItemSecondaryAction>
			</ListItem>
			<TaskDetails
				open={open}
				setOpen={setOpen}
				goal={goal}
				setGoal={setGoal}
				setNote={setNote}
				deleteTask={deleteTask}
				setTag={setTag}
				tags={tags}
				deleteTag={deleteTag}
				folderId={folderId}
			/>
		</div>
	);
};

export default ToDo;

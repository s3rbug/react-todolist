import React, { useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import { GoalType } from "../../types/index_d";
import TaskDetails from "./TaskDetails/TaskDetails";
import { Theme, makeStyles, StyleRules, Tooltip } from "@material-ui/core";
import { useTypedSelector } from "../../redux/reduxStore";
import clsx from "clsx";

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
	folderId: string;
	toggleCheckbox: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Goal = ({ goal, folderId, toggleCheckbox }: PropsType) => {
	const [open, setOpen] = useState(false);
	const tags = useTypedSelector(state => state.goal.tags);

	const currentTag = tags.find(tag => tag.id === goal.tagId)

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
						currentTag?.color === undefined ? "none" : "4px solid " + currentTag?.color,
				}}
			>
				<Tooltip
					title={
						currentTag?.name || ""
					}
					placement="right"
					arrow
				>
					<span
						className={clsx(
							goal.checked && classes.checkedText,
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
				tags={tags}
				folderId={folderId}
			/>
		</div>
	);
};

export default Goal;

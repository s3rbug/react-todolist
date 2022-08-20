import { useState, ChangeEvent } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Checkbox from "@mui/material/Checkbox";
import { GoalType } from "../../types/index_d";
import TaskDetails from "./TaskDetails/TaskDetails";
import { Box, Tooltip } from "@mui/material";
import { useTypedSelector } from "../../redux/reduxStore";

type PropsType = {
	goal: GoalType;
	folderId: string;
	toggleCheckbox: (event: ChangeEvent<HTMLInputElement>) => void;
};

const Goal = ({ goal, folderId, toggleCheckbox }: PropsType) => {
	const [open, setOpen] = useState(false);
	const tags = useTypedSelector(state => state.goal.tags);

	const currentTag = tags.find(tag => tag.id === goal.tagId)

	const handleClick = () => {
		setOpen(true);
	};
	return (
        <>
			<ListItem
				onClick={handleClick}
				sx={{
					position: 'relative',
					borderBottom: 1,
					borderTop: 1, 
					borderColor: "action.selected",
					boxShadow: 3,
					cursor: "default",
					zIndex: 0,
					overflow: "hidden",
					borderLeft: currentTag?.color === undefined ? "none" : `4px solid ${currentTag?.color}`,
				}}
			>
				<Tooltip
					title={
						currentTag?.name || ""
					}
					placement="right"
					arrow
				>
					<Box
						sx={{
							textDecoration: goal.checked ? "line-through" : "none",
							opacity: goal.checked ? 0.95 : 1,
							color: goal.checked ? "text.secondary" : "text.primary",
							userSelect: "none",
						}}
					>
						{goal.text}
					</Box>
				</Tooltip>
				<ListItemSecondaryAction>
					<Checkbox
						color="secondary"
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
				tags={tags}
				folderId={folderId}
			/>
		</>
    );
};

export default Goal;

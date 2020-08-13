import React from "react";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import { Theme, StyleRules, Typography } from "@material-ui/core";
import DraggableItem from "../../assets/DraggableItem";
import DroppableItem from "../../assets/DroppableItem";
import ToDo from "./ToDo";
import { TaskFormDataType, FolderType, TagType } from "../../types/index_d";
import AddGoal from "./AddGoal";
import { useTypedSelector } from "../../redux/reduxStore";

const useStyles = makeStyles(
	(theme: Theme): StyleRules<string> => ({
		root: {
			width: "100%",
			height: "100%",
			paddingLeft: "10px",
			paddingRight: "10px",
		},
		list: {
			width: "100%",
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
		},
		paper: {
			height: "80%",
			boxShadow: theme.shadows[6],
			width: "90%",
			margin: "3%",
			marginBottom: "0",
			display: "flex",
			flexDirection: "column",
			background: theme.palette.background.paper,
			borderRadius: "10px",
		},
		goals: {
			padding: "4%",
		},
	})
);

interface PropsType {
	addGoal: (goalText: string, folderId: number) => void;
	toggleChecked: (id: number, folderId: number) => void;
	setGoal: (id: number, newGoal: string, folderId: number) => void;
	setNote: (id: number, newNote: string, folderId: number) => void;
	deleteTask: (id: number, folderId: number) => void;
	setTag: (tagId: number, goalId: number, folderId: number) => void;
	deleteTag: (tagId: number) => void;
	tags: Array<TagType>;
	folderId: number;
}

const ToDoList = ({
	addGoal,
	toggleChecked,
	setGoal,
	setNote,
	deleteTask,
	setTag,
	deleteTag,
	folderId,
	tags,
}: PropsType) => {
	const classes = useStyles();

	const currentFolder: FolderType = useTypedSelector(
		(state) => state.todo.folders[folderId]
	);
	const toggleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value) toggleChecked(parseInt(e.target.value), folderId);
	};

	const onGoalSubmit = (formData: TaskFormDataType) => {
		addGoal(formData.goal, folderId);
		formData.goal = "";
	};

	return (
		<div className={classes.root}>
			<div className={classes.paper}>
				<div className={classes.goals}>
					<Typography align="center" variant="h4">
						{currentFolder.headline}
					</Typography>
					<DroppableItem droppableId={"DroppableToDo-" + folderId}>
						<List className={classes.list}>
							{currentFolder.goals.map((goal) => {
								return (
									<DraggableItem
										id={goal.id}
										key={"Goal-id: " + goal.id + " Folder-id: " + folderId}
										adding={folderId.toString()}
									>
										<ToDo
											setGoal={setGoal}
											goal={goal}
											toggleCheckbox={toggleCheckbox}
											setNote={setNote}
											deleteTask={deleteTask}
											setTag={setTag}
											tags={tags}
											deleteTag={deleteTag}
											folderId={folderId}
										/>
									</DraggableItem>
								);
							})}
						</List>
					</DroppableItem>
				</div>
				<AddGoal form={"add-goal-form" + folderId} onSubmit={onGoalSubmit} />
			</div>
		</div>
	);
};

export default ToDoList;

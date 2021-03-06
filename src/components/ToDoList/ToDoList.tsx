import React from "react";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import { Theme, StyleRules, Typography, useTheme } from "@material-ui/core";
import DraggableItem from "../../assets/DraggableItem";
import DroppableItem from "../../assets/DroppableItem";
import ToDo from "./ToDo";
import { FolderType } from "../../types/index_d";
import AddGoal from "./AddGoal";
import { useTypedSelector } from "../../redux/reduxStore";
import { DraggingStyle, NotDraggingStyle } from "react-beautiful-dnd";
import FolderLabel from "./FolderLabel";
import { useDispatch } from "react-redux";
import { toggleChecked } from "../../redux/middleware/todo";
import { toggleCheckedAction } from "../../redux/actions/todo";

const useStyles = makeStyles(
	(theme: Theme): StyleRules<string> => ({
		root: {
			paddingLeft: theme.spacing(3),
			paddingRight: theme.spacing(3),
		},
		list: {
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
		},
		paper: {
			boxShadow: theme.shadows[6],
			marginTop: "10px",
			marginBottom: "20px",
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
	folderId: number;
}

const ToDoList = ({ folderId }: PropsType) => {
	const classes = useStyles();
	const theme = useTheme();

	const dispatch = useDispatch();
	const folders = useTypedSelector((state) => state.todo.folders);
	const currentFolder: FolderType = useTypedSelector(
		(state) => state.todo.folders[folderId]
	);
	const serverless = useTypedSelector((state) => state.ui.serverless);

	const toggleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value) {
			if (serverless)
				dispatch(toggleCheckedAction(parseInt(e.target.value), folderId));
			else dispatch(toggleChecked(parseInt(e.target.value), folderId));
		}
	};

	const getItemStyle = (
		isDragging: boolean,
		draggableStyle: DraggingStyle | NotDraggingStyle | undefined
	) => ({
		background: isDragging
			? theme.palette.divider
			: theme.palette.background.paper,
		...draggableStyle,
	});

	return (
		<div className={classes.root}>
			<FolderLabel
				folders={folders}
				folderId={folderId}
				headline={currentFolder.headline}
			/>
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
										getItemStyle={getItemStyle}
									>
										<ToDo
											toggleCheckbox={toggleCheckbox}
											folderId={folderId}
											goal={goal}
										/>
									</DraggableItem>
								);
							})}
						</List>
					</DroppableItem>
				</div>
				<AddGoal folderId={folderId} />
			</div>
		</div>
	);
};

export default ToDoList;

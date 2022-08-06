import React from "react";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import { Theme, StyleRules, Typography, useTheme } from "@material-ui/core";
import DraggableItem from "../../assets/DraggableItem";
import DroppableItem from "../../assets/DroppableItem";
import Goal from "./Goal";
import { FolderType } from "../../types/index_d";
import AddGoal from "./AddGoal";
import { useTypedDispatch, useTypedSelector } from "../../redux/reduxStore";
import { DraggingStyle, NotDraggingStyle } from "react-beautiful-dnd";
import FolderLabel from "./FolderLabel";
import { toggleChecked } from "../../redux/middleware/goal";

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
	folderId: string;
}

const ToDoList = ({ folderId }: PropsType) => {
	const classes = useStyles();
	const theme = useTheme();

	const dispatch = useTypedDispatch();
	const folders = useTypedSelector((state) => state.goal.folders);
	const currentFolder: FolderType | undefined = useTypedSelector(
		(state) => state.goal.folders.find(folder => folder.id === folderId)
	);
	
	const toggleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value) {
			const goalId: string = e.target.value
			dispatch(toggleChecked(folderId, goalId))
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

	if(!currentFolder){
		return null
	}

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
					<DroppableItem droppableId={`DroppableToDo-${folderId}`}>
						<List className={classes.list}>
							{currentFolder.goals.map((goal, index) => {
								return (
									<DraggableItem
										draggableId={`${folderId}-${goal.id}`}
										index={index}
										key={`Goal-id-${goal.id}-folder-id-${folderId}`}
										getItemStyle={getItemStyle}
									>
										<Goal
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

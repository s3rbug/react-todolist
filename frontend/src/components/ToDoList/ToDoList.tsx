import {ChangeEvent} from "react";
import List from "@mui/material/List";
import { Box, Typography } from "@mui/material";
import DraggableItem from "../../assets/DraggableItem";
import DroppableItem from "../../assets/DroppableItem";
import Goal from "./Goal";
import { FolderType } from "../../types/index_d";
import AddGoal from "./AddGoal";
import { useTypedDispatch, useTypedSelector } from "../../redux/reduxStore";
import { DraggingStyle, NotDraggingStyle } from "react-beautiful-dnd";
import FolderLabel from "./FolderLabel";
import { toggleChecked } from "../../redux/middleware/goal";

type PropsType = {
	folderId: string;
}

const ToDoList = ({ folderId }: PropsType) => {

	const dispatch = useTypedDispatch();
	const folders = useTypedSelector((state) => state.goal.folders);
	const currentFolder: FolderType | undefined = useTypedSelector(
		(state) => state.goal.folders.find(folder => folder.id === folderId)
	);
	const isDragDisabled = useTypedSelector(state => state.ui.isPageLoading)
	const toggleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.value) {
			const goalId: string = e.target.value
			dispatch(toggleChecked(folderId, goalId))
		}
	};

	const getDraggableSx = (
		isDragging: boolean,
		draggableStyle: DraggingStyle | NotDraggingStyle | undefined
	) => ({
		...draggableStyle,
		backgroundColor: "background.paper",
	});

	if(!currentFolder){
		return null
	}

	return (
        <Box sx={{
			paddingLeft: 3,
			paddingRight: 3,
		}}>
			<FolderLabel
				folders={folders}
				folderId={folderId}
				headline={currentFolder.headline}
			/>
			<Box sx={{
					boxShadow: 6,
					marginTop: 1.5,
					marginBottom: 3,
					display: "flex",
					flexDirection: "column",
					backgroundColor: "background.paper",
					borderRadius: 3,
			}}>
				<Box sx={{padding: "4%", pb: 1.5}}>
					<Typography align="center" sx={{
						fontSize: "2.2em"
					}}>
						{currentFolder.headline}
					</Typography>
					<DroppableItem droppableId={`DroppableFolder-${folderId}`}>
						<List sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
						}}>
							{currentFolder.goals.map((goal, index) => {
								return (
									<DraggableItem
										draggableId={`${folderId}-${goal.id}`}
										index={index}
										key={`Draggable-goal-${goal.id}-folder-${folderId}`}
										getDraggableSx={getDraggableSx}
										isDragDisabled={isDragDisabled}
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
				</Box>
				<AddGoal folderId={folderId} />
			</Box>
		</Box>
    );
};

export default ToDoList;

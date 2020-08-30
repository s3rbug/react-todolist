import React from "react";
import { Grid } from "@material-ui/core";
import ToDoList from "./ToDoList/ToDoList";
import { useTypedSelector } from "../redux/reduxStore";
import { useDispatch } from "react-redux";
import { swapTasksAction } from "../redux/actions/todo";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { getIntSecondPart } from "../utils/helpers";

const Folders = () => {
	const dispatch = useDispatch();
	const swapTasks = (
		from: number,
		to: number,
		fromFolderId: number,
		toFolderId: number
	) => dispatch(swapTasksAction(from, to, fromFolderId, toFolderId));
	const currentFolders = useTypedSelector((state) => state.todo.currentFolders);
	const onDragEnd = (result: DropResult) => {
		if (!result.destination) {
			return;
		}
		swapTasks(
			result.source.index,
			result.destination.index,
			getIntSecondPart(result.source.droppableId, "-"),
			getIntSecondPart(result.destination.droppableId, "-")
		);
	};
	return (
		<Grid container direction="row" justify="flex-start">
			<DragDropContext onDragEnd={onDragEnd}>
				<Grid item xs={12} sm={6} md={4}>
					<div>
						<ToDoList folderId={currentFolders[0]} />
					</div>
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<div>
						<ToDoList folderId={currentFolders[1]} />
					</div>
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<div>
						<ToDoList folderId={currentFolders[2]} />
					</div>
				</Grid>
			</DragDropContext>
		</Grid>
	);
};

export default Folders;

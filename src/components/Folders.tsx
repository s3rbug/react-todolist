import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import ToDoList from "./ToDoList/ToDoList";
import { useTypedSelector } from "../redux/reduxStore";
import { useDispatch } from "react-redux";
import { swapTasksAction, loadLocalAction } from "../redux/actions/todo";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { getIntSecondPart } from "../utils/helpers";
import { setTodo } from "../redux/middleware/todo";
import { setIsLoadingAction, loadLocalUiAction } from "../redux/actions/ui";
import { Redirect } from "react-router-dom";

const Folders = () => {
	const dispatch = useDispatch();
	const swapTasks = (
		from: number,
		to: number,
		fromFolderId: number,
		toFolderId: number
	) => dispatch(swapTasksAction(from, to, fromFolderId, toFolderId));
	const currentFolders = useTypedSelector((state) => state.todo.currentFolders);
	const serverless = useTypedSelector((state) => state.ui.serverless);
	const token = useTypedSelector(state => state.auth.token)
	const onDragEnd = (result: DropResult) => {
		if (!result.destination) {
			return;
		}
		
		swapTasks(
			result.source.index,
			result.destination.index,
			getIntSecondPart(result.source.droppableId, "-"), // get number after '-' symbol
			getIntSecondPart(result.destination.droppableId, "-")
		);
	};
	useEffect(() => {
		if (serverless) {
			dispatch(loadLocalAction());
			dispatch(loadLocalUiAction());
			dispatch(setIsLoadingAction(false));
		} else {
			dispatch(setTodo());
		}
	}, [dispatch, serverless]);

	if(!token){
		return <Redirect to={"/react-todolist/login"}/>
	}

	return (
		<Grid container direction="row" justify="flex-start">
			<DragDropContext onDragEnd={onDragEnd}>
				{currentFolders.map((folder) => {
					return (
						<Grid
							key={"todolist-folder-id-" + folder.id}
							item
							xs={12}
							sm={6}
							md={4}
						>
							<div>
								<ToDoList folderId={folder.folder} />
							</div>
						</Grid>
					);
				})}
			</DragDropContext>
		</Grid>
	);
};

export default Folders;

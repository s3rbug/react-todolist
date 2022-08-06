import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import ToDoList from "./ToDoList/ToDoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Navigate } from "react-router-dom";

import { useTypedDispatch, useTypedSelector } from "../redux/reduxStore";
import { stringAfterSymbol } from "../utils/helpers";
import { localStorageWrapper } from "../localStorage/localStorageWrapper";
import { LoginResponseType } from "../types/index_d";
import { setUserData, swapGoalsDifferentFolders, swapGoalsSameFolder } from "../redux/middleware/goal";
import { setApiHeader } from "../api/api";
import { authActions } from "../redux/slices/auth";
import { goalActions } from "../redux/slices/goal";
import { uiActions } from "../redux/slices/ui";

const Folders = () => {
	const dispatch = useTypedDispatch();

	const currentFolders = useTypedSelector((state) => state.goal.currentFolders);
	const token = useTypedSelector(state => state.auth.token)

	const onDragEnd = async (result: DropResult) => {
		if (!result.destination) {
			return;
		}
		const 
			fromGoalIndex = result.source.index,
			toGoalIndex = result.destination.index,
			fromFolderId = stringAfterSymbol(result.source.droppableId, "-"),
			toFolderId = stringAfterSymbol(result.destination.droppableId, "-")
			dispatch(uiActions.setIsLoading({isLoading: true}))
		if(fromFolderId === toFolderId){
			dispatch(
				goalActions.swapGoalsSameFolder({
					fromGoalIndex,
					toGoalIndex,
					folderId: fromFolderId
			})
			)
			dispatch(
				swapGoalsSameFolder(
					fromGoalIndex,
					toGoalIndex,
					fromFolderId
				)
			)
		}
		else {
			dispatch(
				goalActions.swapGoalsDifferentFolders({
					fromGoalIndex,
					toGoalIndex,
					fromFolderId,
					toFolderId,
			})
			);
			dispatch(
				swapGoalsDifferentFolders(
					fromGoalIndex,
					toGoalIndex,
					fromFolderId,
					toFolderId,
				)
			);
		}
	};

	useEffect(() => {
		const localStorageUser: LoginResponseType | undefined = localStorageWrapper.getLocalStorageItem<LoginResponseType>("token")
		if(token){
			dispatch(uiActions.setIsLoading({isLoading: true}))
			dispatch(setUserData())
		}
		else if(!token && localStorageUser){
			setApiHeader(localStorageUser.accessToken)
			dispatch(authActions.setUser({token: localStorageUser.accessToken, username: localStorageUser.username}))
		}
	}, [dispatch, token])

	if(!token){
		return <Navigate to={"/react-todolist/login"} replace/>
	}

	return (
		<Grid container direction="row" justifyContent="flex-start">
			<DragDropContext onDragEnd={onDragEnd}>
				{currentFolders.map((folderId) => {
					if(!folderId){
						return null						
					}
					return (
						<Grid
							key={"todolist-folder-id-" + folderId}
							item
							xs={12}
							sm={6}
							md={4}
						>
							<div>
								<ToDoList folderId={folderId} />
							</div>
						</Grid>
					);
				})}
			</DragDropContext>
		</Grid>
	);
};

export default Folders;

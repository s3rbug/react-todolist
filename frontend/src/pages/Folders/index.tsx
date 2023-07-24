import { Grid } from "@mui/material"
import { ToDoList } from "../../containers"
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import { Navigate } from "react-router-dom"
import { useTypedDispatch, useTypedSelector } from "../../redux/store"
import {
	swapGoalsDifferentFolders,
	swapGoalsSameFolder,
} from "../../redux/middleware/goal"
import { goalActions } from "../../redux/slices/goal"
import { uiActions } from "../../redux/slices/ui"
import { useLocalStorageAuth } from "../../hooks/useLocalStorageAuth"

export const Folders = () => {
	const dispatch = useTypedDispatch()

	const currentFolders = useTypedSelector((state) => state.goal.currentFolders)
	const token = useTypedSelector((state) => state.auth.token)

	const stringAfterSymbol = (string: string, symbol: string): string => {
		const indexOfSymbol = string.indexOf(symbol)
		if (indexOfSymbol) return string.slice(indexOfSymbol + 1)
		else return ""
	}

	const onDragEnd = async (result: DropResult) => {
		if (!result.destination) {
			return
		}
		const fromGoalIndex = result.source.index,
			toGoalIndex = result.destination.index,
			fromFolderId = stringAfterSymbol(result.source.droppableId, "-"),
			toFolderId = stringAfterSymbol(result.destination.droppableId, "-")

		dispatch(uiActions.setIsLoading({ isLoading: true }))

		if (fromFolderId === toFolderId) {
			dispatch(
				goalActions.swapGoalsSameFolder({
					fromGoalIndex,
					toGoalIndex,
					folderId: fromFolderId,
				})
			)
			dispatch(
				swapGoalsSameFolder({
					fromGoalIndex,
					toGoalIndex,
					folderId: fromFolderId,
				})
			)
		} else {
			dispatch(
				goalActions.swapGoalsDifferentFolders({
					fromGoalIndex,
					toGoalIndex,
					fromFolderId,
					toFolderId,
				})
			)
			dispatch(
				swapGoalsDifferentFolders({
					fromGoalIndex,
					toGoalIndex,
					fromFolderId,
					toFolderId,
				})
			)
		}
	}

	useLocalStorageAuth({ token })

	if (!token) {
		return <Navigate to={"/react-todolist/login"} replace />
	}

	return (
		<>
			<Grid container direction="row" justifyContent="flex-start">
				<DragDropContext onDragEnd={onDragEnd}>
					{currentFolders.map((folderId) => {
						if (!folderId) {
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
						)
					})}
				</DragDropContext>
			</Grid>
		</>
	)
}

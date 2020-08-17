import React, { useCallback } from "react";
import { Theme, StyleRules, makeStyles } from "@material-ui/core";
import ToDoList from "./ToDoList/ToDoList";
import { useTypedSelector } from "../redux/reduxStore";
import { useDispatch } from "react-redux";
import {
    addGoalAction,
    toggleCheckedAction,
    swapTasksAction,
    setGoalAction,
    setNoteAction,
    deleteTaskAction,
    setTagAction,
    deleteTagAction,
    setCurrentFoldersAction,
} from "../redux/actions/todo";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { getIntSecondPart } from "../utils/helpers";

const useStyles = makeStyles(
    (theme: Theme): StyleRules<string> => ({
        root: {
            display: "flex",
        },
    })
);

const Folders = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const tags = useTypedSelector((state) => state.todo.tags);
    const folders = useTypedSelector((state) => state.todo.folders);
    const currentFolders = useTypedSelector(
        (state) => state.todo.currentFolders
    );
    const foldersCount = useTypedSelector((state) => state.todo.folders.length);

    const toggleChecked = (id: number, folderId: number) =>
        dispatch(toggleCheckedAction(id, folderId));
    const addGoal = (newGoal: string, folderId: number) =>
        dispatch(addGoalAction(newGoal, folderId));
    const swapTasks = (
        from: number,
        to: number,
        fromFolderId: number,
        toFolderId: number
    ) => dispatch(swapTasksAction(from, to, fromFolderId, toFolderId));
    const setGoal = (id: number, text: string, folderId: number) =>
        dispatch(setGoalAction(id, text, folderId));
    const setNote = useCallback(
        (id: number, newNote: string, folderId: number) =>
            dispatch(setNoteAction(id, newNote, folderId)),
        [dispatch]
    );
    const deleteTask = useCallback(
        (id: number, folderId: number) =>
            dispatch(deleteTaskAction(id, folderId)),
        [dispatch]
    );
    const setTag = useCallback(
        (taskId: number, tagId: number, folderId: number) =>
            dispatch(setTagAction(taskId, tagId, folderId)),
        [dispatch]
    );
    const deleteTag = useCallback(
        (tagId: number) => dispatch(deleteTagAction(tagId)),
        [dispatch]
    );
    const setCurrentFolders = useCallback(
        (from: number, folderId: number) =>
            dispatch(setCurrentFoldersAction(from, folderId)),
        [dispatch]
    );
    const onDragEnd = (result: DropResult) => {
        console.log(result.destination);
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
        <div className={classes.root}>
            <DragDropContext onDragEnd={onDragEnd}>
                <ToDoList
                    folderId={currentFolders[0]}
                    folders={folders}
                    tags={tags}
                    foldersCount={foldersCount}
                    deleteTag={deleteTag}
                    setTag={setTag}
                    deleteTask={deleteTask}
                    setNote={setNote}
                    toggleChecked={toggleChecked}
                    setCurrentFolders={setCurrentFolders}
                    addGoal={addGoal}
                    setGoal={setGoal}
                />
                <ToDoList
                    folders={folders}
                    folderId={currentFolders[1]}
                    tags={tags}
                    foldersCount={foldersCount}
                    deleteTag={deleteTag}
                    setTag={setTag}
                    deleteTask={deleteTask}
                    setNote={setNote}
                    toggleChecked={toggleChecked}
                    setCurrentFolders={setCurrentFolders}
                    addGoal={addGoal}
                    setGoal={setGoal}
                />
                <ToDoList
                    folders={folders}
                    folderId={currentFolders[2]}
                    tags={tags}
                    foldersCount={foldersCount}
                    deleteTag={deleteTag}
                    setTag={setTag}
                    deleteTask={deleteTask}
                    setNote={setNote}
                    toggleChecked={toggleChecked}
                    setCurrentFolders={setCurrentFolders}
                    addGoal={addGoal}
                    setGoal={setGoal}
                />
            </DragDropContext>
        </div>
    );
};

export default Folders;

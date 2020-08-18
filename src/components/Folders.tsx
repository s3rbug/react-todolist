import React from "react";
import { Theme, StyleRules, makeStyles } from "@material-ui/core";
import ToDoList from "./ToDoList/ToDoList";
import { useTypedSelector } from "../redux/reduxStore";
import { useDispatch } from "react-redux";
import { swapTasksAction } from "../redux/actions/todo";
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
    const swapTasks = (
        from: number,
        to: number,
        fromFolderId: number,
        toFolderId: number
    ) => dispatch(swapTasksAction(from, to, fromFolderId, toFolderId));
    const currentFolders = useTypedSelector(
        (state) => state.todo.currentFolders
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
                <ToDoList folderId={currentFolders[0]} />
                <ToDoList folderId={currentFolders[1]} />
                <ToDoList folderId={currentFolders[2]} />
            </DragDropContext>
        </div>
    );
};

export default Folders;

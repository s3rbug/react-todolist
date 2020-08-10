import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { Tooltip, Theme, StyleRules, useTheme, Zoom } from "@material-ui/core";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import DraggableItem from "../../../assets/DraggableItem";
import DroppableItem from "../../../assets/DroppableItem";
import AddTaskDialog from "./AddTaskDialog";
import ToDo from "./ToDo";
import AlertDialog from "../../../assets/AlertDialog";
import { FolderType, DrawerTypeEnum } from "./../../../types/index_d";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import DoneAllIcon from "@material-ui/icons/DoneAll";

const useStyles = makeStyles(
    (theme: Theme): StyleRules<string> => ({
        root: {
            width: "100%",
            height: "100%",
            position: "relative",
            paddingLeft: "10px",
            paddingRight: "10px",
        },
        list: {
            width: "100%",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
        },
        item: {
            width: "100%",
            height: "100%",
            position: "relative",
            borderBottom: "1px solid " + theme.palette.action.selected,
            boxShadow: theme.shadows[3],
            cursor: "default",
        },
        buttons: {
            display: "flex",
            position: "fixed",
            right: 0,
            bottom: 0,
            marginRight: theme.spacing(2),
            marginBottom: theme.spacing(2),
        },
        button: {
            marginLeft: theme.spacing(1),
        },
        checked: {
            textDecoration: "line-through",
        },
        deleteButton: {
            marginRight: "1%",
        },
        divider: {
            light: theme.palette.type,
        },
        icon: {
            color: theme.palette.background.default,
        },
        edit: {
            marginLeft: theme.spacing(1),
        },
        notSelectable: {
            userSelect: "none",
        },
        buttonDone: {
            background: theme.palette.success.main,
            "&:hover": {
                background: theme.palette.success.dark,
            },
        },
    })
);

export type ToDoListStyleType = ReturnType<typeof useStyles>;

type PropsType = {
    id: number;
    currentFolderId: number;
    toggleChecked: (id: number) => void;
    addGoal: (newGoalText: string) => void;
    deleteDone: () => void;
    swapTasks: (from: number, to: number) => void;
    stopEditing: () => void;
    toggleEditing: (id: number) => void;
    setGoal: (id: number, goal: string) => void;
    folders: Array<FolderType>;
    setDrawerMode: (type: DrawerTypeEnum) => void;
    drawerMode: DrawerTypeEnum;
    setPageTitle: (newTitle: string) => void;
};

const ToDoList = ({
    id,
    currentFolderId,
    toggleChecked,
    addGoal,
    deleteDone,
    swapTasks,
    stopEditing,
    toggleEditing,
    setGoal,
    folders,
    setDrawerMode,
    drawerMode,
    setPageTitle,
}: PropsType) => {
    const [open, setOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);

    const currentFolder = folders[id];

    const handleDeleteButton = () => {
        setAlertOpen(true);
    };

    const handleAddButton = () => {
        setOpen(!open);
    };

    const toggleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) toggleChecked(parseInt(e.target.value));
    };

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }
        swapTasks(result.source.index, result.destination.index);
    };

    const handleFail = () => {
        setAlertOpen(false);
    };

    const handleSuccess = () => {
        setAlertOpen(false);
        deleteDone();
    };

    const classes = useStyles();
    const theme = useTheme();

    const transitionDuration = {
        enter: theme.transitions.duration.shortest,
        exit: theme.transitions.duration.shortest,
    };
    useEffect(() => {
        setDrawerMode(DrawerTypeEnum.Back);
        setPageTitle(currentFolder.headline);
        return () => {
            setDrawerMode(DrawerTypeEnum.Menu);
            setPageTitle("To do list");
        };
    }, [setDrawerMode, setPageTitle, currentFolder.headline]);

    return (
        <div className={classes.root}>
            <DragDropContext onDragEnd={onDragEnd}>
                <DroppableItem droppableId="DroppableToDo">
                    <List className={classes.list}>
                        <TransitionGroup
                            className={"list-group " + classes.list}
                        >
                            {currentFolder.goals.map((goal) => {
                                return (
                                    <CSSTransition
                                        classNames="note"
                                        timeout={500}
                                        key={goal.id}
                                    >
                                        <DraggableItem id={goal.id}>
                                            <ToDo
                                                goal={goal}
                                                classes={classes}
                                                toggleCheckbox={toggleCheckbox}
                                                toggleEditing={toggleEditing}
                                                stopEditing={stopEditing}
                                                setGoal={setGoal}
                                                id={goal.id}
                                            />
                                        </DraggableItem>
                                    </CSSTransition>
                                );
                            })}
                        </TransitionGroup>
                    </List>
                </DroppableItem>
            </DragDropContext>
            <div>
                <div className={classes.buttons}>
                    <div className={classes.deleteButton}>
                        <Tooltip
                            title="Delete done tasks"
                            aria-label="delete"
                            placement="bottom"
                        >
                            <Fab
                                aria-label="delete"
                                size="medium"
                                onClick={handleDeleteButton}
                                className={
                                    classes.button + " , " + classes.buttonDone
                                }
                            >
                                <Zoom
                                    in={true}
                                    timeout={transitionDuration}
                                    style={{
                                        transitionDelay: `${transitionDuration.exit}ms`,
                                    }}
                                    unmountOnExit
                                >
                                    <DoneAllIcon className={classes.icon} />
                                </Zoom>
                            </Fab>
                        </Tooltip>
                    </div>
                    <Tooltip title="Add" aria-label="add" placement="bottom">
                        <Fab
                            color="primary"
                            aria-label="add"
                            size="medium"
                            onClick={handleAddButton}
                            className={classes.button}
                        >
                            <Zoom
                                in={true}
                                timeout={transitionDuration}
                                style={{
                                    transitionDelay: `${transitionDuration.exit}ms`,
                                }}
                                unmountOnExit
                            >
                                <AddIcon className={classes.icon} />
                            </Zoom>
                        </Fab>
                    </Tooltip>
                </div>
                <AddTaskDialog
                    handleAddButton={handleAddButton}
                    open={open}
                    setOpen={setOpen}
                    addGoal={addGoal}
                />
                <AlertDialog
                    question="Delete all done tasks?"
                    text="Do you really want to delete all the done tasks? You will be unable to restore them."
                    open={alertOpen}
                    handleSuccess={handleSuccess}
                    handleFail={handleFail}
                />
            </div>
        </div>
    );
};

export default ToDoList;

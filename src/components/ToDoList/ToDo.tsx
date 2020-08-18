import React, { useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import { GoalType } from "./../../types/index_d";
import TaskDetails from "./TaskDetails/TaskDetails";
import {
    Theme,
    makeStyles,
    StyleRules,
    useTheme,
    Tooltip,
} from "@material-ui/core";
import { combineStyles } from "../../utils/helpers";
import { useDispatch } from "react-redux";
import {
    setGoalAction,
    setTagAction,
    deleteTaskAction,
    setNoteAction,
    deleteTagAction,
} from "../../redux/actions/todo";
import { useTypedSelector } from "../../redux/reduxStore";

const useStyles = (color: string) =>
    makeStyles(
        (theme: Theme): StyleRules<string> => ({
            root: {},
            item: {
                width: "100%",
                height: "100%",
                position: "relative",
                borderBottom: "1px solid " + theme.palette.action.selected,
                borderTop: "1px solid " + theme.palette.action.selected,
                boxShadow: theme.shadows[3],
                cursor: "default",
                zIndex: 0,
                borderLeft:
                    color === theme.palette.background.paper
                        ? "none"
                        : "4px solid " + color,
            },
            checked: {
                textDecoration: "line-through",
            },
            notSelectable: {
                userSelect: "none",
            },
        })
    );

type PropsType = {
    goal: GoalType;
    folderId: number;
    toggleCheckbox: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ToDo = ({ goal, folderId, toggleCheckbox }: PropsType) => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const dispatch = useDispatch();

    const tags = useTypedSelector((state) => state.todo.tags);

    const setGoal = (id: number, text: string, folderId: number) =>
        dispatch(setGoalAction(id, text, folderId));
    const setNote = (id: number, newNote: string, folderId: number) =>
        dispatch(setNoteAction(id, newNote, folderId));
    const deleteTask = (id: number, folderId: number) =>
        dispatch(deleteTaskAction(id, folderId));
    const setTag = (taskId: number, tagId: number, folderId: number) =>
        dispatch(setTagAction(taskId, tagId, folderId));
    const deleteTag = (tagId: number) => dispatch(deleteTagAction(tagId));

    const currentColor =
        goal.tag === undefined
            ? theme.palette.background.paper
            : tags[goal.tag].color;
    const classes = useStyles(currentColor)();
    const handleClick = () => {
        setOpen(true);
    };
    return (
        <div className={classes.root}>
            <ListItem onClick={handleClick} className={classes.item}>
                <Tooltip
                    title={goal.tag === undefined ? "" : tags[goal.tag].name}
                    placement="right"
                    arrow
                >
                    <span
                        className={combineStyles([
                            goal.checked ? classes.checked : "",
                            classes.notSelectable,
                        ])}
                    >
                        {goal.text}
                    </span>
                </Tooltip>
                <ListItemSecondaryAction>
                    <Checkbox
                        edge="end"
                        checked={goal.checked}
                        onChange={toggleCheckbox}
                        value={goal.id}
                    />
                </ListItemSecondaryAction>
            </ListItem>
            <TaskDetails
                open={open}
                setOpen={setOpen}
                goal={goal}
                setGoal={setGoal}
                setNote={setNote}
                deleteTask={deleteTask}
                setTag={setTag}
                tags={tags}
                deleteTag={deleteTag}
                folderId={folderId}
            />
        </div>
    );
};

export default ToDo;

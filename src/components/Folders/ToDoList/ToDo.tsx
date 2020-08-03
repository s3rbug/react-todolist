import React from "react";
import ListItem from "@material-ui/core/ListItem";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import { GoalType } from "./../../../types/index_d";
import { ToDoListStyleType } from "./ToDoList";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import { TextField } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";

type PropsType = {
  goal: GoalType;
  classes: ToDoListStyleType;
  id: number;
  toggleCheckbox: (event: React.ChangeEvent<HTMLInputElement>) => void;
  toggleChecked: (taskId: number) => void;
  toggleEditing: (id: number) => void;
  stopEditing: () => void;
  setGoal: (id: number, goal: string) => void;
};

const ToDo = ({
  goal,
  classes,
  id,
  toggleCheckbox,
  toggleChecked,
  toggleEditing,
  stopEditing,
  setGoal,
}: PropsType) => {
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 50) setGoal(id, e.target.value);
  };
  return (
    <ListItem
      className={
        classes.item +
        " , " +
        (goal.checked ? classes.checkedList : classes.notCheckedList)
      }
    >
      {goal.editing ? (
        <TextField autoFocus value={goal.text} onChange={changeHandler} />
      ) : (
        <span className={goal.checked ? classes.checked : classes.notChecked}>
          {goal.text}
        </span>
      )}
      <Box boxShadow={5}>
        <Divider className={classes.divider} />
      </Box>
      {goal.editing ? (
        <DoneIcon
          className={classes.edit}
          color="primary"
          fontSize="large"
          onClick={() => {
            toggleEditing(id);
          }}
        />
      ) : (
        <EditRoundedIcon
          className={classes.edit}
          onClick={() => {
            if (!goal.editing) {
              stopEditing();
              toggleEditing(id);
            }
          }}
        />
      )}
      <ListItemSecondaryAction>
        <Checkbox
          edge="end"
          className={classes.check}
          checked={goal.checked}
          onChange={toggleCheckbox}
          value={goal.id}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default ToDo;

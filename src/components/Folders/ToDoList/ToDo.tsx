import React from "react";
import ListItem from "@material-ui/core/ListItem";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import { GoalType } from "./../../../types/index_d";
import { ToDoListStyleType } from "./ToDoList";

type PropsType = {
  goal: GoalType;
  classes: ToDoListStyleType;
  toggleCheckbox: (event: React.ChangeEvent<HTMLInputElement>) => void;
  toggleChecked: (taskId: number) => void;
};

const ToDo = ({ goal, classes, toggleCheckbox, toggleChecked }: PropsType) => {
  return (
    <ListItem
      button
      onClick={() => {
        toggleChecked(goal.id);
      }}
      className={
        classes.item +
        " , " +
        (goal.checked ? classes.checkedList : classes.notCheckedList)
      }
    >
      <span className={goal.checked ? classes.checked : classes.notChecked}>
        {goal.text}
      </span>
      <Box boxShadow={5}>
        <Divider className={classes.divider} />
      </Box>
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

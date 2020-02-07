import React from "react";
import ListItem from "@material-ui/core/ListItem";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";

function ToDo({ el, classes, toggleCheckbox, toggleChecked }) {
  return (
    <ListItem
      button
      onClick={() => {
        toggleChecked(el.id);
      }}
      className={
        classes.item +
        " , " +
        (el.checked ? classes.checkedList : classes.notCheckedList)
      }
    >
      <span className={el.checked ? classes.checked : classes.notChecked}>
        {el.text}
      </span>
      <Box boxShadow={5}>
        <Divider className={classes.divider} />
      </Box>
      <ListItemSecondaryAction>
        <Checkbox
          edge="end"
          className={classes.check}
          checked={el.checked}
          onChange={toggleCheckbox}
          value={el.id}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default ToDo;

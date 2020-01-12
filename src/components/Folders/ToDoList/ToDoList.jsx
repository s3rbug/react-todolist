import React, { useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    position: "relative",
    padding: "2%"
  },
  list: {
    width: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  item: {
    width: "100%",
    position: "relative",
    border: "1px solid black"
  }
}));

function ToDoList({ setCurrentFolderById, id, currentFolder, toggleChecked }) {
  useEffect(() => {
    setCurrentFolderById(id);
  });

  const toggleCheckbox = e => {
    toggleChecked(e.target.value);
  };

  const classes = useStyles();
  if (!currentFolder) return null;

  return (
    <div className={classes.root}>
      <List className={classes.list}>
        {Object.values(currentFolder.goals).map(el => {
          return (
            <ListItem key={el.id}>
              <ListItem button className={classes.item}>
                {el.text}
              </ListItem>
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
        })}
      </List>
    </div>
  );
}

export default ToDoList;

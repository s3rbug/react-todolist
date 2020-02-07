import React, { useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { Tooltip } from "@material-ui/core";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
//import DraggableItem from "./../../../asserts/DraggableItem";
//import test from "./test.css";
//import ReactCSSTransitionGroup from "react-addons-css-transition-group";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100%",
    position: "relative",
    paddingLeft: "1%",
    paddingRight: "1%"
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
    height: "100%",
    position: "relative",
    borderBottom: "1px solid #E0E0E0",
    boxShadow: "2px 0 5px 0px rgba(209, 215, 249, 0.74);"
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  checked: {
    textDecoration: "line-through"
  },
  deleteButton: {
    marginRight: "1%"
  },
  divider: {
    light: theme.palette.type
  },
  back: {}
}));

function ToDoList({
  setCurrentFolderById,
  id,
  currentFolder,
  toggleChecked,
  addGoal,
  deleteDone,
  swapTasks
}) {
  useEffect(() => {
    setCurrentFolderById(id);
  });

  const [open, setOpen] = React.useState(false);
  const [currentText, setCurrentText] = React.useState("");
  const [hasError, setError] = React.useState("");

  const handleDeleteButton = () => {
    deleteDone();
  };

  const handleAddButton = () => {
    setOpen(!open);
  };

  const toggleCheckbox = e => {
    if (e.target.value) toggleChecked(e.target.value);
    else toggleChecked(e);
  };

  const textChanged = e => {
    setError("");
    setCurrentText(e.target.value);
  };

  const handleAddNewGoal = () => {
    if (currentText !== "") {
      addGoal(currentText);
      setOpen(false);
    } else {
      setError("Field can not be empty");
    }
  };

  const onDragEnd = result => {
    if (!result.destination) {
      return;
    }
    swapTasks(result.source.index, result.destination.index);
  };

  const onDragStart = result => {};

  const classes = useStyles();
  if (!currentFolder) return null;

  return (
    <div className={classes.root}>
      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={classes.back}
            >
              <List className={classes.list}>
                {Object.values(currentFolder.goals).map(el => {
                  return (
                    <Draggable
                      key={el.id}
                      draggableId={"item-" + el.id}
                      index={el.id}
                    >
                      {provided => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <ListItem
                            button
                            onClick={() => {
                              toggleChecked(el.id);
                            }}
                            className={
                              classes.item +
                              " , " +
                              (el.checked
                                ? classes.checkedList
                                : classes.notCheckedList)
                            }
                          >
                            <span
                              className={
                                el.checked
                                  ? classes.checked
                                  : classes.notChecked
                              }
                            >
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
                          {provided.placeholder}
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </List>
            </div>
          )}
        </Droppable>
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
                color="secondary"
                aria-label="add"
                size="medium"
                onClick={handleDeleteButton}
              >
                <DeleteIcon />
              </Fab>
            </Tooltip>
          </div>
          <Tooltip title="Add" aria-label="add" placement="bottom">
            <Fab
              color="primary"
              aria-label="add"
              size="medium"
              onClick={handleAddButton}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        </div>
        <Dialog
          open={open}
          onClose={handleAddButton}
          aria-labelledby="form-dialog-title"
          onKeyDown={e => {
            if (e.key === "Enter") {
              setOpen(false);
              e.preventDefault();
              handleAddNewGoal();
            } else if (e.key === "Escape") {
              setOpen(false);
              e.preventDefault();
            }
          }}
        >
          <DialogTitle id="form-dialog-title">Add a new goal</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To accomplish your goals you need to know how to set them. You
              can't simply expect it to happen. Goal setting is a process that
              starts with careful consideration of what you want to achieve, and
              ends with a lot of hard work to actually do it.
            </DialogContentText>
            <TextField
              error={!!hasError}
              helperText={hasError}
              autoFocus
              margin="dense"
              id="name"
              label="Add goal"
              fullWidth
              type="text"
              onChange={textChanged}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddButton} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleAddNewGoal} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default ToDoList;

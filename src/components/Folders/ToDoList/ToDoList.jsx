import React, { useEffect } from "react";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import { Tooltip } from "@material-ui/core";
import { DragDropContext } from "react-beautiful-dnd";
import DraggableItem from "../../../asserts/DraggableItem";
import DroppableItem from "../../../asserts/DroppableItem";
import AddTaskDialog from "./AddTaskDialog";
import ToDo from "./ToDo";
import AlertDialog from "../../../asserts/AlertDialog";

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
    borderBottom: "1px solid " + theme.palette.action.selected,
    boxShadow: theme.shadows[3]
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
  icon: {
    color: theme.palette.background.default
  }
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
  const [alertOpen, setAlertOpen] = React.useState(false);

  const handleDeleteButton = () => {
    setAlertOpen(true);
    //deleteDone();
  };

  const handleAddButton = () => {
    setOpen(!open);
  };

  const toggleCheckbox = e => {
    if (e.target.value) toggleChecked(e.target.value);
    else toggleChecked(e);
  };

  const onDragEnd = result => {
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
  if (!currentFolder) return null;

  return (
    <div className={classes.root}>
      <DragDropContext onDragEnd={onDragEnd}>
        <DroppableItem classes={classes} droppableId="DroppableToDo">
          <List className={classes.list}>
            {Object.values(currentFolder.goals).map(el => {
              return (
                <DraggableItem el={el} key={el.id}>
                  <ToDo
                    el={el}
                    classes={classes}
                    toggleCheckbox={toggleCheckbox}
                    toggleChecked={toggleChecked}
                  />
                </DraggableItem>
              );
            })}
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
                color="secondary"
                aria-label="add"
                size="medium"
                onClick={handleDeleteButton}
              >
                <DeleteIcon className={classes.icon} />
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
              <AddIcon className={classes.icon} />
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
}

export default ToDoList;

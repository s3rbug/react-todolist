import React from "react";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import { Tooltip, Theme } from "@material-ui/core";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import DraggableItem from "../../../assets/DraggableItem";
import DroppableItem from "../../../assets/DroppableItem";
import AddTaskDialog from "./AddTaskDialog";
import ToDo from "./ToDo";
import AlertDialog from "../../../assets/AlertDialog";
import { FolderType } from "./../../../types/index";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    height: "100%",
    position: "relative",
    paddingLeft: "10px",
    paddingRight: "10px"
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
    position: "fixed",
    right: 0,
    bottom: 0,
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  button: {
    marginLeft: theme.spacing(1)
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

type ToDoListPropsType = {
  id: number;
  currentFolderId: number;
  toggleChecked: (id: number) => void;
  addGoal: (newGoalText: string) => void;
  deleteDone: () => void;
  swapTasks: (from: number, to: number) => void;
  folders: Array<FolderType>;
};

function ToDoList({
  id,
  currentFolderId,
  toggleChecked,
  addGoal,
  deleteDone,
  swapTasks,
  folders
}: ToDoListPropsType) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [alertOpen, setAlertOpen] = React.useState<boolean>(false);

  let folder = folders[id];

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

  if (!currentFolderId) return null;

  return (
    <div className={classes.root}>
      <DragDropContext onDragEnd={onDragEnd}>
        <DroppableItem droppableId="DroppableToDo">
          <List className={classes.list}>
            <TransitionGroup className={"list-group " + classes.list}>
              {folder.goals.map(goal => {
                return (
                  <CSSTransition classNames="note" timeout={500} key={goal.id}>
                    <DraggableItem id={goal.id}>
                      <ToDo
                        goal={goal}
                        classes={classes}
                        toggleCheckbox={toggleCheckbox}
                        toggleChecked={toggleChecked}
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
                color="secondary"
                aria-label="add"
                size="medium"
                onClick={handleDeleteButton}
                className={classes.button}
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
              className={classes.button}
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

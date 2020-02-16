import React from "react";
import ToDoList from "./ToDoList/ToDoList";
import { makeStyles } from "@material-ui/core/styles";
import Folder from "./Folder/Folder";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import {
  setCurrentFolderById,
  toggleChecked,
  addGoal,
  deleteFolder,
  deleteDone,
  addFolder,
  swapTasks,
  swapFolders
} from "../../redux/todo";
import { DragDropContext } from "react-beautiful-dnd";
import DroppableItem from "../../assets/DroppableItem";
import DraggableItem from "../../assets/DraggableItem";
import AddFolderDialog from "./AddFolderDialog";

let useStyles: any = makeStyles((theme: any): any => ({
  root: {
    display: "flex",
    position: "block",
    flexWrap: "wrap",
    flexGrow: 1,
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  item: {
    maxWidth: "100%"
  },
  drop: {
    width: "100%",
    height: "100%"
  },
  drag: {
    width: "100%"
  },
  container: {
    position: "relative",
    height: "100%",
    width: "100%"
  },
  addButton: {
    position: "fixed",
    right: 0,
    bottom: 0,
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  icon: {
    color: theme.palette.background.default
  }
}));

type GoalType = {
  id: number;
  text: string;
  checked: boolean;
};

type FolderType = {
  id: number;
  headline: string;
  description: string;
  goals: Array<GoalType>;
};

type FoldersPropsType = {
  folders: Array<FolderType>;
  match: any;
  setCurrentFolderById: (folderId: number) => void;
  currentFolder: FolderType;
  toggleChecked: () => void;
  addGoal: (text: string) => void;
  deleteFolder: (folderId: number) => void;
  deleteDone: () => void;
  addFolder: (headline: string, description: string) => void;
  swapTasks: (from: number, to: number) => void;
  swapFolders: (from: number, to: number) => void;
};

function Folders({
  folders,
  match,
  setCurrentFolderById,
  currentFolder,
  toggleChecked,
  addGoal,
  deleteFolder,
  deleteDone,
  addFolder,
  swapTasks,
  swapFolders
}: FoldersPropsType) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [curHeadline, setCurHeadline] = React.useState("");
  const [curDescription, setCurDescription] = React.useState("");
  const [errorHead, setErrorHead] = React.useState("");
  const [errorDesc, setErrorDesc] = React.useState("");

  function handleAddButton() {
    if (curHeadline !== "") {
      if (curDescription !== "") {
        addFolder(curHeadline, curDescription);
        setCurDescription("");
        setCurHeadline("");
        setOpen(false);
        setErrorDesc("");
        setErrorHead("");
      } else {
        setErrorDesc("Field can not be empty");
      }
    } else {
      setErrorHead("Field can not be empty");
    }
  }

  function onDragEnd(result: any) {
    if (!result.destination) {
      return;
    }
    swapFolders(result.source.index, result.destination.index);
  }

  if (match.params.currentFolder)
    return (
      <div>
        <ToDoList
          id={match.params.currentFolder}
          setCurrentFolderById={setCurrentFolderById}
          currentFolder={currentFolder}
          toggleChecked={toggleChecked}
          addGoal={addGoal}
          deleteDone={deleteDone}
          swapTasks={swapTasks}
        />
      </div>
    );

  return (
    <div className={classes.root}>
      <DragDropContext onDragEnd={onDragEnd}>
        <DroppableItem classes={classes} droppableId="DroppableFolder">
          <Grid container spacing={2} className={classes.container}>
            {folders.map((folder: FolderType) => {
              return (
                <Grid key={folder.id} container item justify="center">
                  <DraggableItem el={folder} classes={classes}>
                    <Folder
                      id={folder.id}
                      description={folder.description}
                      headline={folder.headline}
                      deleteFolder={deleteFolder}
                    />
                  </DraggableItem>
                </Grid>
              );
            })}
          </Grid>
        </DroppableItem>
        <div className={classes.addButton}>
          <Tooltip title="Add" aria-label="add" placement="bottom">
            <Fab
              color="primary"
              aria-label="add"
              size="medium"
              onClick={() => setOpen(true)}
            >
              <AddIcon className={classes.icon} />
            </Fab>
          </Tooltip>
        </div>
        <AddFolderDialog
          classes={classes}
          open={open}
          setOpen={setOpen}
          curHeadline={curHeadline}
          setCurHeadline={setCurHeadline}
          curDescription={curDescription}
          setCurDescription={setCurDescription}
          errorHead={errorHead}
          errorDesc={errorDesc}
          setErrorHead={setErrorHead}
          setErrorDesc={setErrorDesc}
          handleAddButton={handleAddButton}
        />
      </DragDropContext>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  folders: state.todo.folders,
  currentFolder: state.todo.currentFolder
});

const mapDispatchToProps = {
  setCurrentFolderById,
  toggleChecked,
  addGoal,
  deleteFolder,
  deleteDone,
  addFolder,
  swapTasks,
  swapFolders
};

const WrappedFolders = compose(
  connect<any>(mapStateToProps, mapDispatchToProps),
  withRouter
)(Folders);

export default WrappedFolders as React.ComponentType<any>;

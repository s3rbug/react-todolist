import React from "react";
import ToDoList from "./ToDoList/ToDoList";
import { makeStyles } from "@material-ui/core/styles";
import Folder from "./Folder/Folder";
import { Grid, Theme, StyleRules } from "@material-ui/core";
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
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import DroppableItem from "../../assets/DroppableItem";
import DraggableItem from "../../assets/DraggableItem";
import AddFolderDialog from "./AddFolderDialog";
import { FolderType } from "../../types/index_d";
import { AppStateType } from "../../redux/reduxStore";
import { RouteComponentProps } from "react-router";

let useStyles = makeStyles(
  (theme: Theme): StyleRules<string> => ({
    root: {
      display: "flex",
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
  })
);

export type FoldersStyleType = ReturnType<typeof useStyles>;

interface MatchParams {
  currentFolder?: string;
}

interface OwnProps extends RouteComponentProps<MatchParams> {}

type PropsType = OwnProps & MapDispatchPropsType & MapStatePropsType;

function Folders({
  folders,
  match,
  setCurrentFolderById,
  currentFolderId,
  toggleChecked,
  addGoal,
  deleteFolder,
  deleteDone,
  addFolder,
  swapTasks,
  swapFolders
}: PropsType) {
  const classes = useStyles();
  const [open, setOpen] = React.useState<boolean>(false);
  const [curHeadline, setCurHeadline] = React.useState<string>("");
  const [curDescription, setCurDescription] = React.useState<string>("");
  const [errorHead, setErrorHead] = React.useState<string>("");
  const [errorDesc, setErrorDesc] = React.useState<string>("");

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

  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }
    swapFolders(result.source.index, result.destination.index);
  }

  let currentFolder: number | null = null;

  if (match.params.currentFolder)
    currentFolder = parseInt(match.params.currentFolder);

  if (currentFolder !== null) {
    setCurrentFolderById(currentFolder);
    return (
      <div>
        <ToDoList
          id={currentFolder}
          currentFolderId={currentFolderId}
          toggleChecked={toggleChecked}
          addGoal={addGoal}
          deleteDone={deleteDone}
          swapTasks={swapTasks}
          folders={folders}
        />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <DragDropContext onDragEnd={onDragEnd}>
        <DroppableItem className={classes.drop} droppableId="DroppableFolder">
          <Grid container spacing={2} className={classes.container}>
            {folders.map((folder: FolderType) => {
              return (
                <Grid key={folder.id} container item justify="center">
                  <DraggableItem id={folder.id} className={classes.drag}>
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

type MapStatePropsType = {
  folders: Array<FolderType>;
  currentFolderId: number;
};

type MapDispatchPropsType = {
  setCurrentFolderById: (id: number) => void;
  toggleChecked: (id: number) => void;
  addGoal: (text: string) => void;
  deleteFolder: (id: number) => void;
  deleteDone: () => void;
  addFolder: (headline: string, description: string) => void;
  swapTasks: (from: number, to: number) => void;
  swapFolders: (from: number, to: number) => void;
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  folders: state.todo.folders,
  currentFolderId: state.todo.currentFolderId
});

const mapDispatchToProps: MapDispatchPropsType = {
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
  connect<MapStatePropsType, MapDispatchPropsType, OwnProps, AppStateType>(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(Folders);

export default WrappedFolders as React.ComponentType;

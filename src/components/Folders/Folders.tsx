import React, { useState } from "react";
import ToDoList from "./ToDoList/ToDoList";
import { makeStyles } from "@material-ui/core/styles";
import Folder from "./Folder/Folder";
import { Grid, Theme, StyleRules, Typography } from "@material-ui/core";
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
  swapFolders,
  toggleEditing,
  stopEditing,
  setGoal,
} from "../../redux/actions/todo";
import { setDrawerMode } from "../../redux/actions/ui";
import AddFolderDialog from "./AddFolderDialog";
import { FolderType, DrawerTypeEnum } from "./../../types/index_d";
import { AppStateType } from "../../redux/reduxStore";
import { RouteComponentProps } from "react-router";

let useStyles = makeStyles(
  (theme: Theme): StyleRules<string> => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
      flexGrow: 1,
      width: "100%",
      paddingTop: theme.spacing(2),
      paddingLeft: theme.spacing(3),
    },
    drop: {
      width: "100%",
    },
    item: {},
    drag: {
      width: "100%",
    },
    container: {
      position: "relative",
      width: "100%",
    },
    addButton: {
      position: "fixed",
      right: 0,
      bottom: 0,
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    icon: {
      color: theme.palette.background.default,
    },
  })
);

export type FoldersStyleType = ReturnType<typeof useStyles>;

interface MatchParams {
  currentFolder?: string;
}

interface OwnProps extends RouteComponentProps<MatchParams> {}

type PropsType = OwnProps & MapDispatchPropsType & MapStatePropsType;

const Folders = ({
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
  toggleEditing,
  stopEditing,
  setGoal,
  setDrawerMode,
  drawerMode,
}: PropsType) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  let currentFolder: number | null = null;

  if (
    match.params.currentFolder !== "" &&
    match.params.currentFolder !== undefined
  )
    currentFolder = parseInt(match.params.currentFolder);

  if (currentFolder !== null) {
    if (currentFolder >= folders.length || currentFolder < 0)
      return (
        <Typography variant="h2" align="center" color="textPrimary">
          Incorrect folder id!
        </Typography>
      );
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
          toggleEditing={toggleEditing}
          stopEditing={stopEditing}
          setGoal={setGoal}
          folders={folders}
          setDrawerMode={setDrawerMode}
          drawerMode={drawerMode}
        />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container className={classes.container} spacing={3}>
        {folders.map((folder: FolderType) => {
          return (
            <Grid
              key={folder.id}
              item
              className={classes.item}
              xs={6}
              md={4}
              lg={3}
            >
              <Folder
                id={folder.id}
                description={folder.description}
                headline={folder.headline}
                deleteFolder={deleteFolder}
              />
            </Grid>
          );
        })}
      </Grid>
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
        addFolder={addFolder}
      />
    </div>
  );
};

type MapStatePropsType = {
  folders: Array<FolderType>;
  currentFolderId: number;
  drawerMode: DrawerTypeEnum;
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
  toggleEditing: (id: number) => void;
  stopEditing: () => void;
  setGoal: (id: number, goal: string) => void;
  setDrawerMode: (type: DrawerTypeEnum) => void;
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  folders: state.todo.folders,
  currentFolderId: state.todo.currentFolderId,
  drawerMode: state.ui.drawerMode,
});

const mapDispatchToProps: MapDispatchPropsType = {
  setCurrentFolderById,
  toggleChecked,
  addGoal,
  deleteFolder,
  deleteDone,
  addFolder,
  swapTasks,
  swapFolders,
  toggleEditing,
  stopEditing,
  setGoal,
  setDrawerMode,
};

const WrappedFolders = compose(
  connect<MapStatePropsType, MapDispatchPropsType, OwnProps, AppStateType>(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(Folders);

export default WrappedFolders as React.ComponentType;

import React, { useState, useCallback } from "react";
import ToDoList from "./ToDoList/ToDoList";
import { makeStyles } from "@material-ui/core/styles";
import Folder from "./Folder/Folder";
import { Grid, Theme, StyleRules, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import {
  setCurrentFolderByIdAction,
  toggleCheckedAction,
  addGoalAction,
  deleteFolderAction,
  deleteDoneAction,
  addFolderAction,
  swapTasksAction,
  toggleEditingAction,
  stopEditingAction,
  setGoalAction,
} from "../../redux/actions/todo";
import { setDrawerModeAction } from "../../redux/actions/ui";
import AddFolderDialog from "./AddFolderDialog";
import { FolderType, DrawerTypeEnum } from "./../../types/index_d";
import { useTypedSelector } from "../../redux/reduxStore";
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

const Folders = ({ match }: OwnProps) => {
  const classes = useStyles();

  const folders = useTypedSelector((state) => state.todo.folders);
  const currentFolderId = useTypedSelector(
    (state) => state.todo.currentFolderId
  );
  const drawerMode = useTypedSelector((state) => state.ui.drawerMode);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const setCurrentFolderById = (id: number) =>
    dispatch(setCurrentFolderByIdAction(id));
  const deleteFolder = useCallback(
    (id: number) => dispatch(deleteFolderAction(id)),
    [dispatch]
  );
  const deleteDone = useCallback(() => dispatch(deleteDoneAction()), [
    dispatch,
  ]);
  const swapTasks = useCallback(
    (from: number, to: number) => dispatch(swapTasksAction(from, to)),
    [dispatch]
  );
  const toggleEditing = useCallback(
    (id: number) => dispatch(toggleEditingAction(id)),
    [dispatch]
  );
  const stopEditing = useCallback(() => dispatch(stopEditingAction()), [
    dispatch,
  ]);
  const addGoal = useCallback((text: string) => dispatch(addGoalAction(text)), [
    dispatch,
  ]);
  const setGoal = useCallback(
    (id: number, newGoal: string) => dispatch(setGoalAction(id, newGoal)),
    [dispatch]
  );
  const setDrawerMode = useCallback(
    (mode: DrawerTypeEnum) => dispatch(setDrawerModeAction(mode)),
    [dispatch]
  );
  const addFolder = useCallback(
    (headline: string, description: string) =>
      dispatch(addFolderAction(headline, description)),
    [dispatch]
  );
  const toggleChecked = useCallback(
    (id: number) => dispatch(toggleCheckedAction(id)),
    [dispatch]
  );

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

export default withRouter(Folders);

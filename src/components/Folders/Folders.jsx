import React from "react";
import ToDoList from "./ToDoList/ToDoList";
import { makeStyles } from "@material-ui/core/styles";
import Folder from "./Folder/Folder";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import {
  setCurrentFolderById,
  toggleChecked,
  addGoal,
  deleteFolder
} from "./../../redux/todo";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    position: "block",
    flexWrap: "wrap",
    flexGrow: 1,
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16)
    }
  },
  item: {
    maxWidth: "100vw"
  },
  container: {
    position: "relative",
    height: "100%",
    width: "100%"
  }
}));

function Folders({
  folders,
  match,
  setCurrentFolderById,
  currentFolder,
  toggleChecked,
  addGoal,
  deleteFolder
}) {
  const classes = useStyles();
  if (match.params.currentFolder)
    return (
      <div>
        <ToDoList
          id={match.params.currentFolder}
          setCurrentFolderById={setCurrentFolderById}
          currentFolder={currentFolder}
          toggleChecked={toggleChecked}
          addGoal={addGoal}
        />
      </div>
    );

  return (
    <div className={classes.root}>
      <Grid container spacing={2} className={classes.container}>
        {folders.map(el => {
          return (
            <Grid
              key={el.id}
              container
              item
              className={classes.item}
              justify="center"
            >
              <Folder
                id={el.id}
                description={el.description}
                headline={el.headline}
                goals={el.goals}
                deleteFolder={deleteFolder}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

const mapStateToProps = state => ({
  folders: state.todo.folders,
  currentFolder: state.todo.currentFolder
});

const mapDispatchToProps = {
  setCurrentFolderById,
  toggleChecked,
  addGoal,
  deleteFolder
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(Folders);

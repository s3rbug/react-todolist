import React from "react";
import ToDoList from "./ToDoList/ToDoList";
import { makeStyles } from "@material-ui/core/styles";
import Folder from "./Folder/Folder";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { setCurrentFolderById, toggleChecked } from "./../../redux/todo";

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
    maxWidth: window.innerWidth / 4 - 8 + "px"
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
  toggleChecked
}) {
  const classes = useStyles();
  if (match.params.currentFolder)
    return (
      <ToDoList
        id={match.params.currentFolder}
        setCurrentFolderById={setCurrentFolderById}
        currentFolder={currentFolder}
        toggleChecked={toggleChecked}
      />
    );

  return (
    <div className={classes.root}>
      <Grid container spacing={2} className={classes.container}>
        {folders.map(el => {
          return (
            <Grid key={el.id} container item className={classes.item}>
              <Folder
                id={el.id}
                description={el.description}
                headline={el.headline}
                goals={el.goals}
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
  toggleChecked
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(Folders);

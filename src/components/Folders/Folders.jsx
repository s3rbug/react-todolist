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
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import SetFolder from "./Folder/SetFolder";
import {
  setCurrentFolderById,
  toggleChecked,
  addGoal,
  deleteFolder,
  deleteDone,
  addFolder,
  swapTasks
} from "./../../redux/todo";
const useStyles = makeStyles(theme => ({
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
  container: {
    position: "relative",
    height: "100%",
    width: "100%"
  },
  addButton: {
    display: "flex",
    justifyContent: "flex-end",
    width: "98%"
  },
  addIcon: {},
  addFolderDialog: {
    //maxWidth: "100%"
  },
  subButtons: {}
}));

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
  swapTasks
}) {
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
      <div className={classes.addButton}>
        <Tooltip title="Add" aria-label="add" placement="bottom">
          <Fab
            color="primary"
            aria-label="add"
            size="medium"
            className={classes.subButtons}
            onClick={() => setOpen(true)}
          >
            <AddIcon className={classes.addIcon} />
          </Fab>
        </Tooltip>
      </div>
      <Dialog
        className={classes.addFolderDialog}
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-folders"
      >
        <DialogTitle id="form-dialog-folders">Add new folder</DialogTitle>
        <SetFolder
          curHeadline={curHeadline}
          setCurHeadline={setCurHeadline}
          curDescription={curDescription}
          setCurDescription={setCurDescription}
          errorHead={errorHead}
          errorDesc={errorDesc}
          setErrorHead={setErrorHead}
          setErrorDesc={setErrorDesc}
        />
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddButton} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
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
  deleteFolder,
  deleteDone,
  addFolder,
  swapTasks
};

const FoldersWithHooks = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(Folders);

export default FoldersWithHooks;

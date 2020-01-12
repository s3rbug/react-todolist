import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Folder from "./Folder/Folder";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";

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

function Folders({ folders }) {
  const classes = useStyles();
  console.log(folders);

  return (
    <div className={classes.root}>
      <Grid container spacing={2} className={classes.container}>
        {Object.values(folders).map(el => {
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
  folders: state.todo.folders
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Folders);

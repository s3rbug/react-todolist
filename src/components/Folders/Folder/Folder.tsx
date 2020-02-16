import React, { useState } from "react";
import { makeStyles, StyleRules } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles(
  (theme): StyleRules<string> => ({
    root: {
      width: "100%"
    },
    card: {
      borderWidth: "2px",
      width: "100%"
    },
    btnContainer: {
      display: "flex",
      justifyContent: "flex-end"
    },
    link: {
      textDecoration: "none",
      color: "black"
    },
    shadow: {
      width: "100%"
    }
  })
);

type FolderPropsType = {
  id: number;
  headline: string;
  description: string;
  deleteFolder: (folderId: number) => void;
};

function Folder({ id, headline, description, deleteFolder }: FolderPropsType) {
  const classes = useStyles();
  let [shadow, setShadow] = useState(2);
  function deleteThisFolder(): void {
    deleteFolder(id);
  }
  function shadowOn(): void {
    setShadow(12);
  }
  function shadowOff(): void {
    setShadow(2);
  }
  return (
    <div className={classes.root}>
      <Box
        boxShadow={shadow}
        onMouseEnter={shadowOn}
        onMouseLeave={shadowOff}
        className={classes.shadow}
      >
        <Card variant="outlined" className={classes.card}>
          <NavLink to={`/folders/${id}`} className={classes.link}>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                color="textPrimary"
              >
                {headline}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {description}
              </Typography>
            </CardContent>
          </NavLink>
          <CardActions className={classes.btnContainer}>
            <Button size="large" color="secondary" onClick={deleteThisFolder}>
              Delete
            </Button>
          </CardActions>
        </Card>
      </Box>
    </div>
  );
}

export default Folder;

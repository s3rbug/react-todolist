import React, { useState } from "react";
import { makeStyles, StyleRules, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import { NavLink } from "react-router-dom";
import AlertDialog from "../../../assets/AlertDialog";
import { CardActionArea } from "@material-ui/core";

const useStyles = makeStyles(
  (theme: Theme): StyleRules<string> => ({
    root: {
      width: "100%",
      height: "100%",
    },
    card: {
      display: "flex",
      flexDirection: "column",
      borderWidth: "2px",
      width: "100%",
      height: "100%",
      background: theme.palette.background.default,
    },
    btnContainer: {
      display: "flex",
      justifyContent: "flex-end",
      flex: 1,
      height: "100%",
    },
    link: {
      textDecoration: "none",
      color: theme.palette.text.primary,
      height: "100%",
    },
    shadow: {
      width: "100%",
      height: "100%",
    },
  })
);

type PropsType = {
  id: number;
  headline: string;
  description: string;
  deleteFolder: (folderId: number) => void;
};

const Folder = ({ id, headline, description, deleteFolder }: PropsType) => {
  const classes = useStyles();
  const [shadow, setShadow] = useState(2);
  const [alertOpen, setAlertOpen] = useState(false);
  const deleteThisFolder = () => {
    deleteFolder(id);
  };
  const shadowOn = () => {
    setShadow(12);
  };

  const shadowOff = () => {
    setShadow(2);
  };

  const handleSuccess = () => {
    setAlertOpen(false);
    deleteThisFolder();
  };

  const handleFail = () => {
    setAlertOpen(false);
  };

  const handleDeleteButton = () => {
    setAlertOpen(true);
  };

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
            <CardActionArea>
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
            </CardActionArea>
          </NavLink>
          <CardActions className={classes.btnContainer}>
            <Button
              size="large"
              color="secondary"
              onClick={handleDeleteButton}
              className={classes.small}
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      </Box>
      <AlertDialog
        question="Delete the folder?"
        text="Do you really want to delete the folder? You will be unable to restore it."
        open={alertOpen}
        handleSuccess={handleSuccess}
        handleFail={handleFail}
      />
    </div>
  );
};

export default Folder;

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  card: {
    borderWidth: "2px",
    width: "98vw"
  },
  btnContainer: {
    display: "flex",
    justifyContent: "flex-end"
  },
  link: {
    textDecoration: "none",
    color: "black"
  }
}));

function Folder({ id, headline, description, deleteFolder, goals }) {
  const classes = useStyles();
  let [shadow, setShadow] = useState(2);
  function deleteThisFolder() {
    deleteFolder(id);
  }
  function shadowOn() {
    setShadow(12);
  }
  function shadowOff() {
    setShadow(2);
  }
  return (
    <Box boxShadow={shadow} onMouseEnter={shadowOn} onMouseLeave={shadowOff}>
      <Card variant="outlined" className={classes.card}>
        <NavLink to={`/folders/${id}`} className={classes.link}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {headline}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          </CardContent>
        </NavLink>
        <CardActions className={classes.btnContainer}>
          <Button
            size="large"
            color="secondary"
            className={classes.btn}
            onClick={deleteThisFolder}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default Folder;

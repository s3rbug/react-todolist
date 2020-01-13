import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import CardActionArea from "@material-ui/core/CardActionArea";
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
  function deleteThisFolder() {
    deleteFolder(id);
  }
  return (
    <Box boxShadow={5}>
      <Card variant="outlined" className={classes.card}>
        <NavLink to={`/folders/${id}`} className={classes.link}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
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
            className={classes.btn}
            onClick={deleteThisFolder}
          >
            Delete
          </Button>
          <NavLink to={`/folders/${id}`} className={classes.link}>
            <Button size="large" color="primary" className={classes.btn}>
              Open
            </Button>
          </NavLink>
        </CardActions>
      </Card>
    </Box>
  );
}

export default Folder;

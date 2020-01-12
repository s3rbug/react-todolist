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
    borderWidth: "2px"
  },
  btn: {},
  btnContainer: {
    display: "flex",
    justifyContent: "flex-end"
  },
  link: {
    textDecoration: "none"
  }
}));

function Folder({ id, headline, description, goals }) {
  const classes = useStyles();
  return (
    <Box boxShadow={5}>
      <Card variant="outlined" className={classes.card}>
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
        <CardActions className={classes.btnContainer}>
          <Button size="large" color="secondary" className={classes.btn}>
            Delete
          </Button>
          <NavLink to={`/folders/${id}`} className={classes.link}>
            <Button
              onClick={() => {}}
              size="large"
              color="primary"
              className={classes.btn}
            >
              Open
            </Button>
          </NavLink>
        </CardActions>
      </Card>
    </Box>
  );
}

export default Folder;

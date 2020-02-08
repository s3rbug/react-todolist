import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { NavLink } from "react-router-dom";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import SunIcon from "@material-ui/icons/Brightness5Outlined";
import MoonIcon from "@material-ui/icons/Brightness2Outlined";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
//import ClickAwayListener from "@material-ui/core/ClickAwayListener";

let drawerWidth = window.innerWidth * 0.2;
let useStyles;
updateStyles();

var isMobile = {
  Android: function() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
    return (
      navigator.userAgent.match(/IEMobile/i) ||
      navigator.userAgent.match(/WPDesktop/i)
    );
  },
  any: function() {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  }
};

function updateStyles() {
  useStyles = makeStyles(theme => ({
    root: {
      display: "flex"
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    hide: {
      display: "none"
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      height: "100vh"
    },
    drawerPaper: {
      width: drawerWidth,
      boxShadow: theme.shadows[3]
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: "flex-end"
    },
    content: {
      flexGrow: 1,
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      marginLeft: -drawerWidth
    },
    link: {
      textDecoration: "none",
      color: "black"
    },
    listText: {
      color: theme.palette.text.primary
    },
    blurredContent: {
      opacity: 0.2,
      backgroundColor: theme.palette.background.default,
      pointerEvents: "none"
    }
  }));
}

function Header({ isLight, setIsLight, children }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);

  drawerWidth = window.innerWidth * (isMobile.any() ? 0.5 : 0.2);
  updateStyles();

  const handleDrawer = () => {
    setOpen(!open);
    setPressed(true);
  };

  function toggleTheme() {
    setIsLight(!isLight);
  }

  function handleClickAway(e) {
    if (open && !pressed) setOpen(false);
    setPressed(false);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawer}
            edge="start"
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            To do list
          </Typography>
        </Toolbar>
      </AppBar>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawer}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <List>
            <NavLink
              to="/folders"
              className={classes.link}
              onClick={() => setOpen(false)}
            >
              <ListItem button>
                <ListItemIcon>
                  <FolderOpenIcon />
                </ListItemIcon>
                <ListItemText primary="Folders" className={classes.listText} />
              </ListItem>
            </NavLink>
            <ListItem button onClick={toggleTheme}>
              <ListItemIcon>
                {isLight ? <SunIcon /> : <MoonIcon />}
              </ListItemIcon>
              <ListItemText
                primary={isLight ? "Light theme" : "Dark theme"}
                className={classes.listText}
              />
            </ListItem>
          </List>
        </Drawer>
      </ClickAwayListener>
      <main
        className={clsx(classes.content, {
          [classes.blurredContent]: open
        })}
      >
        <div className={classes.drawerHeader} />
        {children}
      </main>
    </div>
  );
}

export default Header;

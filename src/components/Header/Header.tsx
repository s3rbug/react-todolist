import React, { useState, useEffect } from "react";
import { makeStyles, useTheme, Theme } from "@material-ui/core/styles";
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

const isMobile = {
  Android: () => navigator.userAgent.match(/Android/i),
  BlackBerry: () => navigator.userAgent.match(/BlackBerry/i),
  iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
  Opera: () => navigator.userAgent.match(/Opera Mini/i),
  Windows: () =>
    navigator.userAgent.match(/IEMobile/i) ||
    navigator.userAgent.match(/WPDesktop/i),
  any: () =>
    isMobile.Android() ||
    isMobile.BlackBerry() ||
    isMobile.iOS() ||
    isMobile.Opera() ||
    isMobile.Windows(),
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    height: "100vh",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: theme.palette.type === "dark" ? "#3700B3" : "#3F51B5",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    flexShrink: 0,
  },
  drawerPaper: {
    boxShadow: theme.shadows[3],
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
  listText: {
    color: theme.palette.text.primary,
  },
}));

type PropsType = {
  isLight: boolean;
  setIsLight: (isLight: boolean) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactChild;
};

const Header = ({
  isLight,
  setIsLight,
  open,
  setOpen,
  children,
}: PropsType) => {
  const classes = useStyles();
  const theme = useTheme();
  const [drawerWidth, setDrawerWidth] = useState(
    window.innerWidth * (isMobile.any() ? 0.5 : 0.2)
  );

  useEffect(() => {
    const handleResize = () => {
      if (drawerWidth !== window.innerWidth * (isMobile.any() ? 0.5 : 0.2))
        setDrawerWidth(window.innerWidth * (isMobile.any() ? 0.5 : 0.2));
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const handleDrawer = () => {
    setOpen(!open);
  };

  const toggleTheme = () => {
    setIsLight(!isLight);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
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
      <Drawer
        className={classes.drawer}
        style={{
          width: drawerWidth + "px",
        }}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div
          className={classes.drawerHeader}
          style={{
            width: drawerWidth + "px",
          }}
        >
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
            <ListItemIcon>{isLight ? <SunIcon /> : <MoonIcon />}</ListItemIcon>
            <ListItemText
              primary={isLight ? "Light theme" : "Dark theme"}
              className={classes.listText}
            />
          </ListItem>
        </List>
      </Drawer>

      <main
        className={classes.content}
        style={{
          marginLeft: -drawerWidth + "px",
        }}
      >
        <div>
          <div className={classes.drawerHeader} />
          {children}
        </div>
      </main>
    </div>
  );
};

export default Header;

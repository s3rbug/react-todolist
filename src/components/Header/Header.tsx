import React, { useState, useEffect } from "react";
import {
    makeStyles,
    useTheme,
    Theme,
    StyleRules,
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import FoldersTreeView from "./FoldersTreeView";
import AddTagDialog from "./Dialogs/AddTagDialog";
import EditTagDialog from "./Dialogs/EditTagDialog";
import SetFolderDialog from "./Dialogs/SetFolderDialog";
import EditFolderDialog from "./Dialogs/EditFolderDialog";
import SunIcon from "@material-ui/icons/Brightness7";
import MoonIcon from "@material-ui/icons/Brightness4";
import { useDispatch } from "react-redux";
import { addTagAction } from "../../redux/actions/todo";
import { setIsLightAction } from "../../redux/actions/ui";

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

const useStyles = makeStyles(
    (theme: Theme): StyleRules<string> => ({
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
            background: "#3F51B5",
        },
        menuButton: {
            marginRight: theme.spacing(2),
            color: "white",
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
        trashCan: {
            color: "white",
        },
        title: { flexGrow: 1, color: "white" },
        trashCanContainer: {},
        toolbar: {
            paddingRight: theme.spacing(1.5),
            paddingLeft: theme.spacing(3),
        },
        bottom: {
            height: "100%",
        },
        switcher: {
            height: "100%",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
        },
        switcherText: {
            flexGrow: 1,
            textAlign: "right",
        },
        moon: {
            "&:hover": {
                color: theme.palette.grey[800],
            },
        },
        sun: {
            "&:hover": {
                color: "#fff59d",
            },
        },
    })
);

type PropsType = {
    isLight: boolean;
    open: boolean;
    setOpen: (open: boolean) => void;
    children: React.ReactChild;
};

const Header = ({ isLight, open, setOpen, children }: PropsType) => {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();

    const [drawerWidth, setDrawerWidth] = useState(
        window.innerWidth * (isMobile.any() ? 0.5 : 0.2)
    );

    const [addTagOpened, setAddTagOpened] = useState(false);
    const [editTagOpened, setEditTagOpened] = useState(false);
    const [folderSetOpened, setFolderSetOpened] = useState(false);
    const [editFolderOpened, setEditFolderOpened] = useState(false);
    const [headline, setHeadline] = useState("");
    const [editTagId, setEditTagId] = useState(0);
    const [currentFolderId, setCurrentFolderId] = useState(0);
    const [editTagName, setEditTagName] = useState("");

    const addTag = (name: string, color: string) =>
        dispatch(addTagAction(name, color));
    const setIsLight = (light: boolean) => dispatch(setIsLightAction(light));

    const openAddTag = () => {
        setAddTagOpened(true);
    };
    const openEditTag = () => {
        setEditTagOpened(true);
    };
    const openSetFolder = () => {
        setFolderSetOpened(true);
    };
    const openEditFolder = () => {
        setEditFolderOpened(true);
    };

    useEffect(() => {
        const handleResize = () => {
            if (
                drawerWidth !==
                window.innerWidth * (isMobile.any() ? 0.5 : 0.2)
            )
                setDrawerWidth(
                    window.innerWidth * (isMobile.any() ? 0.5 : 0.2)
                );
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [drawerWidth]);

    const handleDrawer = () => {
        setOpen(!open);
    };

    const toggleTheme = () => {
        setIsLight(!isLight);
    };

    const handleToggleTheme = () => {
        setIsLight(!isLight);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawer}
                        edge="start"
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" noWrap className={classes.title}>
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
                <FoldersTreeView
                    addTag={addTag}
                    toggleTheme={toggleTheme}
                    isLight={isLight}
                    openAddTag={openAddTag}
                    openEditTag={openEditTag}
                    openSetFolder={openSetFolder}
                    setEditTagName={setEditTagName}
                    setEditTagId={setEditTagId}
                    openEditFolder={openEditFolder}
                    setHeadline={setHeadline}
                    setCurrentFolderId={setCurrentFolderId}
                />
                <div className={classes.bottom}>
                    <div className={classes.switcher}>
                        <IconButton onClick={handleToggleTheme}>
                            {isLight ? (
                                <MoonIcon className={classes.moon} />
                            ) : (
                                <SunIcon className={classes.sun} />
                            )}
                        </IconButton>
                    </div>
                </div>
                <AddTagDialog
                    setOpen={setAddTagOpened}
                    open={addTagOpened}
                    addTag={addTag}
                />
                <EditTagDialog
                    setOpen={setEditTagOpened}
                    open={editTagOpened}
                    tagId={editTagId}
                    tagName={editTagName}
                />
                <SetFolderDialog
                    open={folderSetOpened}
                    setOpen={setFolderSetOpened}
                />
                <EditFolderDialog
                    headline={headline}
                    open={editFolderOpened}
                    setOpen={setEditFolderOpened}
                    folderId={currentFolderId}
                />
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

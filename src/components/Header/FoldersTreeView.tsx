import React, { useState } from "react";
import {
    Theme,
    makeStyles,
    StyleRules,
    Typography,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Collapse,
    ListItemSecondaryAction,
    ListItemIcon,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/EditRounded";
import AddIcon from "@material-ui/icons/Add";
import { combineStyles } from "../../utils/helpers";
import MoreIcon from "@material-ui/icons/ExpandMore";
import LessIcon from "@material-ui/icons/ChevronRight";
import { useTypedSelector } from "../../redux/reduxStore";

type PropsType = {
    toggleTheme: () => void;
    addTag: (name: string, color: string) => void;
    isLight: boolean;
    openAddTag: () => void;
    openEditTag: () => void;
    openSetFolder: () => void;
    openEditFolder: () => void;
    setEditTagName: (name: string) => void;
    setEditTagId: (id: number) => void;
    setHeadline: (headline: string) => void;
    setCurrentFolderId: (id: number) => void;
};

const useStyles = makeStyles(
    (theme: Theme): StyleRules<string> => ({
        labelText: {
            fontWeight: "inherit",
            flexGrow: 1,
        },
        labelIcon: {
            //marginRight: theme.spacing(1),
        },
        labelRoot: {
            display: "flex",
            alignItems: "left",
        },
        iconButton: {
            "&:hover": {
                color: theme.palette.primary.main,
            },
        },
        iconAddButton: {
            "&:hover": {
                color: theme.palette.primary.light,
            },
        },
        root: {
            padding: 0,
        },
        listItem: {
            height: "50px",
            paddingLeft: 0,
        },
        bottomListItem: {
            paddingLeft: "40px",
        },
        moreIcon: {
            minWidth: 0,
            marginRight: "5px",
        },
    })
);

const FoldersTreeView = ({
    toggleTheme,
    addTag,
    isLight,
    openAddTag,
    openEditTag,
    openSetFolder,
    openEditFolder,
    setEditTagName,
    setEditTagId,
    setHeadline,
    setCurrentFolderId,
}: PropsType) => {
    //const theme = useTheme();
    const classes = useStyles();
    const [foldersOpened, setFoldersOpened] = useState(false);
    const [tagsOpened, setTagsOpened] = useState(false);

    const tags = useTypedSelector((state) => state.todo.tags);
    const folders = useTypedSelector((state) => state.todo.folders);

    const toggleFoldersOpen = () => {
        setFoldersOpened(!foldersOpened);
    };
    const toggleTagsOpened = () => {
        setTagsOpened(!tagsOpened);
    };
    return (
        <List className={classes.root}>
            <ListItem
                button
                onClick={toggleFoldersOpen}
                className={classes.listItem}
            >
                <ListItemIcon className={classes.moreIcon}>
                    {foldersOpened ? <MoreIcon /> : <LessIcon />}
                </ListItemIcon>
                <ListItemText>
                    <div className={classes.labelRoot}>
                        <Typography
                            variant="h5"
                            className={classes.labelText}
                            style={{
                                alignSelf: "center",
                                pointerEvents: "none",
                            }}
                        >
                            Folders
                        </Typography>
                    </div>
                </ListItemText>
                <ListItemSecondaryAction>
                    {foldersOpened ? (
                        <IconButton
                            className={classes.iconAddButton}
                            onClick={openSetFolder}
                        >
                            <AddIcon
                                style={{
                                    fontSize: "1.2em",
                                }}
                            />
                        </IconButton>
                    ) : (
                        <></>
                    )}
                </ListItemSecondaryAction>
            </ListItem>
            <Collapse in={foldersOpened}>
                {folders.map((folder) => {
                    return (
                        <ListItem
                            key={"tree-item-node-" + folder.id}
                            className={combineStyles([
                                classes.bottomListItem,
                                classes.listItem,
                            ])}
                        >
                            <ListItemText>
                                <div className={classes.labelRoot}>
                                    <Typography
                                        variant="h6"
                                        className={classes.labelText}
                                    >
                                        {folder.headline}
                                    </Typography>
                                </div>
                            </ListItemText>
                            <ListItemSecondaryAction>
                                <IconButton
                                    className={classes.iconButton}
                                    onClick={() => {
                                        setHeadline(folder.headline);
                                        setCurrentFolderId(folder.id);
                                        openEditFolder();
                                    }}
                                >
                                    <EditIcon style={{ fontSize: "0.8em" }} />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </Collapse>
            <ListItem
                button
                onClick={toggleTagsOpened}
                className={classes.listItem}
            >
                <ListItemIcon className={classes.moreIcon}>
                    {tagsOpened ? <MoreIcon /> : <LessIcon />}
                </ListItemIcon>
                <ListItemText>
                    <div className={classes.labelRoot}>
                        <Typography
                            variant="h5"
                            className={classes.labelText}
                            style={{
                                alignSelf: "center",
                                pointerEvents: "none",
                            }}
                        >
                            Tags
                        </Typography>
                    </div>
                </ListItemText>
                <ListItemSecondaryAction>
                    {tagsOpened ? (
                        <IconButton
                            className={classes.iconAddButton}
                            onClick={openAddTag}
                        >
                            <AddIcon style={{ fontSize: "1.2em" }} />
                        </IconButton>
                    ) : (
                        <></>
                    )}
                </ListItemSecondaryAction>
            </ListItem>
            <Collapse in={tagsOpened}>
                {tags.map((tag, id) => {
                    return (
                        <ListItem
                            key={"tree-item-node-" + tag.name}
                            className={combineStyles([
                                classes.bottomListItem,
                                classes.listItem,
                            ])}
                        >
                            <ListItemText>
                                <div className={classes.labelRoot}>
                                    <Typography
                                        variant="h6"
                                        className={classes.labelText}
                                        style={{ color: tag.color }}
                                    >
                                        {"#" + tag.name}
                                    </Typography>
                                </div>
                            </ListItemText>
                            <ListItemSecondaryAction>
                                <IconButton
                                    onClick={() => {
                                        openEditTag();
                                        setEditTagId(id);
                                        setEditTagName(tag.name);
                                    }}
                                    className={classes.iconButton}
                                >
                                    <EditIcon style={{ fontSize: "0.8em" }} />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </Collapse>
        </List>
    );
};

export default FoldersTreeView;

import React, { useState } from "react";
import {
    makeStyles,
    Theme,
    StyleRules,
    Typography,
    Divider,
    useTheme,
    Menu,
    MenuItem,
    Tooltip,
} from "@material-ui/core";
import FolderIcon from "@material-ui/icons/FolderOutlined";
import { FolderType } from "../../types/index_d";
import { useTypedSelector } from "../../redux/reduxStore";
import { useDispatch } from "react-redux";
import { setCurrentFoldersAction } from "../../redux/actions/todo";

const useStyles = makeStyles(
    (theme: Theme): StyleRules<string> => ({
        root: {
            display: "flex",
            background: theme.palette.background.paper,
            marginLeft: "30px",
            marginRight: "80px",
            marginTop: "10px",
            borderRadius: "100px",
            height: "35px",
            padding: "7px",
            alignItems: "center",
        },
        text: {
            marginRight: "20px",
        },
        divider: {
            marginRight: "20px",
        },
        test: {
            display: "inline-block",
        },
        icon: {
            marginRight: "2px",
            "&:hover": {
                color: theme.palette.primary.main,
            },
        },
    })
);

type PropsType = {
    headline: string;
    folders: ReadonlyArray<FolderType>;
    folderId: number;
};

const FolderLabel = ({ headline, folders, folderId }: PropsType) => {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const [tooltipOpened, setTooltipOpened] = useState(false);

    const setCurrentFolders = (from: number, folderId: number) =>
        dispatch(setCurrentFoldersAction(from, folderId));

    const foldersCount = useTypedSelector((state) => state.todo.folders.length);

    const handleTooltipClose = () => {
        setTooltipOpened(false);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = (event: any) => {
        if (foldersCount !== 3) setAnchorEl(event.currentTarget);
        else setTooltipOpened(true);
    };
    return (
        <div className={classes.test}>
            <div className={classes.root}>
                <Typography variant="h5" className={classes.text}>
                    {headline}
                </Typography>
                <Divider
                    orientation="vertical"
                    className={classes.divider}
                    style={{ background: theme.palette.divider, width: "1px" }}
                />
                <Tooltip
                    placement="right"
                    open={tooltipOpened}
                    onClose={handleTooltipClose}
                    title="There is no active folders left"
                >
                    <FolderIcon
                        onClick={handleClick}
                        className={classes.icon}
                    />
                </Tooltip>
                {
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {folders.map((folder, id) => {
                            if (folder.shown)
                                return (
                                    <div
                                        key={
                                            folder.headline + folder.id + "menu"
                                        }
                                    />
                                );
                            else
                                return (
                                    <MenuItem
                                        key={
                                            folder.headline + folder.id + "menu"
                                        }
                                        onClick={() => {
                                            setCurrentFolders(folderId, id);
                                            handleClose();
                                        }}
                                    >
                                        {folder.headline}
                                    </MenuItem>
                                );
                        })}
                    </Menu>
                }
            </div>
        </div>
    );
};

export default FolderLabel;

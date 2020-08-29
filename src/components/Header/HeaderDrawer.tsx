import React, { useState } from "react";
import {
	Theme,
	makeStyles,
	StyleRules,
	Drawer,
	IconButton,
} from "@material-ui/core";
import { isMobile, useTypedSelector } from "../../redux/reduxStore";
import FoldersTreeView from "./FoldersTreeView";
import AddTagDialog from "./Dialogs/AddTagDialog";
import EditTagDialog from "./Dialogs/EditTagDialog";
import AddFolderDialog from "./Dialogs/AddFolderDialog";
import { useDispatch } from "react-redux";
import { addTagAction } from "../../redux/actions/todo";
import { setIsLightAction } from "../../redux/actions/ui";
import SunIcon from "@material-ui/icons/Brightness7";
import MoonIcon from "@material-ui/icons/Brightness4";
import EditFolderDialog from "./Dialogs/EditFolderDialog";

const useStyles = makeStyles(
	(theme: Theme): StyleRules<string> => ({
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
		fullHeight: {
			height: "100%",
		},
		switcher: {
			height: "100%",
			display: "flex",
			alignItems: "flex-end",
			justifyContent: "flex-end",
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
	open: boolean;
};

const HeaderDrawer = ({ open }: PropsType) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [addTagOpened, setAddTagOpened] = useState(false);
	const [editTagOpened, setEditTagOpened] = useState(false);
	const [folderSetOpened, setFolderSetOpened] = useState(false);
	const [editFolderOpened, setEditFolderOpened] = useState(false);
	const [headline, setHeadline] = useState("");
	const [editTagId, setEditTagId] = useState(0);
	const [currentFolderId, setCurrentFolderId] = useState(0);
	const [editTagName, setEditTagName] = useState("");

	const isLight = useTypedSelector((state) => state.ui.isLight);

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

	const toggleTheme = () => {
		setIsLight(!isLight);
	};

	return (
		<Drawer
			className={classes.drawer}
			style={{
				width: isMobile.any() ? "50vw" : "20vw",
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
					width: isMobile.any() ? "50vw" : "20vw",
				}}
			/>
			<FoldersTreeView
				openAddTag={openAddTag}
				openEditTag={openEditTag}
				openSetFolder={openSetFolder}
				setEditTagName={setEditTagName}
				setEditTagId={setEditTagId}
				openEditFolder={openEditFolder}
				setHeadline={setHeadline}
				setCurrentFolderId={setCurrentFolderId}
			/>
			<div className={classes.fullHeight}>
				<div className={classes.switcher}>
					<IconButton onClick={toggleTheme}>
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
			<AddFolderDialog open={folderSetOpened} setOpen={setFolderSetOpened} />
			<EditFolderDialog
				headline={headline}
				open={editFolderOpened}
				setOpen={setEditFolderOpened}
				folderId={currentFolderId}
			/>
		</Drawer>
	);
};

export default HeaderDrawer;

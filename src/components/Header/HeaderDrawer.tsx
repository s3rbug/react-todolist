import React, { useState } from "react";
import { Theme, makeStyles, StyleRules, Drawer } from "@material-ui/core";
import FoldersTreeView from "./FoldersTreeView";
import AddTagDialog from "./Dialogs/AddTagDialog";
import EditTagDialog from "./Dialogs/EditTagDialog";
import AddFolderDialog from "./Dialogs/AddFolderDialog";
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
	})
);

type PropsType = {
	open: boolean;
};

const HeaderDrawer = ({ open }: PropsType) => {
	const classes = useStyles();
	const [addTagOpened, setAddTagOpened] = useState(false);
	const [editTagOpened, setEditTagOpened] = useState(false);
	const [folderSetOpened, setFolderSetOpened] = useState(false);
	const [editFolderOpened, setEditFolderOpened] = useState(false);
	const [headline, setHeadline] = useState("");
	const [editTagId, setEditTagId] = useState(0);
	const [currentFolderId, setCurrentFolderId] = useState(0);
	const [editTagName, setEditTagName] = useState("");

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

	return (
		<Drawer
			className={classes.drawer}
			style={{
				width: "300px",
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
					width: "300px",
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
			<AddTagDialog setOpen={setAddTagOpened} open={addTagOpened} />
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

import { useState } from "react";
import { styled } from '@mui/material/styles';
import { Drawer } from "@mui/material";
import FoldersTreeView from "./FoldersTreeView";
import AddTagDialog from "./Dialogs/AddTagDialog";
import EditTagDialog from "./Dialogs/EditTagDialog";
import AddFolderDialog from "./Dialogs/AddFolderDialog";
import EditFolderDialog from "./Dialogs/EditFolderDialog";

const DrawerHeader = styled('div', {
	shouldForwardProp: prop => prop !== "drawerWidth"
})<{drawerWidth: number}>(({ theme, drawerWidth }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	width: `${drawerWidth}px`,
	...theme.mixins.toolbar,
}));

type PropsType = {
	open: boolean;
	drawerWidth: number;
};

const HeaderDrawer = ({ open, drawerWidth }: PropsType) => {
	const [addTagOpened, setAddTagOpened] = useState(false);
	const [editTagOpened, setEditTagOpened] = useState(false);
	const [addFolderOpened, setAddFolderOpened] = useState(false);
	const [editFolderOpened, setEditFolderOpened] = useState(false);
	const [headline, setHeadline] = useState("");
	const [editTagId, setEditTagId] = useState("");
	const [currentFolderId, setCurrentFolderId] = useState("");
	const [editTagName, setEditTagName] = useState("");

	const openAddTag = () => {
		setAddTagOpened(true);
	};
	const openEditTag = () => {
		setEditTagOpened(true);
	};
	const openAddFolder = () => {
		setAddFolderOpened(true);
	};
	const openEditFolder = () => {
		setEditFolderOpened(true);
	};

	return (
        <Drawer
			sx={{
				width: `${drawerWidth}px`,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					boxShadow: 15,
				},
			}}
			variant="persistent"
			anchor="left"
			open={open}
		>
			<DrawerHeader drawerWidth={drawerWidth}/>
			<FoldersTreeView
				openAddTag={openAddTag}
				openEditTag={openEditTag}
				openAddFolder={openAddFolder}
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
			<AddFolderDialog open={addFolderOpened} setOpen={setAddFolderOpened} />
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

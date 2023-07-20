import { useState } from "react"
import { styled } from "@mui/material/styles"
import { Drawer } from "@mui/material"
import { FoldersTreeView } from "../FoldersTreeView"
import {
	AddFolderDialog,
	EditFolderDialog,
	AddTagDialog,
	EditTagDialog,
} from "../Dialogs"

const DrawerHeader = styled("div", {
	shouldForwardProp: (prop) => prop !== "drawerWidth",
})<{ drawerWidth: number }>(({ theme, drawerWidth }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	width: `${drawerWidth}px`,
	...theme.mixins.toolbar,
}))

type PropsType = {
	open: boolean
	drawerWidth: number
	setOpen: (open: boolean) => void
}

export const HeaderDrawer = ({ open, setOpen, drawerWidth }: PropsType) => {
	const [modalState, setModalState] = useState({
		addTagOpened: false,
		editTagOpened: false,
		addFolderOpened: false,
		editFolderOpened: false,
	})

	const [formDataState, setFormDataState] = useState({
		headline: "",
		tagId: "",
		currentFolderId: "",
		tagName: "",
	})

	const setModalOpened = (
		modalName: keyof typeof modalState,
		isOpen: boolean = true
	) => {
		setModalState((prevState) => ({
			...prevState,
			[modalName]: isOpen,
		}))
	}

	const setFormData = (formData: keyof typeof formDataState, value: string) => {
		setFormDataState((prevState) => ({
			...prevState,
			[formData]: value,
		}))
	}

	return (
		<Drawer
			sx={{
				width: `${drawerWidth}px`,
				flexShrink: 0,
				"& .MuiDrawer-paper": {
					boxShadow: 15,
				},
			}}
			anchor="left"
			open={open}
			onClose={() => setOpen(false)}
		>
			<DrawerHeader drawerWidth={drawerWidth} />
			<FoldersTreeView
				openAddTag={() => setModalOpened("addTagOpened")}
				openEditTag={() => setModalOpened("editTagOpened")}
				openAddFolder={() => setModalOpened("addFolderOpened")}
				openEditFolder={() => setModalOpened("editFolderOpened")}
				setEditTagName={(value: string) => setFormData("tagName", value)}
				setEditTagId={(value: string) => setFormData("tagId", value)}
				setHeadline={(value: string) => setFormData("headline", value)}
				setCurrentFolderId={(value: string) =>
					setFormData("currentFolderId", value)
				}
			/>
			<AddTagDialog
				setOpen={(isOpen: boolean) => setModalOpened("addTagOpened", isOpen)}
				open={modalState.addTagOpened}
			/>
			<EditTagDialog
				setOpen={(isOpen: boolean) => setModalOpened("editTagOpened", isOpen)}
				open={modalState.editTagOpened}
				tagId={formDataState.tagId}
				tagName={formDataState.tagName}
			/>
			<AddFolderDialog
				open={modalState.addFolderOpened}
				setOpen={(isOpen: boolean) => setModalOpened("addFolderOpened", isOpen)}
			/>
			<EditFolderDialog
				headline={formDataState.headline}
				open={modalState.editFolderOpened}
				setOpen={(isOpen: boolean) =>
					setModalOpened("editFolderOpened", isOpen)
				}
				folderId={formDataState.currentFolderId}
			/>
		</Drawer>
	)
}

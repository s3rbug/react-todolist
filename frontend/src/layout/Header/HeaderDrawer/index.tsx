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
	const [formDataState, setFormDataState] = useState({
		headline: "",
		tagId: "",
		currentFolderId: "",
		tagName: "",
	})

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
				setEditTagName={(value: string) => setFormData("tagName", value)}
				setEditTagId={(value: string) => setFormData("tagId", value)}
				setHeadline={(value: string) => setFormData("headline", value)}
				setCurrentFolderId={(value: string) =>
					setFormData("currentFolderId", value)
				}
			/>
			<AddTagDialog />
			<EditTagDialog
				tagId={formDataState.tagId}
				tagName={formDataState.tagName}
			/>
			<AddFolderDialog />
			<EditFolderDialog
				headline={formDataState.headline}
				folderId={formDataState.currentFolderId}
			/>
		</Drawer>
	)
}

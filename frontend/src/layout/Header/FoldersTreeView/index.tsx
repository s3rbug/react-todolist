import { useState } from "react"
import { List, ListItemText, ListItemIcon, ListItemButton } from "@mui/material"
import { useTypedDispatch, useTypedSelector } from "../../../redux/store"
import FolderOpenIcon from "@mui/icons-material/FolderOpen"
import FolderCopyIcon from "@mui/icons-material/FolderCopyOutlined"
import ColorLensIcon from "@mui/icons-material/ColorLensOutlined"
import ColorizeIcon from "@mui/icons-material/ColorizeOutlined"
import { CollapseTreeItem } from "../../../components"
import AddIcon from "@mui/icons-material/Add"
import { FolderType, TagType } from "../../../redux/types/goal"
import { useTranslation } from "react-i18next"
import { uiActions } from "../../../redux/slices/ui"

type PropsType = {
	setEditTagName: (name: string) => void
	setEditTagId: (id: string) => void
	setHeadline: (headline: string) => void
	setCurrentFolderId: (id: string) => void
}

export const FoldersTreeView = ({
	setEditTagName,
	setEditTagId,
	setHeadline,
	setCurrentFolderId,
}: PropsType) => {
	const [foldersOpened, setFoldersOpened] = useState(false)
	const [tagsOpened, setTagsOpened] = useState(false)
	const dispatch = useTypedDispatch()
	const { t } = useTranslation()

	const tags = useTypedSelector((state) => state.goal.tags)
	const folders = useTypedSelector((state) => state.goal.folders)

	const handleFolderClick = (folder: FolderType) => () => {
		setCurrentFolderId(folder.id)
		setHeadline(folder.headline)
		dispatch(uiActions.setModalOpen({ type: "editFolder", open: true }))
	}

	const handleTagClick = (tag: TagType) => () => {
		setEditTagId(tag.id)
		setEditTagName(tag.name)
		dispatch(uiActions.setModalOpen({ type: "editTag", open: true }))
	}

	const openAddFolder = () => {
		dispatch(uiActions.setModalOpen({ type: "addFolder", open: true }))
	}

	const openAddTag = () => {
		dispatch(uiActions.setModalOpen({ type: "addTag", open: true }))
	}

	return (
		<List
			component="nav"
			aria-labelledby="nested-list-subheader"
			sx={{ padding: 0 }}
		>
			<CollapseTreeItem
				open={foldersOpened}
				setOpen={setFoldersOpened}
				collapseText={t("drawer.folders")}
				collapseIcon={<FolderCopyIcon />}
			>
				{folders.map((folder) => {
					return (
						<ListItemButton
							key={`Collapse-folder-item-${folder.id}`}
							onClick={handleFolderClick(folder)}
							sx={{ pl: 4 }}
						>
							<ListItemIcon>
								<FolderOpenIcon />
							</ListItemIcon>
							<ListItemText primary={folder.headline} />
						</ListItemButton>
					)
				})}
				<ListItemButton
					onClick={openAddFolder}
					sx={{
						pl: 4,
					}}
				>
					<ListItemIcon>
						<AddIcon />
					</ListItemIcon>
					<ListItemText primary={t("drawer.create-folder")} />
				</ListItemButton>
			</CollapseTreeItem>

			<CollapseTreeItem
				open={tagsOpened}
				setOpen={setTagsOpened}
				collapseText={t("drawer.tags")}
				collapseIcon={<ColorLensIcon />}
			>
				{tags.map((tag) => {
					return (
						<ListItemButton
							key={`Collapse-tag-item-${tag.id}`}
							onClick={handleTagClick(tag)}
							sx={{
								pl: 4,
							}}
						>
							<ListItemIcon>
								<ColorizeIcon />
							</ListItemIcon>
							<ListItemText
								primary={`#${tag.name}`}
								sx={{
									color: tag.color,
								}}
							/>
						</ListItemButton>
					)
				})}
				<ListItemButton
					onClick={openAddTag}
					sx={{
						pl: 4,
					}}
				>
					<ListItemIcon>
						<AddIcon />
					</ListItemIcon>
					<ListItemText primary={t("drawer.create-tag")} />
				</ListItemButton>
			</CollapseTreeItem>
		</List>
	)
}

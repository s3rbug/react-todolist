import { useState } from "react"
import {
	Typography,
	Divider,
	Menu,
	MenuItem,
	Tooltip,
	Box,
} from "@mui/material"
import FolderIcon from "@mui/icons-material/FolderOutlined"
import { FolderType } from "../../types/index_d"
import { reorderCurrentFolders } from "../../redux/middleware/goal"
import { useTypedDispatch } from "../../redux/store"

type PropsType = {
	headline: string
	folders: ReadonlyArray<FolderType>
	folderId: string
}

export const FolderLabel = ({ headline, folders, folderId }: PropsType) => {
	const dispatch = useTypedDispatch()
	const [anchorElement, setAnchorElement] = useState(null)
	const [tooltipOpened, setTooltipOpened] = useState(false)

	const handleTooltipClose = () => {
		setTooltipOpened(false)
	}
	const closeMenu = () => {
		setAnchorElement(null)
	}
	const handleClick = (event: any) => {
		setAnchorElement(event.currentTarget)
	}
	return (
		<Box
			sx={{
				display: "inline-flex",
				backgroundColor: "background.paper",
				ml: 3.5,
				marginTop: 2,
				borderRadius: 5,
				height: 35,
				padding: 0.8,
				alignItems: "center",
			}}
		>
			<Typography
				variant="h5"
				sx={{
					marginRight: 2.5,
					paddingLeft: 1,
				}}
			>
				{headline}
			</Typography>
			<Divider
				orientation="vertical"
				sx={{
					marginRight: 2.5,
					background: "divider",
					width: "1px",
				}}
			/>
			<Tooltip
				placement="right"
				open={tooltipOpened}
				onClose={handleTooltipClose}
				title="There is no active folders left"
			>
				<FolderIcon
					sx={{
						marginRight: 0.75,
						"&:hover": {
							color: "primary.main",
						},
					}}
					onClick={handleClick}
				/>
			</Tooltip>
			<Menu
				anchorEl={anchorElement}
				keepMounted
				open={Boolean(anchorElement)}
				onClose={closeMenu}
			>
				{folders.map((folder) => {
					if (folder.id === folderId) {
						return null
					}
					return (
						<MenuItem
							key={`${folder.id}-menu-item`}
							onClick={() => {
								dispatch(
									reorderCurrentFolders({
										fromFolderId: folderId,
										toFolderId: folder.id,
									})
								)
								closeMenu()
							}}
						>
							{folder.headline}
						</MenuItem>
					)
				})}
			</Menu>
		</Box>
	)
}

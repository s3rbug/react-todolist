import {
	Collapse,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material"
import ExpandLess from "@mui/icons-material/ExpandLess"
import { ReactNode } from "react"
import { Box } from "@mui/system"

type PropsType = {
	open: boolean
	setOpen: (open: boolean) => void
	collapseText: string
	collapseIcon: ReactNode
	children: ReactNode
}

export const CollapseTreeItem = ({
	open,
	setOpen,
	collapseText,
	collapseIcon,
	children,
}: PropsType) => {
	const handleClick = () => {
		setOpen(!open)
	}
	return (
		<>
			<ListItemButton onClick={handleClick}>
				<ListItemIcon>{collapseIcon}</ListItemIcon>
				<ListItemText primary={collapseText} />
				<Box>
					<ExpandLess
						sx={{
							"&:hover svg": {
								color: "primary.main",
							},
							transition: "transform 250ms ease-in",
							transformOrigin: "center",
							transform: open ? "rotateX(0)" : "rotateX(180deg)",
						}}
					/>
				</Box>
			</ListItemButton>
			<Collapse in={open} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{children}
				</List>
			</Collapse>
		</>
	)
}

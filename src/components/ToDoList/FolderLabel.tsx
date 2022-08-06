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
import { reorderCurrentFolders } from "../../redux/middleware/goal";
import { useTypedDispatch } from "../../redux/reduxStore";

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
			paddingLeft: "5px"
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
	folderId: string;
};

const FolderLabel = ({ headline, folders, folderId }: PropsType) => {
	const classes = useStyles();
	const theme = useTheme();
	const dispatch = useTypedDispatch()
	const [anchorEl, setAnchorEl] = useState(null);
	const [tooltipOpened, setTooltipOpened] = useState(false);

	const handleTooltipClose = () => {
		setTooltipOpened(false);
	};
	const closeMenu = () => {
		setAnchorEl(null);
	};
	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
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
					<FolderIcon onClick={handleClick} className={classes.icon} />
				</Tooltip>
				<Menu
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={closeMenu}
				>
					{folders.map((folder) => {
						if (folder.id === folderId){
							return null
						}
						else {
							return (
								<MenuItem
									key={`${folder.id}-menu-item`}
									onClick={() => {										
										dispatch(reorderCurrentFolders(folderId, folder.id))
										closeMenu()
									}}
								>
									{folder.headline}
								</MenuItem>
							);
						}
					})}
				</Menu>
			</div>
		</div>
	);
};

export default FolderLabel;

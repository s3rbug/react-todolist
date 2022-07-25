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
import { useDispatch } from "react-redux";
import {
	swapCurrentFolders,
	swapWithNotShown,
} from "../../redux/middleware/todo";
import { useTypedSelector } from "../../redux/reduxStore";
import {
	swapCurrentFoldersAction,
	swapWithNotShownAction,
} from "../../redux/actions/todo";

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
	folderId: number;
};

const FolderLabel = ({ headline, folders, folderId }: PropsType) => {
	const classes = useStyles();
	const theme = useTheme();
	const dispatch = useDispatch();
	const [anchorEl, setAnchorEl] = useState(null);
	const [tooltipOpened, setTooltipOpened] = useState(false);

	const currentFolders = useTypedSelector((state) => state.todo.currentFolders);
	const serverless = useTypedSelector((state) => state.ui.serverless);

	const handleTooltipClose = () => {
		setTooltipOpened(false);
	};
	const handleClose = () => {
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
					id="simple-menu"
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={handleClose}
				>
					{folders.map((folder, id) => {
						if (id === folderId)
							return <div key={folder.headline + folder.id + "menu"} />;
						else
							return (
								<MenuItem
									key={folder.headline + folder.id + "menu"}
									onClick={() => {
										if (folder.shown) {
											if (serverless) {
												dispatch(swapCurrentFoldersAction(folderId, id));
											} else {
												let from = 0,
													to = 0;
												for (let i = 0; i < currentFolders.length; ++i) {
													if (currentFolders[i].folder === folderId) {
														from = i;
														break;
													}
												}
												for (let i = 0; i < currentFolders.length; ++i) {
													if (currentFolders[i].folder === id) {
														to = i;
														break;
													}
												}
												dispatch(
													swapCurrentFolders(
														from,
														to,
														currentFolders[to].folder,
														currentFolders[from].folder
													)
												);
											}
										} else {
											if (serverless) {
												dispatch(swapWithNotShownAction(folderId, id));
											} else {
												let pos = 0;
												for (let i = 0; i < currentFolders.length; ++i) {
													if (currentFolders[i].folder === folderId) {
														pos = i;
														break;
													}
												}
												dispatch(swapWithNotShown(folderId, id, pos));
											}
										}
										handleClose();
									}}
								>
									{folder.headline}
								</MenuItem>
							);
					})}
				</Menu>
			</div>
		</div>
	);
};

export default FolderLabel;

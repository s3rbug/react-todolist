import React, { useState } from "react";
import {
	Theme,
	makeStyles,
	StyleRules,
	Typography,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Collapse,
	ListItemSecondaryAction,
	ListItemIcon,
	Fade,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { combineStyles, useAnimatedExpand } from "../../utils/helpers";
import MoreIcon from "@material-ui/icons/ExpandMore";
import { useTypedSelector } from "../../redux/reduxStore";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import TagIcon from "@material-ui/icons/LocalOfferOutlined";
import { animated } from "react-spring";

type PropsType = {
	openAddTag: () => void;
	openEditTag: () => void;
	openSetFolder: () => void;
	openEditFolder: () => void;
	setEditTagName: (name: string) => void;
	setEditTagId: (id: number) => void;
	setHeadline: (headline: string) => void;
	setCurrentFolderId: (id: number) => void;
};

const useStyles = makeStyles(
	(theme: Theme): StyleRules<string> => ({
		root: {
			padding: 0,
		},
		labelText: {
			flexGrow: 1,
			fontSize: "25px",
			fontFamily: "Arial",
		},
		labelRoot: {
			display: "flex",
			alignItems: "left",
		},
		iconAddButton: {
			"&:hover": {
				color: theme.palette.primary.light,
			},
			padding: 0,
		},
		listItem: {
			height: "50px",
			paddingLeft: 0,
			maxWidth: "300px",
			overflow: "hidden",
			paddingRight: 0,
		},
		bottomListItem: {
			paddingLeft: "20px",
		},
		expandIcon: {
			minWidth: 0,
			marginRight: "7px",
			marginLeft: "5px",
		},
		mediaIcon: {
			minWidth: 0,
			marginRight: "15px",
		},
		iconMargin: {
			marginLeft: "10%",
		},
		bottomLabel: {
			fontFamily: "Kumbh Sans, Arial",
			fontSize: "1.1em",
		},
		addIcon: {
			fontSize: "1em",
		},
	})
);

const FoldersTreeView = ({
	openAddTag,
	openEditTag,
	openSetFolder,
	openEditFolder,
	setEditTagName,
	setEditTagId,
	setHeadline,
	setCurrentFolderId,
}: PropsType) => {
	const classes = useStyles();
	const [foldersOpened, setFoldersOpened] = useState(false);
	const [tagsOpened, setTagsOpened] = useState(false);

	const tags = useTypedSelector((state) => state.todo.tags);
	const folders = useTypedSelector((state) => state.todo.folders);
	const foldersExpandAnimation = useAnimatedExpand(foldersOpened);
	const tagsExpandAnimation = useAnimatedExpand(tagsOpened);

	const toggleFoldersOpen = () => {
		setFoldersOpened(!foldersOpened);
	};
	const toggleTagsOpened = () => {
		setTagsOpened(!tagsOpened);
	};
	return (
		<List className={classes.root}>
			<ListItem button onClick={toggleFoldersOpen} className={classes.listItem}>
				<ListItemIcon className={classes.expandIcon}>
					<animated.div style={foldersExpandAnimation}>
						<MoreIcon />
					</animated.div>
				</ListItemIcon>
				<ListItemText>
					<div className={classes.labelRoot}>
						<Typography
							variant="h5"
							className={classes.labelText}
							style={{
								alignSelf: "center",
								pointerEvents: "none",
							}}
						>
							Folders
						</Typography>
					</div>
				</ListItemText>
				<ListItemSecondaryAction>
					{foldersOpened && (
						<Fade in={foldersOpened} timeout={500}>
							<IconButton
								className={combineStyles(
									classes.iconAddButton,
									classes.iconMargin
								)}
								onClick={openSetFolder}
							>
								<AddIcon className={classes.addIcon} />
							</IconButton>
						</Fade>
					)}
				</ListItemSecondaryAction>
			</ListItem>
			<Collapse in={foldersOpened}>
				{folders.map((folder) => {
					return (
						<ListItem
							button
							onClick={() => {
								setHeadline(folder.headline);
								setCurrentFolderId(folder.id);
								openEditFolder();
							}}
							key={"tree-item-node-" + folder.id}
							className={combineStyles(
								classes.bottomListItem,
								classes.listItem
							)}
						>
							<ListItemIcon className={classes.mediaIcon}>
								<FolderOpenIcon />
							</ListItemIcon>
							<ListItemText>
								<div className={classes.labelRoot}>
									<Typography variant="h6" className={classes.bottomLabel}>
										{folder.headline}
									</Typography>
								</div>
							</ListItemText>
						</ListItem>
					);
				})}
			</Collapse>
			<ListItem button onClick={toggleTagsOpened} className={classes.listItem}>
				<ListItemIcon className={classes.expandIcon}>
					<animated.div style={tagsExpandAnimation}>
						<MoreIcon />
					</animated.div>
				</ListItemIcon>
				<ListItemText>
					<div className={classes.labelRoot}>
						<Typography
							variant="h5"
							className={classes.labelText}
							style={{
								alignSelf: "center",
								pointerEvents: "none",
							}}
						>
							Tags
						</Typography>
					</div>
				</ListItemText>
				<ListItemSecondaryAction>
					{tagsOpened ? (
						<Fade in={tagsOpened} timeout={300}>
							<IconButton
								className={combineStyles(
									classes.iconAddButton,
									classes.iconMargin
								)}
								onClick={openAddTag}
							>
								<AddIcon className={classes.addIcon} />
							</IconButton>
						</Fade>
					) : (
						<></>
					)}
				</ListItemSecondaryAction>
			</ListItem>
			<Collapse in={tagsOpened}>
				{tags.map((tag, id) => {
					return (
						<ListItem
							key={"tree-item-node-" + tag.name}
							button
							onClick={() => {
								openEditTag();
								setEditTagId(id);
								setEditTagName(tag.name);
							}}
							className={combineStyles(
								classes.bottomListItem,
								classes.listItem
							)}
						>
							<ListItemIcon className={classes.mediaIcon}>
								<TagIcon />
							</ListItemIcon>
							<ListItemText>
								<div className={classes.labelRoot}>
									<Typography
										variant="h6"
										style={{ color: tag.color }}
										className={classes.bottomLabel}
									>
										{"#" + tag.name}
									</Typography>
								</div>
							</ListItemText>
						</ListItem>
					);
				})}
			</Collapse>
		</List>
	);
};

export default FoldersTreeView;

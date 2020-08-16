import React from "react";
import { FolderType, TagType } from "../../types/index_d";
import {
	Theme,
	makeStyles,
	StyleRules,
	Typography,
	IconButton,
} from "@material-ui/core";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import EditIcon from "@material-ui/icons/EditRounded";
import AddIcon from "@material-ui/icons/Add";

type PropsType = {
	toggleTheme: () => void;
	addTag: (name: string, color: string) => void;
	folders: ReadonlyArray<FolderType>;
	tags: ReadonlyArray<TagType>;
	isLight: boolean;
	openAddTag: () => void;
	openEditTag: () => void;
	setEditTagName: (name: string) => void;
	setEditTagId: (id: number) => void;
};

const useStyles = makeStyles(
	(theme: Theme): StyleRules<string> => ({
		labelText: {
			fontWeight: "inherit",
			flexGrow: 1,
		},
		labelIcon: {
			marginRight: theme.spacing(1),
		},
		labelRoot: {
			display: "flex",
			alignItems: "left",
			padding: theme.spacing(0.5, 0),
		},
		iconButton: {
			padding: "10px",
		},
		root: {},
	})
);

const FoldersTreeView = ({
	toggleTheme,
	addTag,
	folders,
	tags,
	isLight,
	openAddTag,
	openEditTag,
	setEditTagName,
	setEditTagId,
}: PropsType) => {
	//const theme = useTheme();
	const classes = useStyles();
	return (
		<TreeView
			className={classes.root}
			defaultCollapseIcon={
				<IconButton className={classes.clickable}>
					<ExpandMoreIcon />
				</IconButton>
			}
			defaultExpandIcon={
				<IconButton className={classes.clickable}>
					<ChevronRightIcon />
				</IconButton>
			}
		>
			<TreeItem
				nodeId="Folders"
				label={
					<div className={classes.labelRoot}>
						<Typography
							variant="h5"
							className={classes.labelText}
							style={{ alignSelf: "center", pointerEvents: "none" }}
						>
							Folders
						</Typography>
						<IconButton className={classes.iconButton}>
							<AddIcon style={{ fontSize: "1em" }} />
						</IconButton>
					</div>
				}
			>
				{folders.map((folder) => {
					return (
						<TreeItem
							key={"tree-item-node-" + folder.id}
							nodeId={"tree-item-node-" + folder.id}
							label={
								<div className={classes.labelRoot}>
									<Typography variant="h6" className={classes.labelText}>
										{folder.headline}
									</Typography>
									<IconButton className={classes.iconButton}>
										<EditIcon style={{ fontSize: "0.8em" }} />
									</IconButton>
								</div>
							}
						/>
					);
				})}
			</TreeItem>
			<TreeItem
				nodeId="Tags"
				label={
					<div className={classes.labelRoot}>
						<Typography
							variant="h5"
							className={classes.labelText}
							style={{ alignSelf: "center", pointerEvents: "none" }}
						>
							Tags
						</Typography>
						<IconButton className={classes.iconButton}>
							<AddIcon onClick={openAddTag} style={{ fontSize: "1em" }} />
						</IconButton>
					</div>
				}
			>
				{tags.map((tag, id) => {
					return (
						<TreeItem
							key={"tree-item-node-" + tag.name}
							label={
								<div className={classes.labelRoot}>
									<Typography
										variant="h6"
										className={classes.labelText}
										style={{ color: tag.color }}
									>
										{"#" + tag.name}
									</Typography>
									<IconButton className={classes.iconButton}>
										<EditIcon
											onClick={() => {
												openEditTag();
												setEditTagId(id);
												setEditTagName(tag.name);
											}}
											style={{ fontSize: "0.8em" }}
										/>
									</IconButton>
								</div>
							}
							nodeId={"tags-item-node-" + tag.name}
						/>
					);
				})}
			</TreeItem>
		</TreeView>
	);
};

export default FoldersTreeView;

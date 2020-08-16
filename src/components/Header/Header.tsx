import React, { useState, useEffect } from "react";
import {
	makeStyles,
	useTheme,
	Theme,
	StyleRules,
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import FoldersTreeView from "./FoldersTreeView";
import { FolderType, TagType } from "../../types/index_d";
import { Switch } from "@material-ui/core";
import AddTagDialog from "./Dialogs/AddTagDialog";
import EditTagDialog from "./Dialogs/EditTagDialog";

const isMobile = {
	Android: () => navigator.userAgent.match(/Android/i),
	BlackBerry: () => navigator.userAgent.match(/BlackBerry/i),
	iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
	Opera: () => navigator.userAgent.match(/Opera Mini/i),
	Windows: () =>
		navigator.userAgent.match(/IEMobile/i) ||
		navigator.userAgent.match(/WPDesktop/i),
	any: () =>
		isMobile.Android() ||
		isMobile.BlackBerry() ||
		isMobile.iOS() ||
		isMobile.Opera() ||
		isMobile.Windows(),
};

const useStyles = makeStyles(
	(theme: Theme): StyleRules<string> => ({
		root: {
			display: "flex",
			height: "100vh",
		},
		appBar: {
			zIndex: theme.zIndex.drawer + 1,
			transition: theme.transitions.create(["margin", "width"], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			background: theme.palette.type === "dark" ? "#3700B3" : "#3F51B5",
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		hide: {
			display: "none",
		},
		drawer: {
			flexShrink: 0,
		},
		drawerPaper: {
			boxShadow: theme.shadows[3],
		},
		drawerHeader: {
			display: "flex",
			alignItems: "center",
			...theme.mixins.toolbar,
			justifyContent: "flex-end",
		},
		content: {
			flexGrow: 1,
			transition: theme.transitions.create("margin", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
		},
		link: {
			textDecoration: "none",
			color: "black",
		},
		listText: {
			color: theme.palette.text.primary,
		},
		trashCan: {
			color: "white",
		},
		title: { flexGrow: 1 },
		trashCanContainer: {},
		toolbar: {
			paddingRight: theme.spacing(1.5),
			paddingLeft: theme.spacing(3),
		},
		bottom: {
			height: "100%",
		},
		switcher: {
			height: "100%",
			display: "flex",
			alignItems: "flex-end",
		},
		switcherText: {
			flexGrow: 1,
			textAlign: "right",
		},
	})
);

type PropsType = {
	folders: FolderType[];
	tags: ReadonlyArray<TagType>;
	isLight: boolean;
	setIsLight: (isLight: boolean) => void;
	open: boolean;
	setOpen: (open: boolean) => void;
	children: React.ReactChild;
	addTag: (name: string, color: string) => void;
	editTag: (tagId: number, newName: string) => void;
};

const Header = ({
	isLight,
	open,
	folders,
	setIsLight,
	setOpen,
	addTag,
	editTag,
	children,
	tags,
}: PropsType) => {
	const classes = useStyles();
	const theme = useTheme();

	const [drawerWidth, setDrawerWidth] = useState(
		window.innerWidth * (isMobile.any() ? 0.5 : 0.2)
	);

	const [addTagOpened, setAddTagOpened] = useState(false);
	const [editTagOpened, setEditTagOpened] = useState(false);
	const [editTagId, setEditTagId] = useState(0);
	const [editTagName, setEditTagName] = useState("");

	const openAddTag = () => {
		setAddTagOpened(!addTagOpened);
	};
	const openEditTag = () => {
		setEditTagOpened(!editTagOpened);
	};

	useEffect(() => {
		const handleResize = () => {
			if (drawerWidth !== window.innerWidth * (isMobile.any() ? 0.5 : 0.2))
				setDrawerWidth(window.innerWidth * (isMobile.any() ? 0.5 : 0.2));
		};
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [drawerWidth]);

	const handleDrawer = () => {
		setOpen(!open);
	};

	const toggleTheme = () => {
		setIsLight(!isLight);
	};

	const handleSwitcher = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsLight(!e.target.checked);
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar className={classes.toolbar}>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawer}
						edge="start"
						className={classes.menuButton}
					>
						<MenuIcon />
					</IconButton>

					<Typography variant="h6" noWrap className={classes.title}>
						To do list
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				style={{
					width: drawerWidth + "px",
				}}
				variant="persistent"
				anchor="left"
				open={open}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div
					className={classes.drawerHeader}
					style={{
						width: drawerWidth + "px",
					}}
				>
					<IconButton onClick={handleDrawer}>
						{theme.direction === "ltr" ? (
							<ChevronLeftIcon />
						) : (
							<ChevronRightIcon />
						)}
					</IconButton>
				</div>
				<FoldersTreeView
					tags={tags}
					folders={folders}
					addTag={addTag}
					toggleTheme={toggleTheme}
					isLight={isLight}
					openAddTag={openAddTag}
					openEditTag={openEditTag}
					setEditTagName={setEditTagName}
					setEditTagId={setEditTagId}
				/>
				<div className={classes.bottom}>
					<div className={classes.switcher}>
						<Typography variant="h5" className={classes.switcherText}>
							Dark theme
						</Typography>
						<Switch onChange={handleSwitcher} name="checkedB" color="primary" />
					</div>
				</div>
				<AddTagDialog
					setOpen={setAddTagOpened}
					open={addTagOpened}
					addTag={addTag}
				/>
				<EditTagDialog
					setOpen={setEditTagOpened}
					open={editTagOpened}
					editTag={editTag}
					tagId={editTagId}
					tagName={editTagName}
				/>
			</Drawer>

			<main
				className={classes.content}
				style={{
					marginLeft: -drawerWidth + "px",
				}}
			>
				<div>
					<div className={classes.drawerHeader} />
					{children}
				</div>
			</main>
		</div>
	);
};

export default Header;

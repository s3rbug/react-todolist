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
	})
);

type PropsType = {
	isLight: boolean;
	setIsLight: (isLight: boolean) => void;
	open: boolean;
	setOpen: (open: boolean) => void;
	children: React.ReactChild;
	addTag: (name: string, color: string) => void;
};

const Header = ({
	isLight,
	open,
	setIsLight,
	setOpen,
	addTag,
	children,
}: PropsType) => {
	const classes = useStyles();
	const theme = useTheme();

	const [drawerWidth, setDrawerWidth] = useState(
		window.innerWidth * (isMobile.any() ? 0.5 : 0.2)
	);

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
				<FoldersTreeView addTag={addTag} toggleTheme={toggleTheme} />
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

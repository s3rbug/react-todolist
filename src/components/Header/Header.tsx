import React from "react";
import { makeStyles, Theme, StyleRules } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { isMobile } from "../../redux/reduxStore";
import HeaderDrawer from "./HeaderDrawer";

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
			background: "#3F51B5",
		},
		menuButton: {
			marginRight: theme.spacing(2),
			color: "white",
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
		title: { flexGrow: 1, color: "white" },
		toolbar: {
			paddingRight: theme.spacing(1.5),
			paddingLeft: theme.spacing(3),
		},
		moon: {
			"&:hover": {
				color: theme.palette.grey[800],
			},
		},
		sun: {
			"&:hover": {
				color: "#fff59d",
			},
		},
	})
);

type PropsType = {
	open: boolean;
	setOpen: (open: boolean) => void;
	children: React.ReactChild;
};

const Header = ({ open, setOpen, children }: PropsType) => {
	const classes = useStyles();

	const toggleDrawerOpened = () => {
		setOpen(!open);
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar className={classes.toolbar}>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={toggleDrawerOpened}
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
			<HeaderDrawer open={open} />
			<main
				className={classes.content}
				style={{
					marginLeft: isMobile.any() ? "-50vw" : "-20vw",
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

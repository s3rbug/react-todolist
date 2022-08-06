import React from "react";
import { makeStyles, Theme, StyleRules } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useTypedSelector } from "../../redux/reduxStore";
import HeaderDrawer from "./HeaderDrawer";
import { LinearProgress } from "@material-ui/core";
import SunIcon from "@material-ui/icons/Brightness7";
import MoonIcon from "@material-ui/icons/Brightness4";
import { useDispatch } from "react-redux";
import GithubIcon from "@material-ui/icons/GitHub";
import { uiActions } from "../../redux/slices/ui";

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
			"&:disabled": {
				color: "#D3D3D3",
			},
			transition: "color .5s",
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
			paddingRight: theme.spacing(2),
			paddingLeft: theme.spacing(3),
		},
		icon: {
			color: "white",
		},
		loader: {
			background: theme.palette.primary.light,
			"& > *": {
				background:
					theme.palette.grey[theme.palette.type === "light" ? 300 : 600],
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
	const dispatch = useDispatch();
	const username = useTypedSelector(state => state.auth.username)
	const isPageLoading = useTypedSelector((state) => state.ui.isPageLoading);
	const isLight = useTypedSelector((state) => state.ui.isLight);
	
	const toggleDrawerOpened = () => {
		setOpen(!open);
	};

	const toggleTheme = () => {
		dispatch(uiActions.setIsLight({isLight: !isLight}))
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
						disabled={isPageLoading}
					>
						<MenuIcon />
					</IconButton>

					<Typography variant="h6" noWrap className={classes.title}>
						{username ?
							`${username}'s to do list` :
							"To do list"
						}
					</Typography>
					<IconButton onClick={toggleTheme}>
						{isLight ? (
							<MoonIcon className={classes.icon} />
						) : (
							<SunIcon className={classes.icon} />
						)}
					</IconButton>
					<a
						target="_blank"
						rel="noopener noreferrer"
						href="https://github.com/s3rbug/react-todolist"
					>
						<IconButton>
							<GithubIcon className={classes.icon} />
						</IconButton>
					</a>
				</Toolbar>
				{isPageLoading && <LinearProgress className={classes.loader} />}
			</AppBar>
			<HeaderDrawer open={open} />
			<main
				className={classes.content}
				style={{
					marginLeft: "-300px",
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

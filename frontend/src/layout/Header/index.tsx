import { ReactNode, useRef, useState } from "react"
import CssBaseline from "@mui/material/CssBaseline"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import { useTypedSelector } from "../../redux/store"
import { HeaderDrawer } from "./HeaderDrawer"
import { Box, LinearProgress, Menu, MenuItem, Theme } from "@mui/material"
import SunIcon from "@mui/icons-material/Brightness7"
import MoonIcon from "@mui/icons-material/Brightness4"
import { useDispatch } from "react-redux"
import GithubIcon from "@mui/icons-material/GitHub"
import { uiActions } from "../../redux/slices/ui"
import {
	localStorageWrapper,
	LOCAL_STORAGE_KEY,
} from "../../utils/localStorageWrapper"
import { styled } from "@mui/styles"
import LogoutIcon from "@mui/icons-material/Logout"
import { authActions } from "../../redux/slices/auth"
import LanguageIcon from "@mui/icons-material/Language"
import { LOCALS } from "../../redux/types/ui"
import UkrainianFlag from "../../assets/ukraine.svg"
import UnitedKingdomFlag from "../../assets/united-kingdom.svg"
import { useTranslation } from "react-i18next"

const DrawerHeader = styled("div")(({ theme }: { theme: Theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	...theme.mixins.toolbar,
}))

type PropsType = {
	children: ReactNode
}

export const Header = ({ children }: PropsType) => {
	const dispatch = useDispatch()
	const { t, i18n } = useTranslation()
	const [drawerOpened, setDrawerOpened] = useState(false)
	const [langOpened, setLangOpened] = useState(false)
	const langButton = useRef(null)

	const username = useTypedSelector((state) => state.auth.username)
	const isPageLoading = useTypedSelector((state) => state.ui.isPageLoading)
	const isLight = useTypedSelector((state) => state.ui.isLight)
	const token = useTypedSelector((state) => state.auth.token)
	const drawerWidth = 300

	const toggleDrawerOpened = () => {
		setDrawerOpened(!drawerOpened)
	}

	const toggleTheme = () => {
		localStorageWrapper.setLocalStorageItem(LOCAL_STORAGE_KEY.IS_LIGHT, {
			isLight: !isLight,
		})
		dispatch(uiActions.setIsLight({ isLight: !isLight }))
	}

	const handleLangChange = (newLang: LOCALS) => {
		dispatch(uiActions.setLanguage({ lang: newLang }))
		i18n.changeLanguage(newLang)
		setLangOpened(false)
	}

	const toggleLangOpen = () => {
		setLangOpened((prevLangOpen) => !prevLangOpen)
	}

	return (
		<Box
			sx={{
				display: "flex",
			}}
		>
			<CssBaseline />
			<AppBar
				position="fixed"
				sx={{
					zIndex: (theme) => theme.zIndex.drawer + 1,
					backgroundColor: "primary.main",
					transition: (theme) =>
						theme.transitions.create(["margin", "width"], {
							easing: theme.transitions.easing.sharp,
							duration: theme.transitions.duration.leavingScreen,
						}),
				}}
			>
				<Toolbar
					sx={{
						paddingRight: 2,
						paddingLeft: 3,
					}}
				>
					{token && (
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={toggleDrawerOpened}
							edge="start"
							sx={{
								marginRight: 2,
								color: "white",
								"&:disabled": {
									color: "#D3D3D3",
								},
								transition: "color .5s",
							}}
							disabled={isPageLoading}
						>
							<MenuIcon />
						</IconButton>
					)}

					<Typography variant="h6" noWrap sx={{ flexGrow: 1, color: "white" }}>
						{username
							? t("header.title-username", { username })
							: t("header.title")}
					</Typography>
					<div>
						<IconButton onClick={toggleLangOpen} ref={langButton}>
							<LanguageIcon sx={{ color: "white" }} />
						</IconButton>
						<Menu
							open={langOpened}
							anchorEl={langButton.current || null}
							onClose={() => setLangOpened(false)}
						>
							<MenuItem
								onClick={() => handleLangChange(LOCALS.EN)}
								sx={{ width: "140px" }}
							>
								<Box
									component={"img"}
									src={UnitedKingdomFlag}
									sx={{ maxHeight: "20px", mr: 1 }}
								/>
								English
							</MenuItem>
							<MenuItem onClick={() => handleLangChange(LOCALS.UA)}>
								<Box
									component={"img"}
									src={UkrainianFlag}
									sx={{ maxHeight: "20px", mr: 1 }}
								/>
								Ukrainian
							</MenuItem>
						</Menu>
					</div>
					<IconButton onClick={toggleTheme}>
						{isLight ? (
							<MoonIcon sx={{ color: "white" }} />
						) : (
							<SunIcon sx={{ color: "white" }} />
						)}
					</IconButton>
					<a
						target="_blank"
						rel="noopener noreferrer"
						href="https://github.com/s3rbug/react-todolist"
					>
						<IconButton>
							<GithubIcon sx={{ color: "white" }} />
						</IconButton>
					</a>
					{token && (
						<IconButton
							onClick={() => {
								localStorageWrapper.setLocalStorageItem(
									LOCAL_STORAGE_KEY.ACCESS_TOKEN,
									{}
								)
								dispatch(authActions.resetUser())
							}}
						>
							<LogoutIcon sx={{ color: "white" }} />
						</IconButton>
					)}
				</Toolbar>
				{isPageLoading && (
					<LinearProgress
						sx={{
							background: "primary",
							"& > *": {
								background: "grey",
							},
						}}
					/>
				)}
			</AppBar>
			<HeaderDrawer
				drawerWidth={drawerWidth}
				open={drawerOpened}
				setOpen={setDrawerOpened}
			/>
			<Box
				sx={{
					flexGrow: 1,
					transition: (theme) =>
						theme.transitions.create("margin", {
							easing: theme.transitions.easing.sharp,
							duration: theme.transitions.duration.leavingScreen,
						}),
				}}
			>
				<DrawerHeader />
				{children}
			</Box>
		</Box>
	)
}

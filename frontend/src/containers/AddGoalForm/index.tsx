import { useState, useRef } from "react"
import { IconButton, Box } from "@mui/material"
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"
import { TaskFormDataType } from "../../types/index_d"
import { useForm } from "react-hook-form"
import { addGoal } from "../../redux/middleware/goal"
import { useTypedDispatch } from "../../redux/store"
import { makeStyles } from "@mui/styles"
import { BorderlessInput } from "../../components"
import { useTranslation } from "react-i18next"

type PropsType = {
	folderId: string
}

const useStyles = makeStyles(() => ({
	arrow: {
		animation: "$arrowAnimation 750ms ease-in-out",
	},
	"@keyframes arrowAnimation": {
		"40%": {
			transform: "translateY(-15px)",
			opacity: 0.5,
		},
		"40.01%": {
			opacity: 0,
		},
		"45%": {
			transform: "translateY(15px)",
		},
		"80%": {
			transform: "translateY(-5px)",
		},
		"90%": {
			transform: "translateY(5px)",
		},
		"100%": {
			transform: "translateY(0)",
			opacity: 1,
		},
	},
}))

export const AddGoalForm = ({ folderId }: PropsType) => {
	const dispatch = useTypedDispatch()
	const { t } = useTranslation()
	const classes = useStyles()
	const textField = useRef<null | HTMLInputElement>(null)
	const [arrowAnimation, setArrowAnimation] = useState<boolean>(false)
	const [focused, setFocused] = useState(false)

	const handleOffFocus = () => {
		setFocused(false)
	}

	const toggleArrowAnimation = () => {
		setArrowAnimation((oldArrowAnimation) => !oldArrowAnimation)
	}

	const onSubmit = (data: TaskFormDataType) => {
		dispatch(addGoal({ folderId, text: data.goalText }))
		textField.current?.focus()
		setValue("goalText", "")
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<TaskFormDataType>()
	return (
		<Box
			component={"form"}
			key={folderId}
			onSubmit={handleSubmit(onSubmit)}
			sx={{
				width: "100%",
				height: "100%",
				display: "flex",
				borderTop: (theme) => `2px solid ${theme.palette.primary.main}`,
				flexDirection: "row",
				padding: 1.25,
				pt: 1.75,
			}}
		>
			<Box
				sx={{
					marginRight: 1,
					flexGrow: 1,
					border: "1px solid darkgrey",
					borderRadius: 5,
					px: 1,
					height: 40,
					borderColor: !!errors.goalText
						? "secondary.main"
						: focused
						? "primary.main"
						: "darkgrey",
					borderWidth: !!errors.goalText || focused ? 2 : 1,
				}}
			>
				<Box
					{...register("goalText", {
						required: {
							value: true,
							message: t("form.required", { name: "Goal text" }),
						},
					})}
					component={BorderlessInput}
					placeholder={t("folder.add-goal")}
					sx={{
						backgroundColor: "transparent",
						width: "100%",
						height: "100%",
						fontSize: "1rem",
						color: "text.primary",
					}}
					onFocus={() => setFocused(true)}
					onBlur={handleOffFocus}
				/>
			</Box>
			<IconButton
				sx={{
					border: focused ? "none" : "1px solid darkgrey",
					height: 40,
					width: 40,
					padding: 2,
					"&:hover, &:active": {
						backgroundColor: "primary.main",
						border: "none",
					},
					"&:hover *, &:active *": {
						color: "white",
					},
					transition: "all .4s",
					backgroundColor: focused ? "primary.main" : "none",
					"& svg": {
						color: focused ? "white" : "primary.main",
					},
				}}
				onClick={toggleArrowAnimation}
				color="primary"
				type="submit"
			>
				<ArrowUpwardIcon
					onAnimationEnd={toggleArrowAnimation}
					className={arrowAnimation ? classes.arrow : ""}
					sx={{ alignSelf: "center" }}
				/>
			</IconButton>
		</Box>
	)
}

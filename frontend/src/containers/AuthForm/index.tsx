import { Box, Button, Card, TextField, Typography } from "@mui/material"
import { useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { NavLink, Navigate } from "react-router-dom"
import { useTypedSelector } from "../../redux/store"
import { uiActions } from "../../redux/slices/ui"
import { AuthFormType } from "../../redux/types/auth"
import { useTranslation } from "react-i18next"

type PropsType = {
	title: string
	passwordConfirmation?: boolean
	linkText: string
	link: string
	buttonText: string
	onSubmit: (data: AuthFormType) => void
}

export const AuthForm = ({
	title,
	passwordConfirmation,
	onSubmit,
	linkText,
	buttonText,
	link,
}: PropsType) => {
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const token = useTypedSelector((state) => state.auth.token)

	const { usernameError, passwordError } = useTypedSelector((state) => state.ui)

	const {
		watch,
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<AuthFormType>()

	const clearAuthErrors = (): void => {
		dispatch(uiActions.clearAuthErrors())
	}

	const submitHandler: SubmitHandler<AuthFormType> = (data: AuthFormType) => {
		clearAuthErrors()
		onSubmit(data)
	}

	const validationObject = (
		name: string,
		minLength: number,
		maxLength: number
	) => {
		return {
			required: { value: true, message: t("form.required", { name }) },
			minLength: {
				value: minLength,
				message: t("form.min-length", { name, minLength }),
			},
			maxLength: {
				value: maxLength,
				message: t("form.max-length", { name, maxLength }),
			},
		}
	}

	useEffect(() => {
		dispatch(uiActions.setIsLoading({ isLoading: false }))
	})

	useEffect(() => {
		if (usernameError) {
			setError("username", { message: usernameError })
		}
		if (passwordError) {
			setError("password", { message: passwordError })
		}
	}, [usernameError, passwordError, setError])

	if (token) {
		return <Navigate to={"/react-todolist"} replace />
	}

	return (
		<Box
			component={"form"}
			sx={{
				display: "flex",
				justifyContent: "center",
			}}
			onSubmit={handleSubmit(submitHandler)}
		>
			<Card
				sx={{
					display: "inline-flex",
					alignItems: "flex-start",
					flexDirection: "column",
					boxShadow: 6,
					marginTop: 2,
					backgroundColor: "background.paper",
					borderRadius: 3,
					padding: 4,
					paddingTop: 2,
					paddingBottom: 1.5,
				}}
			>
				<Typography sx={{ alignSelf: "center" }} align="center" variant="h4">
					{title}
				</Typography>
				<TextField
					error={!!errors.username}
					helperText={errors.username?.message}
					{...register("username", validationObject(t("auth.username"), 6, 20))}
					sx={{
						marginTop: 2.5,
						width: "100%",
					}}
					label={t("auth.username")}
				/>
				<TextField
					error={!!errors.password}
					helperText={errors.password?.message}
					{...register("password", validationObject(t("auth.password"), 6, 20))}
					sx={{
						marginTop: 2,
						width: "100%",
					}}
					label={t("auth.password")}
					type="password"
				/>
				{passwordConfirmation && (
					<TextField
						error={!!errors.cpassword}
						helperText={errors?.cpassword?.message}
						{...register("cpassword", {
							required: {
								value: true,
								message: t("register.password-confirmation-required"),
							},
							validate: (cpassword: string | undefined) => {
								if (cpassword && watch("password") !== cpassword) {
									return t("register.password-match-error")
								}
							},
						})}
						sx={{
							marginTop: 2,
							width: "100%",
						}}
						label={t("register.confirm-password")}
						type="password"
					/>
				)}
				<Box
					sx={{
						marginTop: 3,
						display: "flex",
						justifyContent: "space-between",
						width: "100%",
						gap: 2,
					}}
				>
					<Box
						sx={{
							padding: 0,
							"& a": {
								color: "primary.main",
							},
							"& a:hover": {
								color: "primary.light",
							},
							mr: 4,
							display: "flex",
							alignItems: "center",
						}}
						color="primary"
						onClick={clearAuthErrors}
					>
						<NavLink to={link}>{linkText}</NavLink>
					</Box>
					<Button type="submit" color="primary" variant="contained">
						{buttonText}
					</Button>
				</Box>
			</Card>
		</Box>
	)
}

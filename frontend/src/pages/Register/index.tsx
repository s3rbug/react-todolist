import { register } from "../../redux/middleware/auth"
import { useTypedDispatch } from "../../redux/store"
import { AuthFormType } from "../../redux/types/auth"
import { AuthForm } from "../../containers"
import { useTranslation } from "react-i18next"

export const Register = () => {
	const dispatch = useTypedDispatch()
	const { t } = useTranslation()
	const registerSubmit = (data: AuthFormType): void => {
		dispatch(register({ username: data.username, password: data.password }))
	}
	return (
		<AuthForm
			title={t("register.title")}
			onSubmit={registerSubmit}
			linkText={t("register.sign-in")}
			link="/react-todolist/login"
			buttonText={t("register.submit")}
			passwordConfirmation
		/>
	)
}

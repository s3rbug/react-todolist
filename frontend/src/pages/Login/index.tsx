import { AuthFormType } from "../../redux/types/auth"
import { AuthForm } from "../../containers"
import { login } from "../../redux/middleware/auth"
import { useTypedDispatch } from "../../redux/store"
import { useTranslation } from "react-i18next"

export const Login = () => {
	const dispatch = useTypedDispatch()
	const { t } = useTranslation()
	const loginSubmit = (data: AuthFormType): void => {
		dispatch(login({ username: data.username, password: data.password }))
	}
	return (
		<AuthForm
			title={t("login.title")}
			onSubmit={loginSubmit}
			linkText={t("login.create-account")}
			link="/react-todolist/register"
			buttonText={t("login.submit")}
		/>
	)
}

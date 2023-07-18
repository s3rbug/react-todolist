import { AuthFormType } from "../../types/index_d"
import { AuthForm } from "../../containers"
import { login } from "../../redux/middleware/auth"
import { useTypedDispatch } from "../../redux/store"

export const Login = () => {
	const dispatch = useTypedDispatch()
	const loginSubmit = (data: AuthFormType): void => {
		dispatch(login({ username: data.username, password: data.password }))
	}
	return (
		<AuthForm
			title="Sign in"
			onSubmit={loginSubmit}
			linkText="Create account"
			link="/react-todolist/register"
			buttonText="Login"
		/>
	)
}

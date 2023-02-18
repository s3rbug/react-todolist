import { AuthFormType } from "../../types/index_d"
import { AuthContainer } from "../../containers"
import { login } from "../../redux/middleware/auth"
import { useTypedDispatch } from "../../redux/reduxStore"

export const Login = () => {
	const dispatch = useTypedDispatch()
	const loginSubmit = (data: AuthFormType): void => {
		dispatch(login({ username: data.username, password: data.password }))
	}
	return (
		<AuthContainer
			title="Sign in"
			onSubmit={loginSubmit}
			linkText="Create account"
			link="/react-todolist/register"
			buttonText="Next"
		/>
	)
}

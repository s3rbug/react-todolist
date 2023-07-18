import { register } from "../../redux/middleware/auth"
import { useTypedDispatch } from "../../redux/store"
import { AuthFormType } from "../../types/index_d"
import { AuthForm } from "../../containers"

export const Register = () => {
	const dispatch = useTypedDispatch()
	const registerSubmit = (data: AuthFormType): void => {
		dispatch(register({ username: data.username, password: data.password }))
	}
	return (
		<AuthForm
			title="Create account"
			onSubmit={registerSubmit}
			linkText="Sign in"
			link="/react-todolist/login"
			buttonText="Register"
			passwordConfirmation
		/>
	)
}

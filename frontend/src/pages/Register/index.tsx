import { register } from "../../redux/middleware/auth"
import { useTypedDispatch } from "../../redux/reduxStore"
import { AuthFormType } from "../../types/index_d"
import { AuthContainer } from "../../containers"

export const Register = () => {
	const dispatch = useTypedDispatch()
	const registerSubmit = (data: AuthFormType): void => {
		dispatch(register({ username: data.username, password: data.password }))
	}
	return (
		<AuthContainer
			title="Create account"
			onSubmit={registerSubmit}
			linkText="Sign in"
			link="/react-todolist/login"
			buttonText="Next"
			passwordConfirmation
		/>
	)
}

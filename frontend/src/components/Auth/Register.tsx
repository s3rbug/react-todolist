import { register } from '../../redux/middleware/auth';
import { useTypedDispatch } from '../../redux/reduxStore';
import { AuthFormType } from '../../types/index_d';
import AuthComponent from './AuthComponent';

const Register = () => {
    const dispatch = useTypedDispatch()
    const registerSubmit = (data: AuthFormType) => {
        dispatch(register(data.username, data.password))
    }
    return (
        <AuthComponent 
            title="Create account"
            onSubmit={registerSubmit} 
            linkText="Sign in" 
            link="/react-todolist/login" 
            buttonText="Next"
            passwordConfirmation
        />
    )
}

export default Register
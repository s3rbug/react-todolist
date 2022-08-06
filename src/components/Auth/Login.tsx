import React from 'react'
import { AuthFormType } from '../../types/index_d';
import AuthComponent from './AuthComponent';
import { login } from '../../redux/middleware/auth';
import { useTypedDispatch } from '../../redux/reduxStore';

const Login = () => {
    const dispatch = useTypedDispatch()
    const loginSubmit = (data: AuthFormType) => {
        dispatch(login(data.username, data.password))
    }
    return (
        <AuthComponent 
            title="Sign in"
            onSubmit={loginSubmit} 
            linkText="Create account" 
            link="/react-todolist/register" 
            buttonText="Next"
        />
    )
}

export default Login
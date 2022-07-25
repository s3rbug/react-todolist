import React from 'react'
import AuthComponent from './AuthComponent';

const Login = () => {
    return (
        <AuthComponent 
            title="Sign in"
            onSubmit={() => {}} 
            linkText="Create account" 
            link="/react-todolist/register" 
            buttonText="Next"
        />
    )
}

export default Login
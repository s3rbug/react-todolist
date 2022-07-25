import React from 'react'
import AuthComponent from './AuthComponent';

const Register = () => {
    return (
        <AuthComponent 
            title="Create account"
            onSubmit={() => {}} 
            linkText="Sign in" 
            link="/react-todolist/login" 
            buttonText="Next"
            passwordConfirmation
            />
    )
}

export default Register
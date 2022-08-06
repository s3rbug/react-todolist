import { Button, Card, TextField, Typography } from '@material-ui/core';
import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { NavLink, Navigate } from 'react-router-dom';
import { useTypedSelector } from '../../redux/reduxStore';
import { uiActions } from '../../redux/slices/ui';
import { AuthFormType } from '../../types/index_d';
import {useStyles} from './AuthComponentStyles'

type AuthComponentPropsType = {
    title: string;
    passwordConfirmation?: boolean;
    linkText: string;
    link: string;
    buttonText: string;
    onSubmit: (data: AuthFormType) => void;
}

const AuthComponent = ({title, passwordConfirmation, onSubmit, linkText, buttonText, link}: AuthComponentPropsType) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const token = useTypedSelector(state => state.auth.token)
    
    const submitHandler: SubmitHandler<AuthFormType> = (data: AuthFormType) => {
        onSubmit(data)
    }

    const validationObject = (name: string, minLength: number, maxLength: number) => {
        return {
            required: {value: true, message: `${name} is required`},
            minLength: {value: minLength, message: `${name} minimum length is ${minLength} symbols`},
            maxLength: {value: maxLength, message: `${name} maximum length is ${maxLength} symbols`}
        }
    }

    useEffect(() => {
        dispatch(uiActions.setIsLoading({isLoading: false}))
    })

    const {watch, register, handleSubmit, formState: { errors }} = useForm<AuthFormType>()

    if(token){
        return <Navigate to={"/react-todolist"} replace/>
    }

    return (
    <form className={classes.root} onSubmit={handleSubmit(submitHandler)}>
        <Card className={classes.card}>
            <Typography className={classes.title} align="center" variant="h4">
                {title}  
			</Typography>
            <TextField
                error={!!errors.username}
                helperText={errors.username?.message}
                {...register("username", 
                    validationObject("Username", 6, 20)
                    )}
                className={classes.textField} 
                label="Username"
                />
            <TextField 
                error={!!errors.password}
                helperText={errors.password?.message}
                {...register("password",
                    validationObject("Password", 6, 20)
                    )} 
                className={classes.textField} 
                label='Password' 
                type="password"
                />
            {passwordConfirmation && 
            <TextField
                error={!!errors.cpassword}
                helperText={errors?.cpassword?.message}
                {...register("cpassword", {
                    required: {value: true, message: "Password confirmation is required"},
                    validate: (cpassword: string | undefined) => {
                        if(cpassword && watch('password') !== cpassword){
                            return "Passwords do not match"
                        }
                    }
                })} 
                className={classes.textField} 
                label='Confirm password' 
                type="password"
                />
            }
            <div className={classes.confirmDiv}>
                <Button className={classes.register} color="primary" variant='text'>
                    <NavLink className={classes.link} to={link}>{linkText}</NavLink>
                </Button>
                <Button type="submit" color="primary" className={classes.button} variant="contained">
                    {buttonText}
                </Button>
            </div>
        </Card>
    </form>
    )
}

export default AuthComponent
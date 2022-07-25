import { Button, Card, TextField, Typography } from '@material-ui/core';
import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setIsLoadingAction } from '../../redux/actions/ui';
import {useStyles} from './AuthComponentStyles'

type AuthComponentPropsType = {
    title: string;
    passwordConfirmation?: boolean;
    linkText: string;
    link: string;
    buttonText: string;
    onSubmit: () => void;
}

const AuthComponent = ({title, passwordConfirmation, onSubmit, linkText, buttonText, link}: AuthComponentPropsType) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    
    type AuthFormType = {
        username: string;
        password: string;
        cpassword?: string;
    }
    
    useEffect(() => {
        dispatch(setIsLoadingAction(false))
    })

    const test: SubmitHandler<AuthFormType> = (data: AuthFormType) => {
        console.log(data);
    }

    const {watch, register, handleSubmit, formState: { errors }} = useForm<AuthFormType>()

    const validationObject = (name: string, minLength: number, maxLength: number) => {
        return {
            required: {value: true, message: `${name} is required`},
            minLength: {value: minLength, message: `${name} minimum length is ${minLength} symbols`},
            maxLength: {value: maxLength, message: `${name} maximum length is ${maxLength} symbols`}
        }
    }
    return (
    <form className={classes.root} onSubmit={handleSubmit(test)}>
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
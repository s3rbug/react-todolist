import { Box, Button, Card, TextField, Typography } from '@mui/material';
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { NavLink, Navigate } from 'react-router-dom';
import { useTypedSelector } from '../../redux/reduxStore';
import { uiActions } from '../../redux/slices/ui';
import { AuthFormType } from '../../types/index_d';

type AuthComponentPropsType = {
    title: string;
    passwordConfirmation?: boolean;
    linkText: string;
    link: string;
    buttonText: string;
    onSubmit: (data: AuthFormType) => void;
}

const AuthComponent = ({title, passwordConfirmation, onSubmit, linkText, buttonText, link}: AuthComponentPropsType) => {

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
        <Box 
            component={'form'} 
            sx={{
                display: "flex",
                justifyContent: "center"
            }} 
            onSubmit={handleSubmit(submitHandler)}
        >
            <Card sx={{
                display: "inline-flex",
                alignItems: "flex-start",
                flexDirection: "column",
                boxShadow: 6,
                marginTop: 2,
                backgroundColor: "background.paper",
                borderRadius: 3,
                padding: 4,
                paddingTop: 2,
                paddingBottom: 1.5
            }}>
                <Typography sx={{alignSelf: "center"}} align="center" variant="h4">
                    {title}  
                </Typography>
                <TextField
                    error={!!errors.username}
                    helperText={errors.username?.message}
                    {...register("username", 
                        validationObject("Username", 6, 20)
                        )}
                    sx={{
                        marginTop: 2.5,
                        width: "100%",
                    }}
                    label="Username"
                    />
                <TextField 
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    {...register("password",
                        validationObject("Password", 6, 20)
                        )} 
                    sx={{
                        marginTop: 2,
                        width: "100%",
                    }}
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
                    sx={{
                        marginTop: 2,
                        width: "100%"
                    }} 
                    label='Confirm password' 
                    type="password"
                    />
                }
                <Box sx={{
                    marginTop: 3,
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    gap: 2
                }}>
                    <Box 
                        sx={{
                            padding: 0,
                            "& a": {
                                color: "primary.main",
                            },
                            "& a:hover": {
                                color: "primary.light",
                            },
                            mr: 4,
                            display: "flex",
                            alignItems: "center"
                        }} 
                        color="primary" 
                    >
                        <NavLink to={link}>{linkText}</NavLink>
                    </Box>
                    <Button type="submit" color="primary" variant="contained">
                        {buttonText}
                    </Button>
                </Box>
            </Card>
        </Box>
    );
}

export default AuthComponent
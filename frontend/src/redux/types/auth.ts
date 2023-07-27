export type AuthStateType = {
	token: null | string
	username: null | string
}

export type AuthFormType = {
	username: string
	password: string
	cpassword?: string
}

export type LoginResponseType = {
	accessToken: string
	username: string
	expiresIn: string
	message?: string
}

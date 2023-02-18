import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AuthStateType } from "../../types/index_d"

const initialState: AuthStateType = {
	token: null,
	username: null,
}

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		resetUser: (state) => {
			state.token = null
			state.username = null
		},
		setUser: (
			state,
			action: PayloadAction<{ token: string; username: string }>
		) => {
			const { token, username } = action.payload
			state.token = token
			state.username = username
		},
	},
})

export const authActions = authSlice.actions

export const authReducer = authSlice.reducer

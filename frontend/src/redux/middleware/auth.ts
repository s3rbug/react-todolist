import { setApiHeader } from './../../api/api';
import { authActions } from './../slices/auth';
import { authApi } from './../../api/authApi';
import { localStorageWrapper, LOCAL_STORAGE_KEY } from '../../localStorage/localStorageWrapper';
import { AppThunkType } from '../reduxStore';

export const login = (
    username: string, 
    password: string
): AppThunkType => async (dispatch) => {
    return authApi.login({username, password}).then(response => {
        if(response.status === 201){            
            const {username, accessToken} = response.data
            dispatch(authActions.setUser({token: accessToken, username}))
            setApiHeader(accessToken)
            localStorageWrapper.setLocalStorageItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, {username, accessToken})
        }
        else{
            // TODO ERROR HANDLER
        }
    })
}

export const register = (
    username: string,
    password: string
): AppThunkType => async (dispatch) => {
    return authApi.register({username, password}).then(response => {
        if(response.status === 201){
            const {username, accessToken} = response.data
            dispatch(authActions.setUser({token: accessToken, username}))
            setApiHeader(accessToken)
            localStorageWrapper.setLocalStorageItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, {username, accessToken})
        }
    })
}
import { setApiHeader } from './../../api/api';
import { authActions } from './../slices/auth';
import { authApi } from './../../api/authApi';
import { LoginResponseType } from './../../types/index_d';
import { localStorageWrapper } from '../../localStorage/localStorageWrapper';
import { AppThunkType } from '../reduxStore';

export const login = (
    username: string, 
    password: string
): AppThunkType<Promise<void>> => async (dispatch) => {
    return authApi.login({username, password}).then(response => {
        if(response.status === 201){            
            const {username, accessToken}: LoginResponseType = response.data
            dispatch(authActions.setUser({token: accessToken, username}))
            setApiHeader(accessToken)
            localStorageWrapper.setLocalStorageItem("token", {username, accessToken})
        }
        else{
            // TODO ERROR HANDLER
        }
    })
}
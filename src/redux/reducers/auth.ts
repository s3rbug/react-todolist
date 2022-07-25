import { AuthStateType } from './../../types/index_d';
import { ActionType } from "typesafe-actions";
import * as actions from "../actions/auth";
import * as constants from "./../constants/auth";

const initialState = {
	token: null
} as AuthStateType;

export type AuthActionType = ActionType<typeof actions>

const reducer = (state = initialState, action: AuthActionType) => {
    switch(action.type){
        case constants.SET_TOKEN: {
            const {token} = action.payload
            return {
                ...state,
                token: token
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}

export default reducer
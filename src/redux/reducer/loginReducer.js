import { LOGIN_SUCCESS, LOGIN_PENDING, LOGIN_FAILED } from '../actionTypes';

const initialState = {
    isLoading: false,
    errorMessage: ''
}

export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return { ...state, isLoading: false }
        case LOGIN_PENDING:
            return { ...state, isLoading: true }
        case LOGIN_FAILED:
            return { ...state, isLoading: false, errorMessage: action.payload.errorMessage }
        default:
            return state
    }
}

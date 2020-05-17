import { USERDATA_SUCCESS, USERDATA_PENDING, USERDATA_FAILED } from '../actionTypes';

const initialState = {
    isLoading: false,
    userList: [],
    errorMessage: ''
}

export default function homeReducer(state = initialState, action) {
    switch (action.type) {
        case USERDATA_SUCCESS:
            return { ...state, isLoading: false, userList: action.payload }
        case USERDATA_PENDING:
            return { ...state, isLoading: true }
        case USERDATA_FAILED:
            return { ...state, isLoading: false, errorMessage: action.payload.errorMessage }
        default:
            return state
    }
}

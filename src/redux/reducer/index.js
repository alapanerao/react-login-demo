import { combineReducers } from 'redux'

import loginReducer from './loginReducer'
import homeReducer from './homeReducer'

const rootReducer = combineReducers({
    loginReducer,
    homeReducer
})

export default rootReducer
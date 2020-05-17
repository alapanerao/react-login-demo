import { LOGIN_SUCCESS, LOGIN_PENDING, LOGIN_FAILED, USERDATA_SUCCESS, USERDATA_PENDING, USERDATA_FAILED } from './actionTypes'

const INVALID_CREDENTIALS = 'Invalid username password'
const TRY_AGAIN = 'Unable to get data. Please try again later.'

export const loginPending = () => ({ type: LOGIN_PENDING })
export const loginFailed = (errorMessage) => ({
    type: LOGIN_FAILED,
    payload: {
        errorMessage: errorMessage
    }
})
export const loginSuccess = (data) => ({
    type: LOGIN_SUCCESS,
    payload: data
})

export function performLogin(accountId, password) {
    return async dispatch => {
        dispatch(loginPending())
        let resultStatus = 0;
        fetch("https://apertum-interview.herokuapp.com/api/user/login", {
            method: 'post',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "accountId": accountId,
                "pswd": password
            })
        }).then((response) => {
            resultStatus = response.status;
            if (response.status === 200) {
                return Promise.resolve(response.json()); // This will end up in SUCCESS part
            }
            return Promise.resolve(response.json()).then((responseInJson) => { // This will end up in ERROR part
                return Promise.reject(responseInJson.message);
            });
        })
            .then((result) => {
                console.log("Success: ", result);
                if (result.error_message) {
                    dispatch(loginFailed(result.error_message))
                } else {
                    localStorage.setItem('userToken', result.token);
                    window.location.href = '/home'
                }
            }, (error) => {
                console.log("Error: ", error);
                if (resultStatus === 403) {
                    dispatch(loginFailed(INVALID_CREDENTIALS))
                }
            })
            .catch(catchError => {
                console.log("Catch: ", catchError);
            })
    }
}


export const userDataPending = () => ({ type: USERDATA_PENDING })
export const userDataFailed = (errorMessage) => ({
    type: USERDATA_FAILED,
    payload: {
        errorMessage: TRY_AGAIN
    }
})
export const userDataSuccess = (data) => ({
    type: USERDATA_SUCCESS,
    payload: data
})

export function getUserList() {
    return async dispatch => {
        dispatch(userDataPending())
        let resultStatus = 0;
        const token = 'Bearer ' + localStorage.getItem('userToken');
        fetch("https://apertum-interview.herokuapp.com/api/users", {
            method: 'get',
            headers: {
                "Accept": "application/json",
                "Authorization": token,
            },
        }).then((response) => {
            resultStatus = response.status;
            if (response.status === 200) {
                return Promise.resolve(response.json()); // This will end up in SUCCESS part
            }
            return Promise.resolve(response.json()).then((responseInJson) => { // This will end up in ERROR part
                return Promise.reject(responseInJson.message);
            });
        })
            .then((result) => {
                if (result.error_message) {
                    dispatch(userDataFailed())
                } else {
                    console.log(result)
                    dispatch(userDataSuccess(result))
                }
            }, (error) => {
                if (resultStatus === 403) {
                    dispatch(userDataFailed())
                }
            })
            .catch(catchError => {
                console.log("Catch: ", catchError);
            })
    }
}

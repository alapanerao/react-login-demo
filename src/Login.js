import React from 'react';
import './App.css';
import MoonLoader from "react-spinners/MoonLoader";

// message: "You got the token!"
// token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7fSwiZXhwIjoxNTg5NjI2NzI1LCJpYXQiOjE1ODk2MjU4MjV9.4KJKErmIFu2F7VVUoGA5PROYrXZCoAGMBVrMuGF9o-g"


// error_message: "user dosent exist"


function Login() {

    const [accountId, setAccountID] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const [accountIdError, setAccountIDError] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');
    const [responseError, setResponseError] = React.useState('');

    const handleChange = (event) => {
        setResponseError('');
        event.preventDefault();
        const { name, value } = event.target;

        switch (name) {
            case 'accountID':
                if (value.length === 0) {
                    setAccountIDError('Please enter account ID');
                } else {
                    setAccountIDError('');
                }
                setAccountID(value);
                break;
            case 'password':
                if (value.length === 0) {
                    setPasswordError('Please enter password');
                } else if (value.length < 6) {
                    setPasswordError('Minimum password length is 6 digits');
                } else {
                    setPasswordError('');
                }
                setPassword(value)
                break;
            default:
                break;
        }
    }

    const callAPI = () => {
        if (accountId.length !== 0 && password.length !== 0) {
            setResponseError('');
            console.log("callAPI")
            let resultStatus = 0
            setLoading(true);
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
                    setLoading(false);
                    if (result.error_message) {
                        setResponseError(result.error_message);
                    } else {
                        window.location.href = '/home'
                    }
                }, (error) => {
                    console.log("Error: ", error);
                    setLoading(false);
                    if (resultStatus === 403) {
                        setResponseError('Invalid username password')
                    }
                })
                .catch(catchError => {
                    console.log("Catch: ", catchError);
                })
        } else {
            setResponseError('Please enter account ID and password.')
        }
    }
    return (
        <div className="App">
            <header className="App-header">
                {loading && <div className="loading">
                    <MoonLoader
                        size={60}
                        loading
                    />
                </div>}
                <div className="box">
                    <label>Account ID</label>
                    <input name="accountID" placeholder="Please enter account ID" value={accountId} onChange={(event) => handleChange(event)} />
                    {accountIdError.length > 0 &&
                        <label className='error'>{accountIdError}</label>}
                    <label>Password</label>
                    <input name="password" placeholder="Please enter password" type="password" value={password} onChange={(event) => handleChange(event)} />
                    {passwordError.length > 0 &&
                        <label className='error'>{passwordError}</label>}
                    <button onClick={() => callAPI()}>Click</button>
                    {responseError.length > 0 &&
                        <label className='error'>{responseError}</label>}
                </div>
            </header>
        </div>
    );
}

export default Login;

import React from 'react';
import './App.css';
import MoonLoader from "react-spinners/MoonLoader";
import { connect } from 'react-redux'
import { performLogin } from './redux/actions'

const Login = ({ dispatch, isLoading, token, errorMessage }) => {

    const [accountId, setAccountID] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [accountIdError, setAccountIDError] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');
    const [responseError, setResponseError] = React.useState('');

    React.useEffect(() => {
        setResponseError(errorMessage)
    }, [errorMessage])

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
                } else {
                    setPasswordError('');
                }
                setPassword(value)
                break;
            default:
                break;
        }
    }

    const validateForm = () => {
        if (accountId.length === 0 && password.length === 0) {
            setResponseError('Please enter account ID and password.')
        } else if (accountId.length === 0) {
            setAccountIDError('Please enter account ID');
        } else if (password.length === 0) {
            setPasswordError('Please enter password');
        } else if (password.length < 6) {
            setPasswordError('Minimum password length is 6 digits');
        } else {
            setResponseError('')
            setAccountIDError('');
            setPasswordError('');
            return true
        }
        return false
    }

    const callAPI = () => {
        if (validateForm()) {
            dispatch(performLogin(accountId, password));
        }
    }
    return (
        <div className="App">
            <header className="App-header">
                {isLoading && <div className="loading">
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
                        <label style={{ marginTop: '20px' }} className='error'>{responseError}</label>}
                </div>
            </header>
        </div>
    );
}

const mapStateToProps = state => ({
    isLoading: state.loginReducer.isLoading,
    token: state.loginReducer.token,
    errorMessage: state.loginReducer.errorMessage
})

export default connect(mapStateToProps)(Login);

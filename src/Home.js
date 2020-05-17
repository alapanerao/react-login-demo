import React from 'react';
import './App.css';
import UserCard from './UserCard'
import { connect } from 'react-redux'
import { getUserList } from './redux/actions'
import MoonLoader from "react-spinners/MoonLoader";

const Home = ({ dispatch, isLoading, userList, errorMessage }) => {
    React.useEffect(() => {
        dispatch(getUserList())
    }, [dispatch])

    return (
        <div className="App">
            <header className="App-header">
                {isLoading && <div className="loading">
                    <MoonLoader
                        size={60}
                        loading
                    />
                </div>}
                {userList && userList.map((userData, idx) => <UserCard firstName={userData.firstName} lastName={userData.lastName} age={userData.age} key={idx} />)}
            </header>
        </div>
    );
}

const mapStateToProps = state => ({
    isLoading: state.homeReducer.isLoading,
    userList: state.homeReducer.userList,
    errorMessage: state.homeReducer.errorMessage
})

export default connect(mapStateToProps)(Home);

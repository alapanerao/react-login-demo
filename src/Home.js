import React from 'react';
import './App.css';
import UserCard from './UserCard'

const Home = () => {
    const userList = [
        { "accountId": "anna", "age": 21, "firstName": "Anna", "lastName": "Cheng" },
        { "accountId": "abd", "age": 28, "firstName": "Abd", "lastName": "Cheng" }
    ];
    return (
        <div className="App">
            <header className="App-header">
                {userList.map(userData => <UserCard firstName={userData.firstName} lastName={userData.lastName} age={userData.age} />)}
            </header>
        </div>
    );
}

export default Home;
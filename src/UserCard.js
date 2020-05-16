import React from 'react';
import './App.css';
import PropTypes from 'prop-types';

const UserCard = () => {
    const userList = [
        { "accountId": "anna", "age": 21, "firstName": "Anna", "lastName": "Cheng" },
        { "accountId": "abd", "age": 28, "firstName": "Abd", "lastName": "Cheng" }
    ];
    return (
        <div className="App">
            <header className="App-header">
                <h1>Home</h1>
                <p>Home page body content</p>
            </header>
        </div>
    );
}

UserCard.propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    age: PropTypes.string
}

PropTypes.defaultProps = {

}

export default home;
import React from 'react';
import './App.css';
import PropTypes from 'prop-types';

const UserCard = (props) => {
    const { firstName, lastName, age } = props;
    const fullName = firstName + ' ' + lastName;
    return (
        <div className="user-card">
            <span>{fullName}</span>
            <span>{age}</span>
        </div>
    );
}

UserCard.propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    age: PropTypes.string
}

PropTypes.defaultProps = {
    firstName: '',
    lastName: '',
    age: ''
}

export default UserCard;
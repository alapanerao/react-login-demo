import React from 'react';
import PropTypes from 'prop-types';

const UserCard = (props) => {
    const { firstName, lastName, age } = props;
    const fullName = firstName + ' ' + lastName;
    const userAge = 'age : ' + age;
    return (
        <div className="user-card" key={fullName}>
            <span>{fullName}</span>
            <span>{userAge}</span>
        </div>
    );
}

UserCard.propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    age: PropTypes.number
}

PropTypes.defaultProps = {
    firstName: '',
    lastName: '',
    age: undefined
}

export default UserCard;
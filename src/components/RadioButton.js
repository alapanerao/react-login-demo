import React from 'react';
import PropTypes from 'prop-types';

const RadioButton = (props) => {
    const { checked, radioText, id, onChange } = props;
    return (
        <div style={{ display: 'flex', margin: '0px 10px' }}>
            <input style={{ margin: '0px 0px', height: '40px', width: '40px' }} type="radio" checked={checked} id={id} onChange={onChange} />
            <label style={{ fontSize: '18px', alignSelf: 'center', margin: '0px 0px' }}>{radioText}</label>
        </div >
    );
}

RadioButton.propTypes = {
    checked: PropTypes.bool,
    radioText: PropTypes.string,
    id: PropTypes.string,
    onChange: PropTypes.func
}

PropTypes.defaultProps = {
    checked: false,
    radioText: '',
    id: '',
    onChange: () => { }
}

export default RadioButton;
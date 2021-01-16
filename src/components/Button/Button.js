import React from 'react';
import PropTypes from 'prop-types';
import { ImSpinner6 } from 'react-icons/im';
import s from './Button.module.css';

function Button({ onClickFetch = null, type = 'more'}) {
    if (type === 'hidden') {return <></>}
    if (type === 'more') {
        return <button className={s.button} type="button" onClick={onClickFetch}>Load More</button>;
    }
    if (type === 'spinner') {
        return <ImSpinner6 size="36" className={s.iconSpin} />;
    }
    if (type === 'loading') {
        return (
            <button className={s.button} type="button">
                <span>
                    <ImSpinner6 size="16" className={s.iconSpinBtn} />
                </span>
                <span>Loading...</span>
            </button>)
    }
}

Button.propTypes = {
    onClickFetch: PropTypes.func,
    type: PropTypes.string,
}

export default Button;
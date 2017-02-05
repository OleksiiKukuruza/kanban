import React, { PropTypes } from 'react';

export const ColumnHeader = ({title, removeColumn}) => (
    <div className='column_header'>
        {title}
        <button
            className='button-general fa fa-times column_header__button-remove'
            onClick={removeColumn}
        />
    </div>
);

ColumnHeader.propTypes = {
    title: PropTypes.string.isRequired
};

import React, { PropTypes } from 'react';
import { CardEditor } from './CardEditor';

export const ColumnFooter = ({showEditor, onAddCard, onEditorToggle, columnId}) => {
    const content = showEditor
        ? <CardEditor
            onAddCard={(text) => onAddCard(columnId, text)}
            onEditorToggle={() => onEditorToggle(columnId)}
        />
        : <div className='add-card-button'
               onClick={() => onEditorToggle(columnId)}>
            Add a card...
        </div>;

    return (
        <div className='column_footer'>
            {content}
        </div>
    );
};

ColumnFooter.PropTypes = {
    showEditor: PropTypes.bool.isRequired
};

import './Column.scss';
import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import { ColumnHeader } from './ColumnHeader';
import { CardList } from './CardList';
import { ColumnFooter } from './ColumnFooter';
import { COLUMN } from '../constants/DragTypes';

const columnSource = {
    beginDrag({column}) {
        return {sourceId: column.id};
    }
};

const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
});

@DragSource(COLUMN, columnSource, collect)
export class Column extends Component {
    render() {
        const {column, actions, connectDragSource} = this.props;

        return connectDragSource(
            <div className='column'>
                <ColumnHeader
                    title={column.title}
                    removeColumn={() => actions.removeColumn(column.id)}
                />
                {column.cards && column.cards.length
                    ? <CardList
                        cards={column.cards}
                        columnId={column.id}
                        removeCard={actions.removeCard}
                        insertCard={(sourceCardId, index) => actions.insertCard(column.id, sourceCardId, index)}
                        changeColor={actions.changeColor}
                    /> : ''}
                <ColumnFooter
                    showEditor={column.showEditor}
                    onAddCard={actions.addCard}
                    columnId={column.id}
                    onEditorToggle={actions.toggleCardEditor}
                />
            </div>
        );
    }
}

Column.propTypes = {
    column: PropTypes.object.isRequired
};

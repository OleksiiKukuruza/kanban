import './ColumnContainer.scss';
import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import { COLUMN, CARD } from '../constants/DragTypes';
import { Column } from '../components/Column';

const columnTarget = {
    canDrop(props, monitor) {
        return props.column.id !== monitor.getItem().sourceId;
    },
    drop(props, monitor) {
        const {actions, column} = props;
        const {sourceCardId, sourceColumnId, sourceId} = monitor.getItem();

        switch (monitor.getItemType()) {
            case COLUMN:
                return actions.swapColumns(sourceId, column.id);

            case CARD:
                if (monitor.didDrop()) {
                    return;
                }
                actions.removeCard(sourceColumnId, sourceCardId);
                actions.insertCard(column.id, sourceCardId, column.cards.length);
        }
    }
};

const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    canDrop: monitor.canDrop()
});

@DropTarget([COLUMN, CARD], columnTarget, collect)
export class ColumnContainer extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        column: PropTypes.object.isRequired
    };

    render() {
        const {connectDropTarget, column, actions} = this.props;

        return connectDropTarget(
            <div className='column-container'>
                <Column
                    column={column}
                    actions={actions}
                />
            </div>
        );
    }
}

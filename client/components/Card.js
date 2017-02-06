import './Card.scss';
import React, { Component, PropTypes } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { CARD } from '../constants/DragTypes';
import { GithubPicker } from 'react-color';

const cardSource = {
    beginDrag({card, columnId}) {
        return {
            sourceCardId: card.id,
            sourceColumnId: columnId
        };
    }
};

const collectSource = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
});


const cardTarget = {
    canDrop(props, monitor) {
        return props.card.id !== monitor.getItem().sourceCardId;
    },
    drop(props, monitor) {
        const {insertCard, removeDraggedCard} = props;
        const {sourceCardId, sourceColumnId} = monitor.getItem();
        removeDraggedCard(sourceColumnId, sourceCardId);
        insertCard(sourceCardId);
    }
};

const collectTarget = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    canDrop: monitor.canDrop()
});

@DragSource(CARD, cardSource, collectSource)
@DropTarget(CARD, cardTarget, collectTarget)
export class Card extends Component {
    static propTypes = {
        card: PropTypes.object.isRequired,
        removeCard: PropTypes.func.isRequired,
        removeDraggedCard: PropTypes.func.isRequired,
        changeColor: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {showColorPicker: false};
    }

    toggleColorPicker = () => {
        this.setState({showColorPicker: !this.state.showColorPicker});
    };

    renderColorPicker() {
        const {card, changeColor} = this.props;
        return this.state.showColorPicker && (
                <div className='color-picker'>
                    <div className='cover' onClick={this.toggleColorPicker}/>
                    <GithubPicker
                        color={card.color}
                        onChangeComplete={(color) => changeColor(color.hex)}/>
                </div>
            );
    }

    render() {
        const {card, removeCard, connectDragSource, connectDropTarget} = this.props;
        const style = {
            backgroundColor: card.color
        };
        return connectDragSource(connectDropTarget(
            <div className='card' style={style}>
                {card.title}
                <div className='card__controls'>
                    <button
                        className='button-general fa fa-eyedropper'
                        onClick={this.toggleColorPicker}>
                        {this.renderColorPicker()}
                    </button>
                    <button
                        className='button-general fa fa-times'
                        onClick={removeCard}
                    />
                </div>
            </div>
        ));
    }
}

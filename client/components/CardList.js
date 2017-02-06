import './CardList.scss';
import React, { PropTypes } from 'react';
import { Card } from './Card';

export const CardList = ({cards, columnId, removeCard, insertCard, changeColor}) => (
    <div className='card-list'>
        {cards.map((card, index) => (
            <Card
                key={card.id}
                card={card}
                columnId={columnId}
                changeColor={(color) => changeColor(card.id, color)}
                insertCard={(sourceCardId) => insertCard(sourceCardId, index)}
                removeDraggedCard={removeCard}
                removeCard={() => removeCard(columnId, card.id)}
            />
        ))}
    </div>
);

CardList.propTypes = {
    cards: PropTypes.array.isRequired,
    columnId: PropTypes.string.isRequired,
    removeCard: PropTypes.func.isRequired,
    insertCard: PropTypes.func.isRequired,
    changeColor: PropTypes.func.isRequired
};

import { ADD_COLUMN, ADD_CARD, TOGGLE_CARD_EDITOR, INSERT_CARD, REMOVE_CARD } from '../constants/ActionTypes';

export const column = (state = {}, action) => {
    switch (action.type) {
        case ADD_COLUMN:
            return {
                id: action.payload.columnId,
                title: action.payload.title,
                cards: [],
                showEditor: false
            };

        case ADD_CARD:
            return {
                ...state,
                cards: [...state.cards, action.payload.cardId]
            };

        case INSERT_CARD:
            return {
                ...state,
                cards: [
                    ...state.cards.slice(0, action.payload.cardIndex),
                    action.payload.sourceCardId,
                    ...state.cards.slice(action.payload.cardIndex)
                ]
            };

        case TOGGLE_CARD_EDITOR:
            return {
                ...state,
                showEditor: !state.showEditor
            };

        case REMOVE_CARD:
            return {
                ...state,
                cards: state.cards.filter(cardId => cardId !== action.payload.cardId)
            };

        default:
            return state;
    }
};

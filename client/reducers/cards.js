import { combineReducers } from 'redux';
import { ADD_CARD, CHANGE_CARD_COLOR } from '../constants/ActionTypes';
import { card } from './card';

const byId = (state = {}, action) => {
    switch (action.type) {
        case ADD_CARD:
        case CHANGE_CARD_COLOR:
            return {
                ...state,
                [action.payload.cardId]: card(state[action.payload.cardId], action)
            };

        default:
            return state;
    }
};

const allIds = (state = [], action) => {
    switch (action.type) {
        case ADD_CARD:
            return [...state, action.payload.cardId];
        default:
            return state;
    }
};

export const cards = combineReducers({
    byId,
    allIds
});

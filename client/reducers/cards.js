import { combineReducers } from 'redux';
import { ADD_CARD, CHANGE_CARD_COLOR } from '../constants/ActionTypes';
import { card } from './card';

const initialState = {
    '0': {
        id: '0',
        title: 'FIRST Card',
        color: 'white'
    },
    '1': {
        id: '1',
        title: 'SECOND Card',
        color: 'green'
    },
    '2': {
        id: '2',
        title: 'THIRD Card',
        color: 'black'
    },
    '3': {
        id: '3',
        title: 'FOURTHS Card',
        color: 'red'
    }
};

const byId = (state = initialState, action) => {
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

import { combineReducers } from 'redux';
import {
    ADD_COLUMN,
    ADD_CARD,
    TOGGLE_CARD_EDITOR,
    SWAP_COLUMNS,
    INSERT_CARD,
    REMOVE_CARD,
    REMOVE_COLUMN
} from '../constants/ActionTypes';
import { column } from './column';

const byId = (state = {}, action) => {
    switch (action.type) {
        case ADD_COLUMN:
        case ADD_CARD:
        case TOGGLE_CARD_EDITOR:
        case REMOVE_CARD:
        case INSERT_CARD:
            return {
                ...state,
                [action.payload.columnId]: column(state[action.payload.columnId], action)
            };

        default:
            return state;
    }
};

const allIds = (state = [], action) => {
    switch (action.type) {
        case ADD_COLUMN:
            return [...state, action.payload.columnId];

        case REMOVE_COLUMN:
            return state.filter(columnId => columnId !== action.payload.columnId);

        case SWAP_COLUMNS:
            const sourceIndex = state.indexOf(action.payload.sourceId);
            const targetIndex = state.indexOf(action.payload.targetId);
            const ids = state.slice();
            let tmp = ids[targetIndex];
            ids[targetIndex] = ids[sourceIndex];
            ids[sourceIndex] = tmp;
            return ids;

        default:
            return state;
    }
};

export const columns = combineReducers({
    byId,
    allIds
});

export const getColumns = (state) => {
    return state.columns.allIds.map(columnId => {
        const column = state.columns.byId[columnId];
        return {
            ...column,
            cards: column.cards.map(cardId => state.cards.byId[cardId])
        }
    });
};

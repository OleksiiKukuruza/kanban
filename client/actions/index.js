import shortid from 'shortid';
import * as types from '../constants/ActionTypes';

export const addColumn = title => {
    const columnId = shortid.generate();
    return {
        type: types.ADD_COLUMN,
        payload: {
            title,
            columnId
        }
    };
};

export const addCard = (columnId, title) => {
    const cardId = shortid.generate();
    return {
        type: types.ADD_CARD,
        payload: {
            columnId,
            title,
            cardId
        }
    };
};

export const toggleCardEditor = columnId => {
    return {
        type: types.TOGGLE_CARD_EDITOR,
        payload: {
            columnId
        }
    };
};

export const swapColumns = (sourceId, targetId) => {
    return {
        type: types.SWAP_COLUMNS,
        payload: {
            sourceId,
            targetId
        }
    }
};

export const insertCard = (columnId, sourceCardId, cardIndex) => {
    return {
        type: types.INSERT_CARD,
        payload: {
            columnId,
            sourceCardId,
            cardIndex
        }
    }
};

export const removeCard = (columnId, cardId) => {
    return {
        type: types.REMOVE_CARD,
        payload: {
            columnId,
            cardId
        }
    }
};

export const removeColumn = columnId => {
    return {
        type: types.REMOVE_COLUMN,
        payload: {
            columnId
        }
    }
};

export const changeColor = (cardId, color) => {
    return {
        type: types.CHANGE_CARD_COLOR,
        payload: {
            cardId,
            color
        }
    }
};

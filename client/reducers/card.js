import { ADD_CARD, CHANGE_CARD_COLOR } from '../constants/ActionTypes';
import { DEFAULT_CARD_COLOR } from '../constants/Colors';

export const card = (state, action) => {
    switch (action.type) {
        case ADD_CARD:
            return {
                id: action.payload.cardId,
                title: action.payload.title,
                color: DEFAULT_CARD_COLOR
            };

        case CHANGE_CARD_COLOR:
            return {
                ...state,
                color: action.payload.color
            };

        default:
            return state;
    }
};

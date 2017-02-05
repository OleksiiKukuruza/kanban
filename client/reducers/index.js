import { combineReducers } from 'redux';
import { columns } from './columns';
import { cards } from './cards';

export const rootReducer = combineReducers({
    columns,
    cards
});

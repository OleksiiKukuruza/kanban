import { createStore, compose } from 'redux';
import { rootReducer } from '../reducers';
import { DevTools } from '../containers/DevTools';

const enhancer = compose(
    DevTools.instrument()
);

export const configureStore = (initialState) => {
    const store = createStore(rootReducer, initialState, enhancer);

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const {rootReducer} = require('../reducers');
            store.replaceReducer(rootReducer);
        });
    }

    return store;
};

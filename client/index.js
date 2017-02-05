import './index.scss';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { configureStore } from './store/configureStore';
import { Provider } from 'react-redux';
import { AppConnected } from './containers/App';
import { DevTools } from './containers/DevTools';

const store = configureStore();

const renderWrapper = (Component) => {
    render(
        <AppContainer>
            <Provider store={store}>
                <div>
                    <Component/>
                    <DevTools/>
                </div>
            </Provider>
        </AppContainer>,
        document.getElementById('root')
    );
};

renderWrapper(AppConnected);

if (module.hot) {
    module.hot.accept('./containers/App', () => {
        renderWrapper(AppConnected)
    });
}

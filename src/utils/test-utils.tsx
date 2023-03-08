import { render, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../app/store';
import App from '../App';
import Search from '../features/medias/Search';

export const renderApp = (): RenderResult =>
    render(
        <Provider store={store}>
            <App />
        </Provider>
    );

export const renderSearch = (): RenderResult =>
    render(
        <Provider store={store}>
            <Search />
        </Provider>
    );
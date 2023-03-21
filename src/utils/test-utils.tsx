import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import type { AppStore, RootState } from '../app/store';
import searchReducer from '../features/search/searchSlice';

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: PreloadedState<RootState>
    store?: AppStore
}

export function renderWithProviders(
    ui: React.ReactElement,
    {
        preloadedState,
        // Automatically create a store instance if no store was passed in
        store = configureStore({ reducer: { search: searchReducer }, preloadedState }),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
        return <Provider store={store}>{children}</Provider>
    }
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export const getMockTrack1 = () => {
    return {
        "wrapperType": "audiobook",
        "artistId": 588407912,
        "collectionId": 1640812516,
        "artistName": "Kristen Ethridge",
        "collectionName": "Shelter from the Storm",
        "collectionCensoredName": "Shelter from the Storm",
        "artistViewUrl": "https://artistview1",
        "collectionViewUrl": "https://collectionview1",
        "artworkUrl60": "https://artwork60url1.jpg",
        "artworkUrl100": "https://artwork100url1.jpg",
        "collectionPrice": 0,
        "collectionExplicitness": "notExplicit",
        "trackCount": 1,
        "country": "USA",
        "currency": "USD",
        "releaseDate": "2022-12-14T08:00:00Z",
        "primaryGenreName": "Fiction",
        "previewUrl": "https://preview1.m4a",
        "description": "This is an Apple Books audiobook"
    };
}
export const getMockTrack2 = () => {
    return {
        "wrapperType": "audiobook",
        "artistId": 478033499,
        "collectionId": 1636546592,
        "artistName": "Mona Ingram",
        "collectionName": "Loving From Afar",
        "collectionCensoredName": "Loving From Afar",
        "artistViewUrl": "https://artistview2",
        "collectionViewUrl": "https://collectionview2",
        "artworkUrl60": "https://artwork60url2.jpg",
        "artworkUrl100": "https://artwork100url2.jpg",
        "collectionPrice": 0,
        "collectionExplicitness": "notExplicit",
        "trackCount": 1,
        "country": "USA",
        "currency": "USD",
        "releaseDate": "2022-12-14T08:00:00Z",
        "primaryGenreName": "Romance",
        "previewUrl": "https://preview2.m4a",
        "description": "This is an Apple Books audiobook"
    };
}
export const getMockSearchData = () => {
    return {
        "resultCount": 2,
        "results": [
            getMockTrack1(),
            getMockTrack2()
        ]
    };
};
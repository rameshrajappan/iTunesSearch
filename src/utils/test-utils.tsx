import { render, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../app/store';
import App from '../App';
import Search from '../features/medias/components/Search';

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

export const getMockSearchData = () => {
    return {
        "resultCount": 50,
        "results": [
            {
                "wrapperType": "audiobook",
                "artistId": 588407912,
                "collectionId": 1640812516,
                "artistName": "Kristen Ethridge",
                "collectionName": "Shelter from the Storm",
                "collectionCensoredName": "Shelter from the Storm",
                "artistViewUrl": "https://books.apple.com/us/author/kristen-ethridge/id588407912?uo=4",
                "collectionViewUrl": "https://books.apple.com/us/audiobook/shelter-from-the-storm/id1640812516?uo=4",
                "artworkUrl60": "https://is5-ssl.mzstatic.com/image/thumb/Music112/v4/39/29/10/39291083-72cc-cf54-a62e-9ef1410caaba/yhp3318756182011660549.png/60x60bb.jpg",
                "artworkUrl100": "https://is5-ssl.mzstatic.com/image/thumb/Music112/v4/39/29/10/39291083-72cc-cf54-a62e-9ef1410caaba/yhp3318756182011660549.png/100x100bb.jpg",
                "collectionPrice": 0,
                "collectionExplicitness": "notExplicit",
                "trackCount": 1,
                "country": "USA",
                "currency": "USD",
                "releaseDate": "2022-12-14T08:00:00Z",
                "primaryGenreName": "Fiction",
                "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/ca/e6/d4/cae6d44b-f8a6-537a-5a7b-9ee39f13dfc4/mzaf_4528807733672336723.std.aac.p.m4a",
                "description": "This is an Apple Books audiobook"
            },
            {
                "wrapperType": "audiobook",
                "artistId": 478033499,
                "collectionId": 1636546592,
                "artistName": "Mona Ingram",
                "collectionName": "Loving From Afar",
                "collectionCensoredName": "Loving From Afar",
                "artistViewUrl": "https://books.apple.com/us/author/mona-ingram/id478033499?uo=4",
                "collectionViewUrl": "https://books.apple.com/us/audiobook/loving-from-afar/id1636546592?uo=4",
                "artworkUrl60": "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/a6/3e/41/a63e418c-e66b-b3a6-15bf-3abe66d3a067/mui17552002565391576901.png/60x60bb.jpg",
                "artworkUrl100": "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/a6/3e/41/a63e418c-e66b-b3a6-15bf-3abe66d3a067/mui17552002565391576901.png/100x100bb.jpg",
                "collectionPrice": 0,
                "collectionExplicitness": "notExplicit",
                "trackCount": 1,
                "country": "USA",
                "currency": "USD",
                "releaseDate": "2022-12-14T08:00:00Z",
                "primaryGenreName": "Romance",
                "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/65/dc/9b/65dc9be5-edc1-ceec-03e1-a84b7e9ca2de/mzaf_12451464414129314008.std.aac.p.m4a",
                "description": "This is an Apple Books audiobook"
            }
        ]
    };
};
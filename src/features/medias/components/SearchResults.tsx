import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hook';
import { selectAllMedias, selectActivePageMedias, hasMoreMediasToRender, moveNext } from '../mediasSlice'
import SearchRow from './SearchRow';
import CircularProgress from '@mui/material/CircularProgress';
import { RootState } from '../../../app/store';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';

const EndMessageWrapper = styled.p`
    text-align:center;
`;
const MediaList = styled.ul`
    width: 90%;
    max-width: 1000px;
    margin: 0 auto 30px;
    padding: 0;
`;
const LoadingData = () => (
    <React.Fragment><CircularProgress /><p>Loading medias...</p></React.Fragment>
);
const ZeroResults = () => (
    <p>No Results.</p>
);
const ErrorDisplay = () => (
    <p>Unable to display medias.</p>
);
const InitialDisplay = () => (
    <p>Search for your favourite music</p>
);
export default function SearchResults({ searchTerm }: any) {
    const dispatch: any = useAppDispatch()
    const medias = useAppSelector(selectActivePageMedias);
    const allMedias = useAppSelector(selectAllMedias);
    const mediasStatus = useAppSelector((state: RootState) => state.itunes.status);
    const error = useAppSelector((state: RootState) => state.itunes.error);
    const hasMoreMedias = useAppSelector(hasMoreMediasToRender);
    const fetchNextPage = () => {
        dispatch(moveNext());
    };
    if (mediasStatus === 'loading') {
        return <LoadingData />;
    }
    else if (mediasStatus === 'succeeded') {
        if (allMedias?.length === 0) {
            return <ZeroResults />;
        } else {
            return (
                <MediaList data-testid="searchResults">

                    <InfiniteScroll
                        dataLength={medias?.length || 0}
                        next={fetchNextPage}
                        hasMore={hasMoreMedias}
                        loader={<div><CircularProgress color="secondary" /><h4>Loading...</h4></div>}
                        endMessage={
                            <EndMessageWrapper>
                                We found <strong>{allMedias?.length}</strong> results for <strong>{searchTerm}</strong>!
                            </EndMessageWrapper>
                        }
                    >
                        {medias?.map((track: any, index: number) => (
                            <SearchRow track={track} key={index} />
                        ))}
                    </InfiniteScroll>
                </MediaList>
            );
        }
    }
    else if (error) {
        return <ErrorDisplay />;
    }
    return <InitialDisplay />;
}

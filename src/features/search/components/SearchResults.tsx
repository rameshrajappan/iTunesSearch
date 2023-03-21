import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hook';
import { selectAllItems, selectActivePageItems, hasMoreItemsToRender, moveNext } from '../searchSlice'
import SearchRow from './SearchRow';
import CircularProgress from '@mui/material/CircularProgress';
import { RootState } from '../../../app/store';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';

const EndMessageWrapper = styled.p`
    text-align:center;
`;
const SearchList = styled.ul`
    width: 90%;
    max-width: 1000px;
    margin: 0 auto 30px;
    padding: 0;
`;
const LoadingData = () => (
    <React.Fragment><CircularProgress /><p>Loading Results...</p></React.Fragment>
);
const ZeroResults = () => (
    <p>No Results.</p>
);
const ErrorDisplay = () => (
    <p>Unable to display data.</p>
);
const InitialDisplay = () => (
    <p>Search for your favourite music</p>
);
export default function SearchResults({ searchTerm }: any) {
    const dispatch: any = useAppDispatch()
    const activeItems = useAppSelector(selectActivePageItems);
    const allItems = useAppSelector(selectAllItems);
    const itemStatus = useAppSelector((state: RootState) => state.search.status);
    const error = useAppSelector((state: RootState) => state.search.error);
    const hasMoreItems = useAppSelector(hasMoreItemsToRender);
    const fetchNextPage = () => {
        dispatch(moveNext());
    };
    if (itemStatus === 'loading') {
        return <LoadingData />;
    }
    else if (itemStatus === 'succeeded') {
        if (allItems?.length === 0) {
            return <ZeroResults />;
        } else {
            return (
                <SearchList data-testid="searchResults">

                    <InfiniteScroll
                        dataLength={activeItems?.length || 0}
                        next={fetchNextPage}
                        hasMore={hasMoreItems}
                        loader={<div><CircularProgress color="secondary" /><h4>Loading...</h4></div>}
                        endMessage={
                            <EndMessageWrapper>
                                We found <strong>{allItems?.length}</strong> results for <strong>{searchTerm}</strong>!
                            </EndMessageWrapper>
                        }
                    >
                        {activeItems?.map((track: any, index: number) => (
                            <SearchRow track={track} key={index} />
                        ))}
                    </InfiniteScroll>
                </SearchList>
            );
        }
    }
    else if (error) {
        return <ErrorDisplay />;
    }
    return <InitialDisplay />;
}

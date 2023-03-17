import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch, useAppSelector } from '../../../app/hook';
import { fetchMedias, selectAllMedias, selectActivePageMedias, hasMoreMediasToRender, moveNext } from '../mediasSlice'
import SearchRow from './SearchRow';
import CircularProgress from '@mui/material/CircularProgress';
import { RootState } from '../../../app/store';
import InfiniteScroll from 'react-infinite-scroll-component';


function Search() {
    const dispatch: any = useAppDispatch()
    const medias = useAppSelector(selectActivePageMedias);
    const allMedias = useAppSelector(selectAllMedias);
    const mediasStatus = useAppSelector((state: RootState) => state.itunes.status);
    const error = useAppSelector((state: RootState) => state.itunes.error);
    const hasMoreMedias = useAppSelector(hasMoreMediasToRender);
    const [searchTerm, setSearchTerm] = useState("");
    //To display submitted search term
    const [submittedTerm, setSubmittedTerm] = useState("");

    const fetchNextPage = () => {
        dispatch(moveNext());
    };
    const handleSubmit = (e: any) => {
        e.preventDefault();
        setSubmittedTerm(searchTerm);
        dispatch(fetchMedias(searchTerm));
    };
    const handleTextFieldChange = (e: any) => {
        setSearchTerm(e.target.value);
    };
    const renderMedias = () => {
        if (mediasStatus === 'loading') {
            return <React.Fragment><CircularProgress /><p>Loading medias...</p></React.Fragment>;
        }
        if (mediasStatus === 'succeeded') {
            if (allMedias?.length === 0) {
                return <p>No Results.</p>;
            } else {
                return (
                    <ul className="search-results-list" data-testid="searchResults">

                        <InfiniteScroll
                            dataLength={medias?.length || 0}
                            next={fetchNextPage}
                            hasMore={hasMoreMedias}
                            loader={<div><CircularProgress color="secondary" /><h4>Loading...</h4></div>}
                            endMessage={
                                <p style={{ textAlign: 'center' }}>
                                    We found <strong>{allMedias?.length}</strong> results for <strong>{submittedTerm}</strong>!
                                </p>
                            }
                        >
                            {medias?.map((track: any, index: number) => (
                                <SearchRow track={track} key={index} />
                            ))}
                        </InfiniteScroll>
                    </ul>
                );
            }
        }
        if (error) {
            return <p>Unable to display medias.</p>;
        }
        return <p>Search for your favourite music</p>
    }
    return (
        <div className="search-page">
            <Paper component="form"
                className="search-form"
                onSubmit={handleSubmit}
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
                elevation={4}>
                <InputBase
                    value={searchTerm}
                    onChange={handleTextFieldChange}
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search iTunes"
                    inputProps={{ 'aria-label': 'search iTunes' }}
                    data-testid="searchTerm" />
                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" data-testid="searchButton" disabled={!searchTerm}>
                    <SearchIcon />
                </IconButton>
            </Paper>
            {renderMedias()}
        </div>
    );
}
export default Search;
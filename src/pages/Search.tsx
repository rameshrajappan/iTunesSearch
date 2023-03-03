import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { connect } from 'react-redux';
import './Search.css';
import { fetchMedias, addNextBatch, getNextBatch } from "../actions/mediasActions";
import SearchRow from "../components/SearchRow";
import CircularProgress from '@mui/material/CircularProgress';

function Search({ dispatch, loading, loaded, medias, nextBatch, hasErrors, allMedias }: any) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isBottom, setIsBottom] = useState(false);
    const handleUserScroll = () => {
        // get scroll top value
        const scrollTop = document.documentElement.scrollTop;

        // get the entire height, including padding
        const scrollHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;

        // check if user is near to the bottom of the body
        if (scrollTop + windowHeight + 50 >= scrollHeight) {
            setIsBottom(true);
            //console.log(`scrollTop: ${scrollTop} , scrollHeight: ${scrollHeight} , windowHeight: ${windowHeight} `);
            //console.log("setting botton to true");
        }
    };
    // on mount
    useEffect(() => {
        window.addEventListener("scroll", handleUserScroll);
        return () => window.removeEventListener("scroll", handleUserScroll);
    }, []);
    // handle re-rendering when users get to the bottom of the page
    useEffect(() => {
        if (isBottom) {

            if (!nextBatch.length) {
                // fetch another batch
                dispatch(getNextBatch());
            }
            // render the next batch of pre-fetched data
            dispatch(addNextBatch());
            setIsBottom(false);
        }
    }, [isBottom, dispatch, setIsBottom, nextBatch.length]);
    const handleSubmit = (e: any) => {
        e.preventDefault();
        dispatch(fetchMedias(searchTerm));
    };
    const handleTextFieldChange = (e: any) => {
        setSearchTerm(e.target.value);
    };
    const renderMedias = () => {
        if (loading) return <React.Fragment><CircularProgress /><p>Loading medias...</p></React.Fragment>;
        if (loaded && medias?.length === 0) return <p>No Results.</p>;
        if (hasErrors) return <p>Unable to display medias.</p>;
        const infiniteScrollLoader = loaded && allMedias.length > medias.length ? <CircularProgress color="secondary" /> : "";
        return (
            <ul className="search-results-list">
                {medias?.map((track: any, index: number) => (
                    <SearchRow track={track} key={index} />
                ))}
                {infiniteScrollLoader}
            </ul>
        );
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
                    inputProps={{ 'aria-label': 'search iTunes' }} />
                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
            {renderMedias()}
        </div>
    );
}

const mapStateToProps = (state: any) => ({
    loading: state.medias.loading,
    loaded: state.medias.loaded,
    medias: state.medias.medias,
    hasErrors: state.medias.hasErrors,
    allMedias: state.medias.allMedias,
    nextBatch: state.medias.nextBatch,
    currentPage: state.medias.currentPage,
    isEndOfCatalogue: state.medias.isEndOfCatalogue,
    totalResultCount: state.medias.totalResultCount,
});

export default connect(mapStateToProps)(Search);
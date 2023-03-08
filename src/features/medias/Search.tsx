import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMedias, selectAllMedias, selectActivePageMedias, hasMoreMediasToRender, moveNext } from './mediasSlice'
import SearchRow from "./SearchRow";
import CircularProgress from '@mui/material/CircularProgress';

function Search() {
    const dispatch:any = useDispatch()
    const medias = useSelector(selectActivePageMedias);
    const allMedias = useSelector(selectAllMedias);
    const mediasStatus = useSelector((state: any) => state.medias.status);
    const error = useSelector((state: any) => state.medias.error);
    const hasMoreMedias = useSelector(hasMoreMediasToRender);
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

            if (hasMoreMedias) {
                // fetch another batch
                dispatch(moveNext());
            }
            setIsBottom(false);
        }
    }, [isBottom, dispatch, hasMoreMedias]);
    const handleSubmit = (e: any) => {
        e.preventDefault();
        dispatch(fetchMedias(searchTerm));
    };
    const handleTextFieldChange = (e: any) => {
        setSearchTerm(e.target.value);
    };
    const renderMedias = () => {
        if (mediasStatus==='loading') return <React.Fragment><CircularProgress /><p>Loading medias...</p></React.Fragment>;
        if (mediasStatus==='succeeded' && allMedias?.length === 0) return <p>No Results.</p>;
        if (error) return <p>Unable to display medias.</p>;
        const infiniteScrollLoader = mediasStatus==='succeeded' && allMedias.length > medias.length ? <CircularProgress color="secondary" /> : "";
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



export default Search;
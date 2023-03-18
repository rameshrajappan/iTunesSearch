import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch } from '../../../app/hook';
import { fetchMedias } from '../mediasSlice'
import SearchResults from './SearchResults';
import styled from 'styled-components';

const SearchPageWrapper = styled.div`
    margin-left: 10px;
    margin-right: 10px;
`;

export default function SearchPage() {
    const dispatch: any = useAppDispatch()
    const [searchTerm, setSearchTerm] = useState("");
    //To display submitted search term
    const [submittedTerm, setSubmittedTerm] = useState("");
    const handleSubmit = (e: any) => {
        e.preventDefault();
        setSubmittedTerm(searchTerm);
        dispatch(fetchMedias(searchTerm));
    };
    const handleTextFieldChange = (e: any) => {
        setSearchTerm(e.target.value);
    };

    return (
        <SearchPageWrapper>
            <Paper component="form"
                onSubmit={handleSubmit}
                sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    m: '20px auto',
                    width: '90%',
                    maxWidth: '1000px'
                }}
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
            <SearchResults searchTerm={submittedTerm} />
        </SearchPageWrapper>
    );
}

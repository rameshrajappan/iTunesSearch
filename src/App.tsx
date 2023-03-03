import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import './App.css';
import Search from './pages/Search';

export default function App() {
    return (
        <div className="App">
            <header className="App-header">
                <div className="App-logo-container">
                    <img src="/header-logo.png" className="App-logo" alt="logo" />
                    <div className="App-title">iTunes Search</div>
                </div>
            </header>
            <Router>
                <Routes>
                    <Route path="/" element={<Search />} />
                </Routes>
            </Router>
        </div>
    );
}



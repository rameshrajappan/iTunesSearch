import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import SearchPage from './features/search/components/SearchPage';
import styled, { keyframes } from 'styled-components';
import MainLogo from './header-logo.png';
const appLogoSpin = keyframes`
from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const AppWrapper = styled.div`
    text-align: center;
`;

const AppHeader = styled.header`
    height: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    font-size: calc(10px + 2vmin);
    color: #ffffff;
    background-color: rgba(22, 22, 23, .8);
`;

const AppLogoContainer = styled.div`
    margin: auto;
`;

const AppLogoImage = styled.img`
    height: 40px;
    pointer-events: none;
    @media (prefers-reduced-motion: no-preference) {
        animation: ${appLogoSpin} infinite 20s linear;
    }
`;
const AppTitle = styled.div`
font-size: 14px;
    margin-top: -6px;
`;
export default function App() {
    return (
        <AppWrapper>
            <AppHeader>
                <AppLogoContainer>
                    <AppLogoImage src={MainLogo} alt="logo" />
                    <AppTitle>iTunes Search</AppTitle>
                </AppLogoContainer>
            </AppHeader>
            <Router>
                <Routes>
                    <Route path="/" element={<SearchPage />} />
                    <Route path="/iTunesSearchDemo" element={<SearchPage />} />
                </Routes>
            </Router>
        </AppWrapper>
    );
}



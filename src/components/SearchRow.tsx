import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import SongIcon from '@mui/icons-material/LibraryMusic';
import MovieIcon from '@mui/icons-material/Movie';
import AudioBookIcon from '@mui/icons-material/AudioFile';
import { orange } from '@mui/material/colors';

import './SearchRow.css';
function SearchRow({ track }: any) {
    const { trackName, collectionName, primaryGenreName, artistName, wrapperType, artworkUrl100, kind } = track;
    let title = trackName;
    let subTitle1 = collectionName;
    let subTitle2 = artistName;
    const iconProps = { height: 25, width: 25, color: orange[500] };
    let typeIcon;
    if (wrapperType === "audiobook") {
        title = artistName;
        subTitle2 = primaryGenreName;
        typeIcon = <AudioBookIcon sx={iconProps} />;
    } else {
        subTitle1 = subTitle1 || primaryGenreName;
        typeIcon = kind === "feature-movie" ? <MovieIcon sx={iconProps} /> : <SongIcon sx={iconProps} />;
    }

    return (
        <li className="search-item">
            <Card sx={{ display: 'flex' }} elevation={4}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }} className="track-details">
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 2, pt: 1 }} >
                        {typeIcon}
                    </Box>
                    <CardContent sx={{ flex: '1 0 auto', pt: 1 }}>
                        <Typography component="div" variant="h5" className="collection-name">
                            {title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div" className="artist-name">
                            {subTitle1}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary" component="div" className="artist-name">
                            {subTitle2}
                        </Typography>
                    </CardContent>
                </Box>
                <CardMedia
                    className="track-image"
                    component="img"
                    sx={{ width: 151 }}
                    image={artworkUrl100}
                    alt={title}
                />
            </Card>
        </li>);
}



export default SearchRow;
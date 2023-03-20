import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import SongIcon from '@mui/icons-material/LibraryMusic';
import MovieIcon from '@mui/icons-material/Movie';
import AudioBookIcon from '@mui/icons-material/AudioFile';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { orange } from '@mui/material/colors';
import MediaItemType from '../types/MediaItemType';
import styled from 'styled-components';
const MediaItem = styled.li`
    list-style: none;
    margin-top: 10px;
`;
//Material sx style
const mediaContentStyle = {
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'left',
    whiteSpace: 'nowrap'
};
const iconPropsStyle = {
    height: 25,
    width: 25,
    color: orange[500]
};
function SearchRow({ track }: { track: MediaItemType }) {
    const { trackName, collectionName, primaryGenreName, artistName, wrapperType,
        artworkUrl100, kind, previewUrl, trackViewUrl, collectionViewUrl } = track;
    let title = trackName;
    let subTitle1 = collectionName;
    let subTitle2 = artistName;
    let playUrl = previewUrl || trackViewUrl || collectionViewUrl;

    let typeIcon;
    if (wrapperType === "audiobook") {
        title = artistName;
        subTitle2 = primaryGenreName;
        typeIcon = <AudioBookIcon sx={iconPropsStyle} />;
    } else {
        subTitle1 = subTitle1 || primaryGenreName;
        typeIcon = kind === "feature-movie" ? <MovieIcon sx={iconPropsStyle} /> : <SongIcon sx={iconPropsStyle} />;
    }

    return (
        <MediaItem>
            <Card sx={{ display: 'flex' }} elevation={4}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: 'calc(100% - 160px)'
                }}>
                    <CardContent sx={{ flex: '1 0 auto', pt: 1 }}>
                        <Typography component="div" variant="h5" sx={mediaContentStyle}>
                            {title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div" sx={mediaContentStyle}>
                            {subTitle1}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary" component="div" sx={mediaContentStyle}>
                            {subTitle2}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', pb: 1 }}>
                            {typeIcon}
                            <IconButton aria-label="play/pause" href={playUrl}>
                                <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                            </IconButton>
                        </Box>
                    </CardContent>
                </Box>
                <CardMedia
                    component="img"
                    sx={{ width: 151, marginLeft: 'auto' }}
                    image={artworkUrl100}
                    alt={title}
                />
            </Card>
        </MediaItem>
    );
}



export default SearchRow;
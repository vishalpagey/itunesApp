import { TOGGLE_FAVOURITE, FETCH_ALBUMS } from "./types";

export const fetchAlbums = () => dispatch => {
    fetch('https://itunes.apple.com/us/rss/topalbums/limit=100/json')
        .then(response => response.json())
        .then(albums => dispatch({
            type: FETCH_ALBUMS,
            payload: albums.feed.entry.map((element, index) => {
                const i = Object.assign({}, element);
                i.position = index + 1;
                i.isFavourite = false
                return i;
            })
        }));
};

export const toggleFav = (pos) => {
    return {
        type:TOGGLE_FAVOURITE,
        payload:pos
    }
}
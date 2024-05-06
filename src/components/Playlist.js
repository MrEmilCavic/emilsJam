import React from 'react';

function Playlist() {
    return <>
            <form>
                <input id="newPlaylist" type="text" value="new Playlist"/>
                <button type="submit">Save that jam to Spotify!</button>
            </form>
    </>;
}

export default Playlist;
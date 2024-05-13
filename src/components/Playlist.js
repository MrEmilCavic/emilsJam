import React, { useCallback } from 'react';
import TrackList from "./TrackList.js";
import "./style/Playlist.css";

const Playlist = (props) => {
    const handleNameChange = useCallback(
        (event) => {
            props.onNameChange(event.target.value);
        }, [props.onNameChange]
    );

    return (
    <div className="Playlist">            
                <input className="Listname" onChange={handleNameChange} defaultValue={"add Playlist name"}/>
                <TrackList 
                tracks={props.playList}
                isRemoval={true}
                onRemove={props.onRemove}
                />
                <button className="savePlaylist" onClick={props.onSave}>
                   Save to Spotify</button>
           
    </div>
    );
};

export default Playlist;
import React, { useCallback } from 'react';
import "./style/Track.css";

const Track = (props) => {
    const addTrack = useCallback((event) => {
            props.onAdd(props.track);
        }, [props.onAdd, props.track]
    );

    const removeTrack = useCallback((event) => {
            props.onRemove(props.track);
    }, [props.onRemove, props.track]
    );

    const renderTrack = () => {
        if (props.isRemoval) {
            return (
                <button className="renderTrack" onClick={removeTrack}>-</button>
            );
        }
        return (
            <button className="renderTrack" onClick={addTrack}>+</button>
        );
    }

    return (
    <>
           <div className="Track">
                <div className="Tracktext">
                    <h3>{props.track.name}</h3> 
                    <p>{props.track.artist} | {props.track.album}</p>
                </div>
                {renderTrack()}
            </div>     
    </>
    );
};

export default Track;
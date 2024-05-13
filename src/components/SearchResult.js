import React from 'react';
import TrackList from './TrackList.js';
import "./style/SearchResult.css";

const SearchResult = (props) => {
    return (
    <div className="SearchResult">
            <h2>Results</h2>
            <TrackList tracks={props.searchResult} onAdd={props.onAdd} />
        </div>
    );
};

export default SearchResult;
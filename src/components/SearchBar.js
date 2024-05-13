import React, { useState, useCallback } from 'react';
import "./style/SearchBar.css";

const SearchBar = (props) => {

    const [searchQuery, setSearchQuery] = useState("");

    const handleQueryChange = useCallback((event) => {
        setSearchQuery(event.target.value);
    }, []);

    const searching = useCallback(() => {
        props.onSearch(searchQuery);
    }, [props.onSearch, searchQuery]);

    return( <>
            <input className="SearchInput" placeholder="Search for your jam!" onChange={handleQueryChange} />
            <button className="SearchButton" onClick={searching}>Search</button>
            </>
    );
};

export default SearchBar;
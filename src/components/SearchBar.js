import React from 'react';

function SearchBar() {
    return <form>
            <input id="searchQuery" type="text" />
            <button type="submit">Search through Emil's jam!</button>
            </form>;
}

export default SearchBar;
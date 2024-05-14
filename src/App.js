import React, {useState, useEffect, useCallback } from 'react';
import logo from './emilsjamlogo.png';
import './App.css';
import FetchApi from './components/FetchApi.js';
import SearchBar from './components/SearchBar.js';
import SearchResult from './components/SearchResult.js';
import Playlist from './components/Playlist.js';
import UserProfile from './components/UserProfile.js';

const App = () => {
  
  const [searchResult, setSearchResult] = useState([]);
  const [playList, setPlayList] = useState([]);
  const [listName, setListName] = useState('Create your new jam!');
  const [userName, setUserName] = useState('');
  const [userImg, setUserImg] = useState('');

const getProfile = useEffect(() => {
    FetchApi.getUserProfile()
    .then(profile => {
      setUserName(profile.name);
      setUserImg(profile.image);
});
},[]);


  const searchQuery = useCallback((searchInput) => {
    FetchApi.searchTracks(searchInput).then(setSearchResult);
      }, );
  

  const addTrack = useCallback((track) => {
    if(playList.some((savedTrack) => savedTrack.id === track.id))
      return;
    setPlayList((prev) => [...prev, track]);
    }, [playList]
  );

  const removeTrack = useCallback((track) => {
    setPlayList((prev) => prev.filter((currentTrack) => currentTrack.id !== track.id)
  );
  }, []);

  const listNameChange = useCallback((name) => {
    setListName(name);
}, []);

  const savePlayList = useCallback(() => {
    const trackUris = playList.map((track) => track.uri);
    FetchApi.createPlaylist(listName, trackUris).then(() => {
        setPlayList([]);
        setListName('New Playlist');
        alert("New playlist successfully saved! Enjoy the jam!");
      });
      }, [listName, playList]);

  return (
    <div className="appContainer">
      <header className="header">
        <img src={logo} className="App-logo" alt="logo" style={{width:'20rem', height: 'auto'}}/>
      </header>
      <main className="main">
        <UserProfile name={userName} 
                      image={userImg}
                      onLogIn={getProfile}
                      /> <br/>
        <SearchBar onSearch={searchQuery} />
         <div className="listContainer">
           <SearchResult searchResult={searchResult} onAdd={addTrack}/>
           <Playlist listName={listName} 
                      playList={playList} 
                      onRemove={removeTrack} 
                      onSave={savePlayList}
                      onNameChange={listNameChange}
                      />
          </div>
        </main>
      </div>     
  );
           
};

export default App;

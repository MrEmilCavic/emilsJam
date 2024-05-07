import logo from './logo.svg';
import './App.css';
import SearchBar from './components/SearchBar.js';
import SearchResult from './components/SearchResult.js';
import Playlist from './components/Playlist.js';
import TrackList from './components/TrackList.js';
import Track from './components/Track.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <SearchBar />
      <SearchResult />
      <Playlist />
      <TrackList />
      <Track />
    </div>
    
  );
}

export default App;

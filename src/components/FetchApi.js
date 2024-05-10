const clientId = '5e99e149119142ccb907bc0fc80a38be';
const redirectUri = 'https://localhost:3000';
let accessToken = window.localStorage.getItem('spotiToken');
let userId;

const FetchApi = {

    getAccessToken() {
        if (accessToken) {
            return accessToken
        }
        const urlAuthenticate = window.location.href.match(/access_token=[^&]*)/);
        const urlExpiry = window.location.href.match(/expires_in=([^&]*)/);
        if(urlAutchenticate && urlExpiry) {
            accessToken = urlAccessToken[1];
            window.localStorage.setItem('spotiToken', accessToken);
            const expiresIn = Number(urlExpiresIn[1]);
            window.setTimeout(() => {
                window.localStorage.removeItem('spotiToken');
                window.history.pushState('Access Token', null, '/');
            }, expiresIn);
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    },
/*
    getAuth() {
        window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
    },

    checkAuth() {
        const authentication = window.location.href.match(/access_token=([^&]*)/);
        if (authentication) {
            accessToken = authentication[1];
            return true;
        } else {
            return false;
        }
    },
*/
    getUserProfile() {
        if(!accessToken) {
            return Promise.reject(new Error('Missing access token!'));
        }
        const endpoint = 'https://api.spotify.com/v1/me';
        return fetch(endpoint, {
            method: 'GET',
            headers: {
                'Authorization' : `Bearer ${accessToken}`,
            }        
        })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('An error occurred when fetching the user profile');
            }
        })
        .then((data) => {
            const userProfile = data.items.map(item => ({
                id: item.id,
                name: item.display_name,
                image: item.image.url[1],
            }));
            return userProfile;
        });
    },

    searchTracks(searchInput) {
        const accessToken = this.getAccessToken();
        const searchEndpoint = `https://api.spotify.com/v1/search?type=track&q=${searchInput}`;
        return fetch(searchEndpoint, {
            method: 'GET',
            headers: {
                'Authorization' : `Bearer ${accessToken}`,
            }
        })
        .then(response => response.json())
        .then((data) => {
            if(data.tracks && data.tracks.items) {
            const queryResult = data.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artist.map(artist => artist.name).join(', '),
                albumimg: track.album.images[0].url,
                album: track.album.name,
                uri: track.uri,
                preview_url: track.preview_url                
            }));
                return queryResult;
            } else {
                return [];
            }   
        });
    },

    createPlaylist(playlistName, trackUris) {
        const accessToken = this.getAccessToken();
        const createListUrl = `https://api.spotify.com/v1/users/${userId}/playlists`;
        const playListData = {
            'name': playlistName,
        }
        return fetch(createListUrl, {
            method: 'POST',
            headers: {
                'Authorization' : `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(playListData),
        })
        .then((response) => {
            if (response.status === 201) {
                return response.json();
            } else {
                throw new Error('Failed to create playlist');
            }
        })
        .then((data) => {
            const playListId =data.id;
            const tracksToAdd = {
                'uris': trackUris,
            }

        const addTracksUrl = `https://api.spotify.com/v1/playlists/${playListId}/tracks`;
        return fetch(addTracksUrl, {
                method: 'POST',
                headers: {
                    'Authoriaztion' : `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tracksToAdd),
            });
        })
        .then((res) => res.json())
        .then((result) => {
            if(result) {
                return true;
            } else {
                return false;
            }
        });
    }
    
}


export default FetchApi;
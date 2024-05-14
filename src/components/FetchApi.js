const clientId = '5e99e149119142ccb907bc0fc80a38be'; 
//const redirectUri = 'http://localhost:3000/callback/';
const redirectUri = 'https://mremilcavic.github.io/emilsjam/';

let accessToken;
let userId;

const FetchApi = {

    getAccessToken() {
        if (accessToken) {
            return accessToken;
        } 

        const urlAuthenticate = window.location.href.match(/access_token=([^&]*)/);
        const urlExpiry = window.location.href.match(/expires_in=([^&]*)/);
        try {
        if(urlAuthenticate && urlExpiry) {
            accessToken = urlAuthenticate[1];
            const expiresIn = Number(urlExpiry[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            console.log(`Was able to retrieve access token: ${accessToken}`);
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        } 
        } catch(error) {
            console.log(error);
        };

    },

    getUserProfile() {
        const accessToken = FetchApi.getAccessToken();
        return fetch('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }        
        }).then(response => {
            return response.json();
        }).then(data => {
            if(!data) {
            console.log(`NO profile data: ${JSON.stringify(data)}`);
                return [];
            }
            if(!data.images[0]) {
                const profileData = {  id: data.id,
                    name: data.display_name,
                    };
                    console.log(`Profile data: ${profileData}`);
                    return profileData;
            }
            const profileData = {  id: data.id,
                name: data.display_name,
                image: data.images[0].url
                };
                console.log(`Profile data: ${profileData}`);
            return profileData;
        });
    },

    searchTracks(searchInput) {
        const accessToken = FetchApi.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchInput}`, {
            headers: {
                Authorization : `Bearer ${accessToken}`
            }
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            if(!data.tracks) {
                return [];
            }
            console.log(`${JSON.stringify(data.tracks)}`)
            return data.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                /*albumimg: track.album.images[0].url,*/
                album: track.album.name,
                uri: track.uri
                /*preview_url: track.preview_url  */              
            }));   
        });
    },

    createPlaylist(playlistName, trackUris) {

        const accessToken = FetchApi.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };

        return fetch('httpS://api.spotify.com/v1/me', {
            headers: headers
        }).then(response => response.json()
        ).then(data => {
        userId = data.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({name: playlistName})
        }).then(response => response.json()
        ).then(data => {
        const playlistId = data.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({uris: trackUris})
        });
        });
    });
    }
};

export default FetchApi;
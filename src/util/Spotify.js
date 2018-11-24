import React from 'react';
import App from '../Components/App/App';


const clientID = "6bdd6beb98b54d819b4d95754f953152";

const redirectURI = "http://localhost:3000/";

let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    } else {
      const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
      const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
      if (accessTokenMatch && expiresInMatch) {
        accessToken = accessTokenMatch[1];
        const expiresIn = Number(expiresInMatch[1]);
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
        return accessToken;
      } else {
        const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        window.location = accessUrl;
      }
    }
  },
  search(term) {
    this.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{
      headers: {Authorization: `Bearer ${accessToken}`}
    }).then(response => {
      return response.json();
    }).then(response => {
      if (!response.tracks) {
        return [];
      } else {
        return response.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          })
        )
      }
    })
  },
  savePlaylist(playlistName, trackURIs) {
    if (playlistName && trackURIs.length) {
    } else {
      return;
    }
    let accessToken = this.getAccessToken();
    let headers = {Authorization: `Bearer ${this.getAccessToken()}`};
    let userID;
    // fetch GET Statement
    return fetch(`https://api.spotify.com/v1/me`,{headers: headers}).then(response =>
      response.json()).then(jsonResponse => {
      userID = jsonResponse.id;
    })
    // fetch POST Statement that creates a new playlist
    let playlistID;
    return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,{
      headers: headers,
      method: 'POST',
      body: JSON.stringify({name: playlistName})
    }).then(jsonResponse => {
      playlistID = jsonResponse.id;
    })
    // fetch POST Statement that adds tracks to playlist
    return fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`,{
      headers: headers,
      method: 'POST',
      body: JSON.stringify({uri: trackURIs})
    }).then(jsonResponse => {
      playlistID = jsonResponse.id;
    })
  }
}


export default Spotify;

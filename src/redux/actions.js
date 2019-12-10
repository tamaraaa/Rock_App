import axios from "axios";

import { actionTypes } from "./constants";
import { api } from "../constants";

export const fetchData = () => {
  return dispatch => {
    dispatch({ type: actionTypes.FETCH_ARTISTS });
    axios
      .get(
        `${api.rootUrl}?method=tag.gettopartists&tag=rock&api_key=${api.apiKey}&format=json&limit=10`
      )
      .then(response => {
        const artists = response.data.topartists.artist;
        const artistInfo = [];
        artists.forEach(artist => {
          axios
            .get(
              `${api.rootUrl}?method=artist.getinfo&artist=${artist.name}&api_key=${api.apiKey}&format=json&limit=10`
            )
            .then(res => {
              artistInfo.push(res.data);
              if (artistInfo.length > 9) {
                dispatch({
                  type: actionTypes.FETCH_ARTISTS_FULFILLED,
                  payload: artistInfo
                });
              }
            })
            .catch(err => {
              dispatch({
                type: actionTypes.FETCH_ARTISTS_ERROR,
                payload: err.message
              });
            });
        });
      });
  };
};
export const loadMoreAlbums = payload => {
  return { type: actionTypes.SET_SEARCH_VAL, payload };
};

export const albumSearch = (val, artist) => {
  const albumsInfo = [];

  return dispatch => {
    if (val) {
      dispatch({ type: actionTypes.FETCH_ALBUMS });
      axios
        .get(
          ` http://ws.audioscrobbler.com/2.0/?method=album.search&album=${val}&api_key=${api.apiKey}&format=json&limit=300`
        )
        .then(res => {
          const albums = res.data.results.albummatches.album;
          if (albums.length > 0) {
            const filteredAlbums = albums.filter(album => {
              return album.artist === artist;
            });
            if (filteredAlbums.length > 0) {
              filteredAlbums.forEach(album => {
                if (album) {
                  axios
                    .get(
                      `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${api.apiKey}&artist=${album.artist}&album=${album.name}&format=json&limit=10`
                    )
                    .then(res => {
                      albumsInfo.push(res.data.album);
                      return albumsInfo;
                    })
                    .then(albumsInfo => {
                      dispatch({
                        type: actionTypes.ALBUM_SEARCH,
                        payload: albumsInfo
                      });
                    });
                }
              });
            } else {
              dispatch({
                type: actionTypes.FETCH_ALBUMS_ERROR,
                payload: "No album matches found.."
              });
            }
          } else {
            dispatch({
              type: actionTypes.FETCH_ALBUMS_ERROR,
              payload: "No results found.."
            });
          }
        })
        .catch(err => {
          dispatch({
            type: actionTypes.FETCH_ALBUMS_ERROR,
            payload: err.message
          });
        });
    }
  };
};

export const fetchAlbums = (name, pageNum) => {
  return dispatch => {
    dispatch({ type: actionTypes.FETCH_ALBUMS });
    const albumsInfo = [];
    axios
      .get(
        `${api.rootUrl}?method=artist.gettopalbums&artist=${name}&api_key=${api.apiKey}&format=json&page=${pageNum}&limit=10`
      )
      .then(res => {
        const albums = res.data.topalbums.album;
        albums.forEach(album => {
          if (album) {
            axios
              .get(
                `${api.rootUrl}?method=album.getinfo&api_key=${api.apiKey}&artist=${name}&album=${album.name}&format=json&limit=10`
              )
              .then(res => {
                albumsInfo.push(res.data.album);
                if (albumsInfo.length === 10) {
                  dispatch({
                    type: actionTypes.FETCH_ALBUMS_FULFILLED,
                    payload: [albumsInfo, name]
                  });
                }
              })
              .catch(err => {
                dispatch({
                  type: actionTypes.FETCH_ALBUMS_ERROR,
                  payload: err.message
                });
              });
          }
        });
      })
      .catch(err => {
        dispatch({
          type: actionTypes.FETCH_ALBUMS_ERROR,
          payload: err.message
        });
      });
  };
};

import axios from "axios";

import { actionTypes } from "./constants";
import { api } from "../constants/constantsApi";

export const fetchData = () => {
  return dispatch => {
    dispatch({ type: actionTypes.FETCH_ARTISTS });
    axios
      .get(
        `${api.rootUrl}?method=artist.getsimilar&artist=AC/DC&api_key=${api.apiKey}&format=json&limit=10`
      )
      .then(response => {
        const artists = response.data.similarartists.artist;
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

export const albumSearch = (val, albumList) => {
  return dispatch => {
    const filtredList = albumList.filter(album =>
      album.name.toLowerCase().includes(val.toLowerCase())
    );
    dispatch({
      type: actionTypes.ALBUM_SEARCH,
      payload: filtredList
    });
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
          axios
            .get(
              `${api.rootUrl}?method=album.getinfo&api_key=${api.apiKey}&artist=${name}&album=${album.name}&format=json&limit=10`
            )
            .then(res => {
              albumsInfo.push(res.data.album);
              if (albumsInfo.length > 9) {
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

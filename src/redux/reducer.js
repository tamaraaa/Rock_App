import { actionTypes } from "./constants";
import { status } from "../constants";

const initialState = {
  artists: [],
  status: "",
  errorMessage: "",
  albums: [],
  currentArtist: "",
  filtredAlbums: [],
  pageNum: 1,
  searchedVal: "",
  searchedAlbums: []
};

function rootReducer(state = initialState, action) {
  if (action.type === actionTypes.FETCH_ARTISTS_FULFILLED) {
    return {
      ...state,
      artists: action.payload,
      status: status.SUCCESS,
      errorMessage: ""
    };
  }
  if (action.type === actionTypes.SET_SEARCH_VAL) {
    return {
      ...state,
      searchedVal: action.payload
    };
  }

  if (action.type === actionTypes.FETCH_ARTISTS) {
    return {
      ...state,
      status: status.PENDING,
      albums: [],
      pageNum: 1
    };
  }
  if (action.type === actionTypes.SET_STATUS) {
    return {
      ...state,
      status: action.payload
    };
  }

  if (action.type === actionTypes.FETCH_ARTISTS_ERROR) {
    return {
      ...state,
      status: status.FAILURE,
      errorMessage: action.payload,
      albums: []
    };
  }
  if (action.type === actionTypes.FETCH_ALBUMS) {
    return {
      ...state,
      status: status.PENDING,
      searchedAlbums: []
    };
  }
  if (action.type === actionTypes.FETCH_ALBUMS_FULFILLED) {
    return {
      ...state,
      albums: [...state.albums, ...action.payload[0]],
      status: status.SUCCESS,
      errorMessage: "",
      currentArtist: action.payload[1],
      pageNum: state.pageNum + 1
    };
  }

  if (action.type === actionTypes.ALBUM_SEARCH) {
    return {
      ...state,
      searchedAlbums: [...action.payload],
      errorMessage: "",
      status: status.SUCCESS
    };
  }

  if (action.type === actionTypes.FETCH_ALBUMS_ERROR) {
    return {
      ...state,
      status: status.FAILURE,
      errorMessage: action.payload
    };
  }
  return state;
}

export default rootReducer;

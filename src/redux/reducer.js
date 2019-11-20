import { actionTypes } from "./constants";
const initialState = {
  artists: [],
  status: "",
  errorMessage: "",
  albums: [],
  currentArtist: "",
  filtredAlbums: [],
  pageNum: 1,
  searchedVal: ""
};

function rootReducer(state = initialState, action) {
  if (action.type === actionTypes.FETCH_ARTISTS_FULFILLED) {
    return {
      ...state,
      artists: action.payload,
      status: "success",
      errorMessage: ""
    };
  }
  if (action.type === actionTypes.SET_SEARCH_VAL) {
    return {
      ...state,
      searchedVal: action.payload
    };
  }

  if (action.type === actionTypes.FATCH_ARTISTS) {
    return {
      ...state,
      status: "pending"
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
      status: "failure",
      errorMessage: action.payload,
      albums: []
    };
  }
  if (action.type === actionTypes.FETCH_ALBUMS) {
    return {
      ...state,
      status: "pending"
    };
  }
  if (action.type === actionTypes.FETCH_ALBUMS_FULFILLED) {
    return {
      ...state,
      albums: [...state.albums, ...action.payload[0]],
      status: "success",
      errorMessage: "",
      currentArtist: action.payload[1],
      pageNum: state.pageNum + 1
    };
  }
  if (action.type === actionTypes.ALBUM_SEARCH) {
    return {
      ...state,
      filtredAlbums: [...action.payload],
      errorMessage: action.payload.length === 0 ? "Album not found.." : "",
      status: action.payload.length === 0 ? "failure" : "success"
    };
  }
  if (action.type === actionTypes.FETCH_ALBUMS_ERROR) {
    return {
      ...state,
      status: "failure",
      errorMessage: action.payload
    };
  }
  return state;
}

export default rootReducer;

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import uniqid from "uniqid";
import { debounce } from "lodash";

import { albumSearch, fetchAlbums, loadMoreAlbums } from "../../redux/actions";
import AlbumListItem from "./albumListItem/AlbumListItem";

import "./album_list.scss";

const AlbumList = ({
  albums,
  status,
  albumSearch,
  currentArtist,
  errorMessage,
  fetchAlbums,
  pageNum,
  loadMoreAlbums,
  filtredAlbums,
  searchedVal
}) => {
  const [inputVal, setInputVal] = useState("");

  const handleSearch = debounce(inputVal => {
    setInputVal(inputVal);
    loadMoreAlbums(inputVal);
    albumSearch(inputVal, albums);
  }, 1000);

  const albumsToShow = searchedVal.length > 0 ? filtredAlbums : albums;

  const debouncedFetchAlbums = debounce(() => {
    fetchAlbums(currentArtist, pageNum);
  }, 1000);

  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        searchedVal === ""
      ) {
        debouncedFetchAlbums();
      }
    };
    window.addEventListener("scroll", onScroll, false);
    return () => window.removeEventListener("scroll", onScroll, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentArtist, pageNum, searchedVal, albums]);

  return (
    <div className="album-wrapper">
      <input
        className="album-wrapper__input"
        type="text"
        placeholder="search for the album"
        onChange={e => handleSearch(e.target.value)}
      />
      <div className="artist-list">
        {status === "success" || status === "pending"
          ? albumsToShow.map(album => (
              <AlbumListItem
                name={album.name}
                img={album.image[2]["#text"]}
                key={uniqid()}
                songs={album.tracks}
              />
            ))
          : (status = "failure" && <p>{errorMessage}</p>)}
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  return state;
};
const mapDispatchToProps = dispatch => {
  return {
    albumSearch: bindActionCreators(albumSearch, dispatch),
    fetchAlbums: bindActionCreators(fetchAlbums, dispatch),
    loadMoreAlbums: bindActionCreators(loadMoreAlbums, dispatch)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AlbumList);

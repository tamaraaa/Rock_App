import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import uniqid from "uniqid";
import { debounce } from "lodash";

import { albumSearch, fetchAlbums, loadMoreAlbums } from "../../redux/actions";
import Card from "../shared/card/Card";

import "./albumList.scss";

const AlbumList = ({
  albums,
  status,
  albumSearch,
  currentArtist,
  errorMessage,
  fetchAlbums,
  pageNum,
  loadMoreAlbums,
  searchedAlbums,
  searchedVal
}) => {
  const [inputVal, setInputVal] = useState("");

  const handleSearch = debounce(inputVal => {
    setInputVal(inputVal);
    loadMoreAlbums(inputVal);
    albumSearch(inputVal, currentArtist);
  }, 600);

  const userSearch = searchedAlbums.length > 0 ? searchedAlbums : "";
  const albumsToShow = searchedVal.length > 0 ? userSearch : albums;

  const debouncedFetchAlbums = debounce(() => {
    fetchAlbums(currentArtist, pageNum);
  }, 1000);

  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        searchedVal === "" &&
        status === "SUCCESS"
      ) {
        debouncedFetchAlbums();
      }
    };
    window.addEventListener("scroll", onScroll, false);
    return () => window.removeEventListener("scroll", onScroll, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentArtist, searchedVal, pageNum]);

  return (
    <div className="album-wrapper">
      <input
        className="album-wrapper__input"
        type="text"
        placeholder="Search for the album"
        onChange={e => handleSearch(e.target.value)}
      />
      <div className="artist-list">
        {albumsToShow.length > 0
          ? albumsToShow.map(album => {
              if (album) {
                return (
                  <Card
                    album={album}
                    key={uniqid()}
                    songs={album.tracks}
                    pageNum={pageNum}
                  />
                );
              }
            })
          : (status = "FAILURE" && <p>{errorMessage}</p>)}
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

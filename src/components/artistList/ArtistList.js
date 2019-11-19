import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import uniqid from "uniqid";

import ArtistListItem from "./artistListItem/AtristListItem";
import Headline from "./headline/Headline";

import { fetchData, fetchAlbums } from "../../redux/actions";
import "./artist_list.scss";

const ArtistList = ({
  artists,
  getArtists,
  status,
  getAlbums,
  setShowArtist,
  pageNum
}) => {
  useEffect(() => {
    getArtists();
  }, [getArtists]);

  return (
    <React.Fragment>
      <Headline />
      <div className="artist-list">
        {status === "success" &&
          artists.map(artist => (
            <ArtistListItem
              setShowArtist={setShowArtist}
              artist={artist}
              pageNum={pageNum}
              key={uniqid()}
              fetchAlbums={getAlbums}
            />
          ))}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return state;
};
const mapDispatchToProps = dispatch => {
  return {
    getArtists: bindActionCreators(fetchData, dispatch),
    getAlbums: bindActionCreators(fetchAlbums, dispatch)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ArtistList);

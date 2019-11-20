import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import uniqid from "uniqid";

import ListItemCard from "../shared/listItemCard/ListItemCard";
import Headline from "./headline/Headline";

import { fetchData, fetchAlbums } from "../../redux/actions";
import "./artist_list.scss";

const ArtistList = ({
  artists,
  getArtists,
  status,
  getAlbums,
  setShowArtist,
  pageNum,
  albums
}) => {
  useEffect(() => {
    getArtists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <Headline />
      <div className="artist-list">
        {status === "success" &&
          artists.map(artist => (
            <ListItemCard
              setShowArtist={setShowArtist}
              artist={artist}
              pageNum={pageNum}
              key={uniqid()}
              fetchAlbums={getAlbums}
              albums={albums}
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

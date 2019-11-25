import React, { useState } from "react";
import { connect } from "react-redux";
import { FaArrowUp } from "react-icons/fa";

import Header from "./components/header/Header";
import ArtistList from "./components/artistList/ArtistList";
import AlbumList from "./components/albumList/AlbumList";
import Loader from "./components/shared/loader/Loader";

import "./App.scss";

function App({ status, pageNum }) {
  const [showArtist, setShowArtist] = useState(true);
  let content = showArtist ? (
    <ArtistList setShowArtist={setShowArtist} showArtist={showArtist} />
  ) : (
    <AlbumList />
  );
  return (
    <div className="App">
      <Header setShowArtist={setShowArtist} />
      <div className="wrapper">
        {content}
        {status === "PENDING" && <Loader />}
        <button
          className="wrapper__btn-top"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth"
            })
          }
        >
          <span className="wrapper__btn-top__icon">
            <FaArrowUp />
          </span>
        </button>
      </div>
    </div>
  );
}
const mapStateToProps = state => state;
export default connect(mapStateToProps)(App);

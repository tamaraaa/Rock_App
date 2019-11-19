import React, { useState } from "react";
import { connect } from "react-redux";

import Header from "./components/header/Header";
import ArtistList from "./components/artistList/ArtistList";
import AlbumList from "./components/albumList/AlbumList";
import Loader from "./components/shared/Loader";

import "./App.css";

function App({ status }) {
  const [showArtist, setShowArtist] = useState(true);
  let content = showArtist ? (
    <ArtistList setShowArtist={setShowArtist} />
  ) : (
    <AlbumList />
  );
  return (
    <div className="App">
      <Header />
      <div className="wrapper">
        {content}
        {status === "pending" && <Loader />}
      </div>
    </div>
  );
}
const mapStateToProps = state => state;
export default connect(mapStateToProps)(App);

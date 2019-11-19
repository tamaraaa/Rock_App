import React from "react";

import "./artist-list-item.scss";

const ArtistListItem = ({ artist, fetchAlbums, setShowArtist, pageNum }) => {
  const img = artist ? artist.artist.image[3]["#text"] : "";
  const name = artist ? artist.artist.name : "";
  const summary = artist ? artist.artist.bio.summary.slice(0, 300) : "";
  return (
    <div className="artist-list__item">
      <div className="artist-list__item__card">
        <div className="artist-list__item__card__front">
          <img
            className="artist-list__item__card__front__img"
            src={img}
            alt="artist"
          />
          <div className="artist-list__item__card__front__title">{name}</div>
        </div>
        <div className="artist-list__item__card__back">
          <div className="artist-list__item__card__back__title">{name}</div>
          <div className="artist-list__item__card__back__text">{summary}</div>
          <button
            className="btn btn-outline-light"
            onClick={() => {
              fetchAlbums(name, pageNum || 1);
              setShowArtist(false);
            }}
          >
            Albums
          </button>
        </div>
      </div>
    </div>
  );
};
export default ArtistListItem;

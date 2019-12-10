import React from "react";
import uniqid from "uniqid";

import "./card.scss";

const Card = ({
  songs,
  fetchAlbums,
  pageNum,
  setShowArtist,
  artist,
  album,
  showArtist
}) => {
  const summary = artist ? artist.artist.bio.summary.slice(0, 300) : "";
  const img = artist
    ? artist.artist.image[3]["#text"]
    : album.image[3]["#text"];
  const name = artist ? artist.artist.name : album.name;
  const backCard = showArtist ? (
    <React.Fragment>
      <div className="artist-list__item__card__back__text">{summary}</div>
      <button
        className="btn btn-outline-light"
        onClick={() => {
          fetchAlbums(name, pageNum);
          setShowArtist(false);
        }}
      >
        Albums
      </button>
    </React.Fragment>
  ) : (
    <ul className="artist-list__item__card__back__list">
      {songs.track.slice(0, 6).map(track => {
        return (
          <a key={uniqid()} href={track.url}>
            <li className="artist-list__item__card__back__list__item">
              {track.name}
            </li>
          </a>
        );
      })}
    </ul>
  );

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
        <div className="artist-list__item__card__back">{backCard}</div>
      </div>
    </div>
  );
};
export default Card;

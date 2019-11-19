import React from "react";
import uniqid from "uniqid";

import "./artist-list-item.scss";

const ArtistListItem = ({ name, img, songs }) => {
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
          <div className="artist-list__item__card__back__title"></div>
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
        </div>
      </div>
    </div>
  );
};
export default ArtistListItem;

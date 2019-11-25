import React from "react";

import "./header.scss";

const Header = ({ setShowArtist }) => {
  return (
    <div className="header">
      <span
        className="header__logo"
        onClick={() => {
          setShowArtist(true);
        }}
      >
        <em>RockApp</em>
      </span>
    </div>
  );
};
export default Header;

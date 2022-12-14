import PropTypes from "prop-types";
import React, { useState } from "react";
import "../../../style/itemsList.css";
import fullStar from "@assets/fullstar.png";
import emptyStar from "@assets/emptystar.png";
import { calculDistance } from "../../function/distance";

// context

import { useCurrentPosition } from "../../contexts/CurrentPositionContext";

function StationsInfo(props) {
  const { currentPosition } = useCurrentPosition();

  const { station } = props;
  const [isfavorite, setIsFavorite] = useState(false);
  function handleFavorite() {
    return setIsFavorite(!isfavorite);
  }
  return (
    <div className="stationInfo">
      <header>
        <h3 className="adressStation">
          {station.adresse} {station.ville}
        </h3>
        <p>
          <span className="circleColor" />
          Ouvert
        </p>
      </header>
      {/*
      <button type="button" onClick={handleFavorite}>
        <img
          className={
            isfavorite
              ? "isFavorite" && "imageFavorite"
              : "notFavorite" && "imageFavorite"
          }
          src={isfavorite ? fullStar : emptyStar}
          alt="favorite"
        />
      </button> */}
      <p className="stateStation">
        {!isNaN(calculDistance(currentPosition, station.geom)) &&
          `${calculDistance(currentPosition, station.geom)} km`}
      </p>
      <p>
        Prix moyens de tous les carburant{" "}
        {station.moyenne && Math.round(station.moyenne * 100) / 100}€
      </p>
    </div>
  );
}
StationsInfo.propTypes = {
  station: PropTypes.shape({
    adresse: PropTypes.string.isRequired,
    ville: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    geom: PropTypes.arrayOf(PropTypes.number).isRequired,
    carburants: PropTypes.arrayOf(
      PropTypes.shape({
        carburant: PropTypes.string.isRequired,
        prix: PropTypes.number.isRequired,
      })
    ),
    moyenne: PropTypes.number.isRequired,
  }).isRequired,
};

export default StationsInfo;

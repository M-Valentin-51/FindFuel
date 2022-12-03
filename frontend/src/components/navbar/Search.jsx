import React, { useState } from "react";
import PropTypes from "prop-types";
import loupe from "@assets/loupe.png";
import locationIcon from "@assets/localisation.png";
import axios from "axios";
import Filter from "@components/filter/Filter";
import FilterButton from "../filter/FilterButton";
import search from "./Image/search.png";
import location from "./Image/location.png";
import filter from "./Image/filter.png";

// context

import { useCurrentPosition } from "../../contexts/CurrentPositionContext";

function Search(props) {
  const { setCurrentPosition } = useCurrentPosition();

  const { setVille, eventFilterButton, isShown } = props;
  const [city, setCity] = useState("");

  function handleClick(e) {
    e.preventDefault();
    setVille(city);
    setCity("");
  }
  function handleValidation() {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentPosition([position.coords.latitude, position.coords.longitude]);
      if (position) {
        axios
          .get(
            `https://api-adresse.data.gouv.fr/reverse/?lon=${position.coords.longitude}&lat=${position.coords.latitude}`
          )
          .then((response) => {
            const location =
              response.data.features["0"].properties.city.toLowerCase();
            setVille(location);
          });
      }
    });
  }
  return (
    <>
      <form className="nav-search" onSubmit={(e) => handleClick(e)}>
        <button
          type="button"
          className="positionAsk"
          onClick={handleValidation}
        >
          <img src={location} alt="Location Ask" />
        </button>
        <input
          name="city"
          value={city}
          className="search"
          type="text"
          placeholder="Recherche"
          onChange={(event) => setCity(event.target.value)}
        />
        <button
          type="button"
          className="searchButton"
          onClick={(e) => handleClick(e)}
        >
          <img src={search} alt="Chercher" />
        </button>
        {/* <FilterButton eventFilterButton={eventFilterButton} /> */}
      </form>
      <button
        onClick={eventFilterButton}
        className="buttonFilter"
        type="button"
        disabled={isShown}
      >
        <img src={filter} alt="Filtre" />
      </button>
    </>
  );
}
Search.propTypes = {
  setVille: PropTypes.func.isRequired,
  eventFilterButton: PropTypes.func.isRequired,
  setCurrentPosition: PropTypes.func.isRequired,
};
export default Search;

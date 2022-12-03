import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../../style/filter.css";
// import sortAverage from "../../data/api";
import { getDataSort, sortAverage } from "../../data/api";

// context

import { useFuelList } from "../../contexts/FuelListContext";

function Buttons(props) {
  const { setFuelList } = useFuelList();

  const { filters, setFilters, setRayon, rayon } = props;

  const listRayons = ["10000", "20000", "30000", "40000", "50000"];

  function changeFilter(id) {
    if (id === "moinsChere") {
      setFilters({
        plusProche: false,
        moinsChere: true,
      });
      // setFuelList(sortAverage());
    } else {
      setFilters({
        plusProche: true,
        moinsChere: false,
      });
      // setFuelList(getDataSort());
    }
  }

  return (
    <>
      <div className="buttonContainer">
        <button
          id="moinsChere"
          type="button"
          className={`filterButtons ${
            filters.moinsChere && "filterButtonsActive"
          }`}
          onClick={(e) => {
            changeFilter(e.target.id);
          }}
        >
          Le moins cher
        </button>
        <button
          id="plusProche"
          type="button"
          className={`filterButtons ${
            filters.plusProche && "filterButtonsActive"
          }`}
          onClick={(e) => {
            changeFilter(e.target.id);
          }}
        >
          Le plus proche
        </button>
        <button type="button" className="filterButtons">
          Favoris
        </button>
      </div>
      <div className="select">
        <label htmlFor="d">Distance</label>
        <select onChange={(e) => setRayon(e.target.value)} className="select">
          {listRayons.map((elt) => {
            const select = elt === rayon;
            if (select) {
              return (
                <option key={elt} value={elt} selected>
                  {parseInt(elt) / 1000}
                </option>
              );
            }
            return (
              <option key={elt} value={elt}>
                {parseInt(elt) / 1000}
              </option>
            );
          })}
        </select>
        km
      </div>
    </>
  );
}
Buttons.propTypes = {
  filters: PropTypes.shape({
    plusProche: PropTypes.bool.isRequired,
    moinsChere: PropTypes.bool.isRequired,
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
  setRayon: PropTypes.func.isRequired,
  rayon: PropTypes.string.isRequired,
};

export default Buttons;

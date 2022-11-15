import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../../style/filter.css";
// import sortAverage from "../../data/api";
import { getDataSort, sortAverage } from "../../data/api";

function Buttons(props) {
  const [select, setSelect] = useState(true);
  const { filters, setFilters, setFuelList, setRayon } = props;
  function changeFilter(id) {
    if (id === "moinsChere") {
      setFilters({
        plusProche: false,
        moinsChere: true,
      });
      setFuelList(sortAverage());
    } else {
      setFilters({
        plusProche: true,
        moinsChere: false,
      });
      setFuelList(getDataSort());
    }
  }

  return (
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
      <div>
        <select name="d" id="d" onChange={(e) => setRayon(e.target.value)}>
          <option value="10">10</option>
          <option value="20000">20</option>
          <option value="30000">30</option>
          <option value="40000">40</option>
          <option value="50000">50</option>
          <option value="60000">60</option>
        </select>
        <label htmlFor="d">Distance</label>
      </div>
    </div>
  );
}
Buttons.propTypes = {
  filters: PropTypes.shape({
    plusProche: PropTypes.bool.isRequired,
    moinsChere: PropTypes.bool.isRequired,
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
  setFuelList: PropTypes.func.isRequired,
  setRayon: PropTypes.func.isRequired,
};

export default Buttons;

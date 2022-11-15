import React from "react";
import PropTypes from "prop-types";
import "../../../style/filter.css";

function Buttons(props) {
  const { filters, setFilters } = props;

  function changeFilter(id) {
    console.log(id);
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
    </div>
  );
}
Buttons.propTypes = {
  filters: PropTypes.shape({
    plusProche: PropTypes.bool.isRequired,
    moinsChere: PropTypes.bool.isRequired,
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
};

export default Buttons;

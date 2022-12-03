import React, { useEffect, useState } from "react";
import "../../../style/filter.css";
import PropTypes from "prop-types";
import Fuels from "./Fuels";
import Buttons from "./Buttons";
import { displayData } from "../../data/api";

function Filter(props) {
  const {
    setIsShown,
    filters,
    setFilters,
    setFuelList,
    setRayon,
    rayon,
    value,
    setValue,
  } = props;

  return (
    <div className="containerFilter">
      <Fuels value={value} setValue={setValue} />
      <Buttons
        filters={filters}
        setFilters={setFilters}
        setRayon={setRayon}
        rayon={rayon}
      />
      <button
        type="button"
        className="close"
        onClick={() => {
          setIsShown(false);
          displayData(filters, value, setFuelList);
        }}
      >
        X
      </button>
    </div>
  );
}
Filter.propTypes = {
  setIsShown: PropTypes.func.isRequired,
  filters: PropTypes.shape({
    plusProche: PropTypes.bool.isRequired,
    moinsChere: PropTypes.bool.isRequired,
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
  setRayon: PropTypes.func.isRequired,
  rayon: PropTypes.string.isRequired,
};
export default Filter;

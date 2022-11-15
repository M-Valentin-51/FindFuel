import React from "react";
import "../../../style/filter.css";
import PropTypes from "prop-types";
import Fuels from "./Fuels";
import Buttons from "./Buttons";

function Filter(props) {
  const { setIsShown, filters, setFilters } = props;
  return (
    <div className="containerFilter">
      <Fuels />
      <Buttons filters={filters} setFilters={setFilters} />
      <button
        type="button"
        className="close"
        onClick={() => {
          setIsShown(false);
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
};
export default Filter;

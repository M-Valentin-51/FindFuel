import PropTypes from "prop-types";
import React from "react";
import "../../../style/itemsList.css";

function FuelItem(props) {
  const { fuel } = props;
  return (
    <div className={`figure id${fuel.carburantId}`}>
      <div>{fuel.carburant}</div>
      <p>{fuel.prix} €</p>
    </div>
  );
}

FuelItem.propTypes = {
  fuel: PropTypes.shape({
    carburant: PropTypes.string.isRequired,
    prix: PropTypes.number.isRequired,
    carburantId: PropTypes.string.isRequired,
  }).isRequired,
};

export default FuelItem;

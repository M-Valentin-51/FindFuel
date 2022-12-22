import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../../../style/filter.css";
import { sortFuel } from "../../data/api";

import { useFuelList } from "../../contexts/FuelListContext";

const fuelList = [
  { nameFuel: "Gazole", id: 1 },
  { nameFuel: "Ethanol E85", id: 3 },
  { nameFuel: "SP98 E5", id: 6 },
  { nameFuel: "SP95 E5", id: 2 },
  { nameFuel: "SP95 E10", id: 5 },
  { nameFuel: "GPLc", id: 4 },
];

function Fuel(props) {
  const { nameFuel, id } = props;
  return <option value={id}>{nameFuel}</option>;
}

Fuel.propTypes = {
  nameFuel: PropTypes.string.isRequired,
};

function Fuels({ value, setValue }) {
  const { setFuelList } = useFuelList();

  // state a mettre dans apps !!!!!
  // const [value, setValue] = useState(null);

  useEffect(() => {
    // sortFuel(value, setFuelList);
  }, [value]);
  return (
    <div className="select">
      <select
        className="select"
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
      >
        <option value={0}>Choisi un carburant</option>
        {fuelList.map((fuel) => (
          <Fuel key={fuel.nameFuel} nameFuel={fuel.nameFuel} id={fuel.id} />
        ))}
      </select>
    </div>
  );
}
export default Fuels;

import PropTypes from "prop-types";
import Station from "./Station";
import "../../../style/itemsList.css";

// context

import { useFuelList } from "../../contexts/FuelListContext";

function StationListing(props) {
  const { fuelList } = useFuelList();

  return (
    <section className="listing">
      {fuelList.map((station) => (
        <Station key={station.id} station={station} />
      ))}
    </section>
  );
}

export default StationListing;

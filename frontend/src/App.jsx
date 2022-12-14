import React, { useState } from "react";
import axios from "axios";
import NavBar from "./components/navbar/NavBar";
import StationListing from "./components/ItemsList/StationListing";
import Leaflet from "./components/map/Leaflet";
import "./App.css";
import "../style/itemsList.css";
import "../style/leaflet.css";
import { getData, getDataSort, sortAverage } from "./data/api";
import Filter from "./components/filter/Filter";

// context

import { useFuelList } from "./contexts/FuelListContext";
// fin context

function App() {
  const { setFuelList } = useFuelList();

  const [city, setCity] = useState("reims");
  const [isShown, setIsShown] = useState(false);
  const [pointGeo, setPointGeo] = useState([49.259037, 4.031781]);
  const [visible, setVisible] = useState(false);
  const [rayon, setRayon] = useState("10000");
  const [geofilter, setGeoFilter] = useState(`${pointGeo} , ${rayon}`);
  const [value, setValue] = useState(null);
  const [filters, setFilters] = useState({
    plusProche: true,
    moinsChere: false,
  });

  const withScreen = window.screen.availWidth;

  const eventFilterButton = () => {
    setIsShown(!isShown);
  };

  const row = 4000;
  // const url = `https://data.economie.gouv.fr/api/records/1.0/search/?dataset=prix-carburants-fichier-instantane-test-ods-copie&q=${city}&rows=${row}&facet=id&facet=adresse&facet=ville&facet=prix_maj&facet=prix_nom&facet=services_service&facet=horaires_automate_24_24&refine.prix_maj=2022`;
  const urlGeoDistance = `https://data.economie.gouv.fr/api/records/1.0/search/?dataset=prix-carburants-fichier-instantane-test-ods-copie&rows=${row}&facet=id&facet=adresse&facet=ville&facet=prix_maj&facet=prix_nom&facet=com_arm_name&facet=epci_name&facet=dep_name&facet=reg_name&facet=services_service&facet=horaires_automate_24_24&refine.prix_maj=2022&geofilter.distance=${geofilter}`;
  // 49.242, 4.082, 10000

  React.useEffect(() => {
    axios
      .get(`https://api-adresse.data.gouv.fr/search/?q=${city}`)
      .then((res) => {
        const geo = res.data.features[0].geometry.coordinates;
        setGeoFilter(`${geo[1]} , ${geo[0]} , ${rayon}`);
        setPointGeo([geo[1], geo[0]]);
      });
  }, [city]);

  React.useEffect(() => {
    getData(urlGeoDistance, setFuelList, filters, value);
  }, [geofilter]);

  React.useEffect(() => {
    setGeoFilter(`${pointGeo} , ${rayon}`);
  }, [rayon]);

  /*
  React.useEffect(() => {
    if (filters.moinsChere) {
      setFuelList(sortAverage());
    }
  }, [filters]); */

  function changeView() {
    if (visible) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }
  React.useEffect(() => {
    if (withScreen >= 800) {
      changeView();
    }
  }, []);

  return (
    <div className="App">
      {isShown && (
        <Filter
          setIsShown={setIsShown}
          filters={filters}
          setFilters={setFilters}
          setFuelList={setFuelList}
          setRayon={setRayon}
          rayon={rayon}
          value={value}
          setValue={setValue}
        />
      )}
      <Leaflet geo={pointGeo} rayon={rayon} />
      <button type="button" className="buttonList" onClick={() => changeView()}>
        {visible ? "???" : "???"}
      </button>
      {visible && <StationListing />}
      <NavBar
        setVille={setCity}
        eventFilterButton={eventFilterButton}
        isShown={isShown}
      />
    </div>
  );
}
export default App;

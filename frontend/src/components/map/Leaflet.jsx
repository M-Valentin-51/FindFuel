import {
  Circle,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import * as L from "leaflet";
import PropTypes, { number } from "prop-types";
import "../../../style/leaflet.css";

function ChangeView(props) {
  const { center, zoom } = props;
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

function Leaflet(props) {
  const { fuelList, geo, rayon } = props;
  const LeafIcon = L.Icon.extend({
    options: {},
  });

  function changeColor(index) {
    if (index < fuelList.length / 3) {
      return new LeafIcon({
        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png`,
      });
    }
    if (index < (fuelList.length / 3) * 2) {
      return new LeafIcon({
        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png`,
      });
    }
    return new LeafIcon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png`,
    });
  }
  return (
    <MapContainer center={geo} zoom={12} scrollWheelZoom className="container">
      <ChangeView center={geo} zoom={11} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Circle center={geo} radius={rayon} pathOptions={{ color: "red" }} />
      <p className="leaflet-bottom rayon">rayon = {rayon / 1000} km</p>
      <Marker key="position" position={geo} />
      {fuelList.map((fuel, index) => (
        <Marker key={fuel.id} position={fuel.geom} icon={changeColor(index)}>
          <Popup className="popup">
            <section>
              <p>
                {fuel.adresse} {fuel.ville}
              </p>
              <div>
                {fuel.carburants.map((elt) => {
                  const date = new Date(elt.date);
                  return (
                    <div className={` figure id${elt.carburantId}`}>
                      <p>{elt.carburant}</p>
                      <p>{elt.prix} €</p>
                      <p>{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`}</p>
                    </div>
                  );
                })}
              </div>
            </section>
          </Popup>
        </Marker>
      ))}{" "}
    </MapContainer>
  );
}
Leaflet.propTypes = {
  fuelList: PropTypes.arrayOf(
    PropTypes.shape({
      adresse: PropTypes.string.isRequired,
      ville: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      geom: PropTypes.arrayOf(PropTypes.number).isRequired,
      carburants: PropTypes.arrayOf(
        PropTypes.shape({
          carburant: PropTypes.string.isRequired,
          prix: PropTypes.number.isRequired,
        })
      ),
    }).isRequired
  ).isRequired,
  geo: PropTypes.arrayOf(number).isRequired,
  rayon: PropTypes.string.isRequired,
};

ChangeView.propTypes = {
  center: PropTypes.arrayOf(number).isRequired,
  zoom: PropTypes.number.isRequired,
}.isRequired;

export default Leaflet;

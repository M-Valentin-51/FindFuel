import axios from "axios";

let data;
let dataSort;
let dataSortAverage;
let currentData;

function sortData() {
  dataSort = [];

  data.forEach((fuel) => {
    const index = dataSort.findIndex((elt) => elt.id === fuel.fields.id);

    if (index < 0) {
      dataSort.push({
        id: fuel.fields.id,
        adresse: fuel.fields.adresse,
        ville: fuel.fields.ville.toLowerCase(),
        geom: fuel.fields.geom,
        carburants: [
          {
            carburant: fuel.fields.prix_nom,
            carburantId: fuel.fields.prix_id,
            prix: fuel.fields.prix_valeur,
            date: fuel.fields.prix_maj,
          },
        ],
      });
    } else {
      dataSort[index].carburants.push({
        carburant: fuel.fields.prix_nom,
        carburantId: fuel.fields.prix_id,
        prix: fuel.fields.prix_valeur,
        date: fuel.fields.prix_maj,
      });
    }
  });
  /*
  const regex = new RegExp(`^${city.toLowerCase()}`, "g");
  const dataSortCity = dataSort.filter((station) => station.ville.match(regex));
  setPointGeo(dataSortCity[0].geom);
  return dataSortCity;
  */
  // setPointGeo(dataSort[0].geom);
  dataSort = average();
  currentData = [...dataSort];
  return dataSort;
}

function average() {
  const arr = [];
  const sum = (station) => {
    let somme = 0;
    const num = station.carburants.length;

    station.carburants.forEach((carburant) => {
      somme += carburant.prix;
    });

    return somme / num;
  };

  dataSort.forEach((station) => {
    const moyenne = sum(station);
    const newStation = { ...station, moyenne };
    arr.push(newStation);
  });

  return arr;
}

function sortAverage() {
  dataSortAverage = [...dataSort];
  const sortAverage = dataSortAverage.sort((a, b) => {
    return a.moyenne - b.moyenne;
  });
  currentData = [...sortAverage];
  return sortAverage;
}

function getDataSort() {
  currentData = [...dataSort];
  return dataSort;
}

export function sortFuel({ filter, setFuelList }) {
  if (filter) {
    const dd = currentData.filter((station) => {
      const i = station.carburants.find(
        (carbur) => carbur.carburantId == filter
      );
      if (i) {
        return true;
      }
    });

    setFuelList(dd);
  } else {
    setFuelList(currentData);
  }
}

function getData(url, setFuelList, filters) {
  axios.get(url).then((response) => {
    data = response.data.records;
    dataSort = [];
    dataSortAverage = [];
    sortData();

    if (filters.moinsChere) {
      setFuelList(sortAverage());
    } else {
      setFuelList(dataSort);
    }
  });
}

export { getData, sortAverage, getDataSort };

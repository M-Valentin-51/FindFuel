import axios from "axios";

let data;
let dataSort;
// let dataSortAverage;
let currentData;
/**
 * @description Format les données
 * @returns {[{station}...]} Retourne un tableau d'object contenant des stations
 */
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

/**
 * @description Ajout du prix moyen des carburants a chaque station
 * @returns {[{station}...]} Tableau de station avec le prix moyen
 */
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

/**
 *
 * @returns {[{station}...]} Retourne un tableau de stations trier par
 * odre croissant par rapport au prix moyen de la statoin
 */
function sortAverage(carburanId, data) {
  // console.log(data);
  if (carburanId == null) {
    const dataSortAverage = [...dataSort];
    const sortAverage = dataSortAverage.sort((a, b) => {
      return a.moyenne - b.moyenne;
    });
    currentData = [...sortAverage];
    return sortAverage;
  }
  if (carburanId) {
    const dataSortAverage = [...data];
    const sortAverage = dataSortAverage.sort((a, b) => {
      return (
        a.carburants.find((elt) => elt.carburantId == carburanId).prix -
        b.carburants.find((elt) => elt.carburantId == carburanId).prix
      );
    });
    currentData = [...sortAverage];
    return sortAverage;
  }
}

/**
 * @return {[{station}...]} Retourn un tableau d'object de stations
 */
function getDataSort() {
  currentData = [...dataSort];
  return dataSort;
}

/**
 *
 * @param {number} filter
 * @param {function() : void} setFuelList [option]
 */
export function sortFuel(filter) {
  if (filter) {
    const dd = dataSort.filter((station) => {
      const i = station.carburants.find(
        (carbur) => carbur.carburantId == filter
      );
      if (i) {
        return true;
      }
    });
    return dd;
    // setFuelList(dd);
  }
  // setFuelList(currentData);
  return currentData;
}

/**
 *
 * @param {[{plusProche : boolean , moinsChere :boolean}]} buttonFilter Boutton plus proche ou moin chere selectionnée
 * @param {number} fuelSelect Id du carburant selectionnée
 * @param {function() : void} setFuelList
 */
function displayData(buttonFilter, fuelSelect, setFuelList) {
  const { plusProche, moinsChere } = buttonFilter;

  if (!fuelSelect) {
    if (moinsChere) {
      setFuelList(sortAverage());
    } else {
      setFuelList(dataSort);
    }
  } else if (moinsChere) {
    const dataFuelFilterById = sortFuel(fuelSelect);
    setFuelList(sortAverage(fuelSelect, dataFuelFilterById));
    /*
    sortAverage();
    sortFuel(fuelSelect, setFuelList);
    */
  } else {
    setFuelList(sortFuel(fuelSelect));
  }
}

/**
 *
 * @param {String} url
 * @param {function() : void} setFuelList
 * @param {[{plusProche : boolean , moinsChere : boolean}]} filters
 * @param  {number} fuelFilter
 */
function getData(url, setFuelList, filters, fuelFilter) {
  axios.get(url).then((response) => {
    data = response.data.records;
    dataSort = [];
    // dataSortAverage = [];
    sortData();

    if (!fuelFilter) {
      if (filters.moinsChere) {
        setFuelList(sortAverage());
      } else {
        setFuelList(dataSort);
      }
    } else if (filters.moinsChere) {
      sortAverage();
      sortFuel(fuelFilter, setFuelList);
    } else {
      sortFuel(fuelFilter, setFuelList);
    }
  });
}

export { getData, sortAverage, getDataSort, displayData };

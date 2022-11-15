import axios from "axios";

let data;
let dataSort;

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
  //setPointGeo(dataSort[0].geom);
  return dataSort;
}

function average() {
  const sum = (station) => {
    let somme = 0;
    const num = station.carburants.length;

    station.carburants.forEach((carburant) => {
      somme += carburant.prix;
    });

    return somme / num;
  };

  dataSort.forEach((station, index) => {
    const moyenne = sum(station);
    dataSort[index]["moyenne"] = moyenne;
  });
}

function sortAverage(setData) {
  console.log("average");
  dataSort = dataSort.sort((a, b) => {
    return a.moyenne - b.moyenne;
  });
  setData(dataSort);
}

export default function getData(url, setData, city, setPointGeo) {
  axios.get(url).then((response) => {
    data = response.data.records;
    setData(sortData());
    average();
  });
}

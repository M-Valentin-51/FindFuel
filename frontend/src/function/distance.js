
const earthRadiusInKm = 6371;
const degreeToRadian = (degree) => (Math.PI * degree) / 180;

const sphericToCartesian = ([latitude, longitude]) => [
  earthRadiusInKm *
    Math.cos(degreeToRadian(latitude)) *
    Math.cos(degreeToRadian(longitude)),
  earthRadiusInKm *
    Math.cos(degreeToRadian(latitude)) *
    Math.sin(degreeToRadian(longitude)),
  earthRadiusInKm * Math.sin(degreeToRadian(latitude)),
];

export function calculDistance([currentLat , currentLong ], [latB, longB]){

  const [myX, myY, myZ] = sphericToCartesian([
    currentLat,
    currentLong,
  ]);

  const [stationX, stationY, stationZ] = sphericToCartesian([latB , longB])


  const distance = Math.sqrt((myX - stationX) ** 2 + (myY - stationY) ** 2 + (myZ - stationZ) ** 2)

  return (Math.round(distance * 100) / 100);
}


// Haversine formula
function getDistanceFromLatLon(
  lat1:number,lon1:number, lat2:number, lon2:number) {
  const R = 6371; // Radius of Earth
  const toRad = (deg:number) :number => deg * Math.PI / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance; // Distance in kilometers
}

export default getDistanceFromLatLon;
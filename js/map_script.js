// Initialize the map
const map = L.map('map').setView([40,10], 2);

// Map from Leaflet
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// call iNaturalist API to get observations
fetch('https://api.inaturalist.org/v1/observations?taxon_id=39665&order=desc&order_by=created_at')
  .then(res => res.json())
  .then(data => {
    data.results.forEach(obs => {
      if (obs.geojson) {
        const lat = obs.geojson.coordinates[1];
        const lng = obs.geojson.coordinates[0];
        const title = obs.species_guess || "Observation";
        const user = obs.user?.login || "anonyme";
        const date = obs.observed_on || "date inconnue";

        L.marker([lat, lng])
          .addTo(map)
          .bindPopup(`<b>${title}</b><br>par ${user}<br>${date}`);
      }
    });
  })
  .catch(err => console.error("Erreur API iNaturalist :", err));

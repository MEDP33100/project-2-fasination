async function loadMap() {
  const res = await fetch("/data/animals.json");
  const data = await res.json();
  const animals = data.animals || data; // support full array or { animals: [...] }

  const map = L.map("map").setView([40.7128, -74.006], 11);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

  const shelters = {};

  animals.forEach(animal => {
    const shelterName = animal.shelter;
    if (!shelters[shelterName]) {
      shelters[shelterName] = {
        animals: [],
        lat: 40.7 + Math.random() * 0.1,
        lng: -74 + Math.random() * 0.1
      };
    }
    shelters[shelterName].animals.push(animal);
  });

  Object.entries(shelters).forEach(([name, info]) => {
    L.marker([info.lat, info.lng])
      .addTo(map)
      .bindPopup(`<b>${name}</b><br>${info.animals.length} animals`)
      .on("click", () => showAnimals(info.animals));
  });

  document.getElementById("mapContainer").style.display = "block";
  document.getElementById("chartContainer").style.display = "none";
}

function showAnimals(animals) {
  const animalList = document.getElementById("animalList");
  animalList.innerHTML = "";

  animals.forEach(animal => {
    const card = document.createElement("div");
    card.className = "animal-card";
    card.innerHTML = `
      <img src="${animal.photos[0]?.medium || 'https://via.placeholder.com/150'}" alt="${animal.name}" />
      <h4>${animal.name}</h4>
      <p>${animal.species} - ${animal.breed}</p>
    `;
    animalList.appendChild(card);
  });

  document.getElementById("animalModal").style.display = "block";
}

window.loadMap = loadMap;

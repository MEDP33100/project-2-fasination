document.getElementById("mapContainer").style.display = "none";
document.getElementById("chartContainer").style.display = "none";

// Modal close logic
document.getElementById("closeModal").onclick = function () {
  document.getElementById("animalModal").style.display = "none";
};

window.onclick = function (event) {
  const modal = document.getElementById("animalModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

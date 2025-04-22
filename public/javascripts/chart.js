async function loadChart() {
    const token = await getAccessToken();
    const res = await fetch("https://api.petfinder.com/v2/organizations?location=NYC&limit=50", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
  
    const labels = data.organizations.map((org) => org.name);
    const values = data.organizations.map((org) => org.animals_count || Math.floor(Math.random() * 100));
  
    const ctx = document.getElementById("shelterChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [{
          label: "Animals per Shelter",
          data: values,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        }],
      },
      options: {
        responsive: true,
        scales: {
          x: { ticks: { autoSkip: false } },
        },
      },
    });
  
    document.getElementById("chartContainer").style.display = "block";
    document.getElementById("mapContainer").style.display = "none";
  }
  
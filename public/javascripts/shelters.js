let currentView = "bar"; 

document.addEventListener("DOMContentLoaded", async () => {
  const data = await d3.json("/data/animals.json");

  const dropdown = document.getElementById("filterType");
  const sorter = document.getElementById("sortAge");
  const toggle = document.getElementById("toggleView");

  function updateChart(filteredData) {
    d3.select("#chart").html(""); 
    const svg = d3.select("#chart")
      .append("svg")
      .attr("width", 600)
      .attr("height", 400);

    if (currentView === "bar") {
      svg.selectAll("rect")
        .data(filteredData)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * 6)
        .attr("y", d => 400 - d.age * 20)
        .attr("width", 5)
        .attr("height", d => d.age * 20)
        .attr("fill", d => d.type === "Cat" ? "orange" : d.type === "Dog" ? "blue" : "green");
    } else {
      const typeCounts = d3.rollup(filteredData, v => v.length, d => d.type);
      const pie = d3.pie().value(d => d[1]);
      const arc = d3.arc().innerRadius(0).outerRadius(150);

      const g = svg.append("g").attr("transform", "translate(300,200)");

      g.selectAll("path")
        .data(pie(typeCounts))
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", d => d.data[0] === "Cat" ? "orange" : d.data[0] === "Dog" ? "blue" : "green");
    }
  }

  function applyFilters() {
    let filtered = [...data];

    const selectedType = dropdown.value;
    if (selectedType !== "All") {
      filtered = filtered.filter(d => d.type === selectedType);
    }

    const sortBy = sorter.value;
    filtered.sort((a, b) => sortBy === "asc" ? a.age - b.age : b.age - a.age);

    updateChart(filtered);
  }

  dropdown.addEventListener("change", applyFilters);
  sorter.addEventListener("change", applyFilters);
  toggle.addEventListener("click", () => {
    currentView = currentView === "bar" ? "pie" : "bar";
    applyFilters();
  });

  applyFilters(); 
});

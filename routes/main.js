fetch('/api/animals')
  .then(res => res.json())
  .then(data => {
    console.log("API returned:", data);
    
    // D3
    d3.select("#visualization")
      .selectAll("div")
      .data(data)
      .enter()
      .append("div")
      .text(d => `${d.name} is a ${d.age}-year-old ${d.type} (${d.status})`);
  });

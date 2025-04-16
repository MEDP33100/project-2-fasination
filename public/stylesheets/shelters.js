d3.json("/data/animals.json").then((data) => {
    const speciesCount = d3.rollup(
      data,
      v => v.length,
      d => d.species
    );
  
    const chartData = Array.from(speciesCount, ([species, count]) => ({ species, count }));
  
    const width = 400;
    const height = 300;
  
    const svg = d3.select("#chart")
                  .append("svg")
                  .attr("width", width)
                  .attr("height", height);
  
    const x = d3.scaleBand()
                .domain(chartData.map(d => d.species))
                .range([0, width])
                .padding(0.2);
  
    const y = d3.scaleLinear()
                .domain([0, d3.max(chartData, d => d.count)])
                .range([height, 0]);
  
    svg.selectAll("rect")
       .data(chartData)
       .enter()
       .append("rect")
       .attr("x", d => x(d.species))
       .attr("y", d => y(d.count))
       .attr("width", x.bandwidth())
       .attr("height", d => height - y(d.count))
       .attr("fill", "#6c63ff");
  
    svg.selectAll("text")
       .data(chartData)
       .enter()
       .append("text")
       .text(d => d.count)
       .attr("x", d => x(d.species) + x.bandwidth() / 2)
       .attr("y", d => y(d.count) - 5)
       .attr("text-anchor", "middle");
  });
  
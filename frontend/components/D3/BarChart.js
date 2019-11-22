import { useEffect } from "react";
import * as d3 from "d3";

const BarChart = () => {
  const drawChart = () => {
    const data = [
      {
        fruit: "Apple",
        size: 12
      },
      {
        fruit: "Sinas",
        size: 14
      },
      {
        fruit: "Peer",
        size: 20
      }
    ];

    // Global
    const width = 500;
    const height = 500;
    const dataName = "size";

    // Scales
    const widthScale = d3
      .scaleLinear()
      .domain([0, d3.max(data.map(d => d[dataName]))])
      .range([0, width]);

    const colorScale = d3
      .scaleLinear()
      .domain([0, d3.max(data.map(d => d[dataName]))])
      .range(["#3498db", "#e67e22"]); // As closer to the smallest value, the first value will be used

    const axisBottom = d3
      .axisBottom()
      .scale(widthScale)
      .ticks(5);

    // Drawing
    const canvas = d3
      .select("#bar-chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(50, 50)");

    canvas
      .selectAll("g") // this creates an empty selection where we can bind the data to
      .data(data) // bind the data
      .enter() // this contains an empty selection with three placeholders
      .append("g")
      .append("rect")
      .attr("width", dataEl => widthScale(dataEl.size)) // loop over every element and return the value of the given array
      .attr("height", 40)
      .attr("y", (_, i) => i * 50)
      .attr("fill", dataEl => colorScale(dataEl.size));

    canvas
      .append("g")
      .attr("transform", "translate(0, 160)")
      .call(axisBottom);

    canvas
      .selectAll("g") // this creates an empty selection where we can bind the data to
      .append("text")
      .attr("transform", (_, i) => `translate(20, ${i * 50 + 23})`)
      .attr("font-size", "1.23em")
      // .text(dataEl => `${dataEl.size} ${dataEl.fruit}`)
      .attr("fill", "white");
  };

  useEffect(() => {
    drawChart();
  }, []);

  return <div id="bar-chart"></div>;
};

export default BarChart;

import { useEffect } from "react";
import * as d3 from "d3";

const BarChart = ({ data, currentKey }) => {
  const drawChart = () => {
    if (!data) return null;

    const barHeight = 40;
    const barMargin = 50;

    const baseWidth = 500;

    const margin = { top: 20, right: 30, bottom: 40, left: 90 };
    const width = baseWidth - margin.left - margin.right;
    const height =
      data.reduce((prevValue, _, i) => (prevValue = i * 50)) + margin.bottom;

    // Scales
    const widthScale = d3
      .scaleLinear()
      .domain([0, d3.max(data.map(d => d[currentKey]))])
      .range([0, width]);

    const colorScale = d3
      .scaleLinear()
      .domain([0, d3.max(data.map(d => d[currentKey]))])
      .range(["#3498db", "#e67e22"]); // As closer to the smallest value, the first value will be used

    const axisBottom = d3
      .axisBottom()
      .scale(widthScale)
      .ticks(5);

    // Drawing
    const canvas = d3
      .select("#bar-chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(20, ${margin.top})`);

    canvas
      .selectAll("g") // this creates an empty selection where we can bind the data to
      .data(data) // bind the data
      .enter() // this contains an empty selection with three placeholders
      .append("g")
      .append("rect")
      .attr("width", dataEl =>
        widthScale(Number(dataEl.Freedom) > 0 ? Number(dataEl.Freedom) : 0)
      ) // loop over every element and return the value of the given array
      .attr("height", barHeight)
      .attr("y", (_, i) => i * 50)
      .attr("fill", dataEl => colorScale(Number(dataEl.Freedom)));

    canvas
      .append("g")
      .attr("transform", `translate(0, ${height + 10})`)
      .call(axisBottom);

    canvas
      .selectAll("g") // this creates an empty selection where we can bind the data to
      .append("text")
      .attr("transform", (_, i) => `translate(20, ${i * 50 + 23})`)
      .attr("font-size", "1.23em")
      .text(dataEl =>
        dataEl ? `${currentKey}: ${dataEl[currentKey]}` : `skip`
      )
      .attr("fill", "white");
  };

  const clearCurrentChart = () => {
    const svg = d3.select("#bar-chart");
    svg.selectAll("*").remove();
  };

  useEffect(() => {
    clearCurrentChart();
    drawChart();
  }, [currentKey]);

  return <div id="bar-chart"></div>;
};

export default BarChart;

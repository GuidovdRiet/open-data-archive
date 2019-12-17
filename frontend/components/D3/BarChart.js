import { useEffect } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data, currentKey }) => {
  const drawChart = () => {
    if (!data) return null;

    const barHeight = 32;
    const baseWidth = 500;

    const margin = { top: 20, right: 30, bottom: 40, left: 120 };
    const width = baseWidth - margin.left - margin.right;
    const height = data.reduce((prevValue, _, i) => (prevValue = i * barHeight)) + margin.bottom;

    // Scales
    const widthScale = d3
      .scaleLinear()
      .domain([0, d3.max(data.map(d => d[currentKey]))])
      .range([0, width]);

    const colorScale = d3
      .scaleLinear()
      .domain([0, d3.max(data.map(d => d[currentKey]))])
      .range(['#52BBCE', '#6057A6', '#D65E4F', '#44AD76']); // As closer to the smallest value, the first value will be used

    const heigthScale = d3
      .scaleBand()
      .domain(data.map(d => d.Country))
      .range([0, height]);

    const axisBottom = d3
      .axisBottom()
      .scale(widthScale)
      .ticks(5);

    const axisLeft = d3
      .axisLeft()
      .scale(heigthScale)
      .ticks(data.length);

    // Drawing
    const canvas = d3
      .select('#bar-chart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(150, ${margin.top})`);

    canvas
      .selectAll('g') // this creates an empty selection where we can bind the data to
      .data(data) // bind the data
      .enter() // this contains an empty selection with three placeholders
      .append('g')
      .append('rect')
      .attr('width', dataEl => widthScale(Number(dataEl[currentKey]))) // loop over every element and return the value of the given array
      .attr('height', barHeight)
      .attr('y', (_, i) => i * barHeight)
      .attr('fill', dataEl => colorScale(Number(dataEl[currentKey])));

    canvas
      .append('g')
      .attr('transform', `translate(0, ${height + 10})`)
      .call(axisBottom);

    canvas
      .append('g')
      .attr('transform', `translate(-10, 0)`)
      .call(axisLeft);

    canvas
      .selectAll('g') // this creates an empty selection where we can bind the data to
      .append('text')
      .attr('transform', (_, i) => `translate(20, ${i * barHeight})`)
      .attr('font-size', `${barHeight}px`)
      // .text(dataEl => (dataEl ? `${currentKey} ${dataEl[currentKey]}` : ''))
      .attr('fill', 'white');
  };

  const clearCurrentChart = () => {
    const svg = d3.select('#bar-chart');
    svg.selectAll('*').remove();
  };

  useEffect(() => {
    clearCurrentChart();
    drawChart();
  }, [currentKey]);

  return <div id="bar-chart"></div>;
};

export default BarChart;

import "./App.css";
import { max, scaleBand, scaleLinear } from "d3";
import { width, height, useData } from "./assets/useData";
import AxisBottom from "./assets/AxisBottom";
import AxisLeft from "./assets/AxisLeft";
import DataMarks from "./assets/DataMarks";
import { useState } from "react";

const margin = { top: 20, right: 20, bottom: 20, left: 200 };
const innerWidth = width - margin.right - margin.left;
const innerHeight = height - margin.top - margin.bottom;

/* const colorGenerator = () => {
  let colorMap = [];
  for (let i = 0; i < 200; i++) {
    const fill = `rgb(${parseInt(Math.random() * 255)},${parseInt(
      Math.random() * 255
    )},${parseInt(Math.random() * 255)})`;
    colorMap.push(fill);
  }
  console.log(colorMap);
};

colorGenerator(); */

function App() {
  const [numberOfCountries, setNumberOfCountries] = useState(20);
  // console.log(numberOfCountries);

  const data = useData();
  // console.log(data);

  const filteredData = data.filter((d, i) => i < numberOfCountries);
  console.log(filteredData);

  if (!filteredData) {
    return <pre>Loading data...</pre>;
  }

  const yValue = (d) => d.Country;
  const xValue = (d) => d.Population;

  const yScale = scaleBand()
    .domain(filteredData.map(yValue))
    .range([0, innerHeight]);

  /* console.log(yScale.domain()); */

  const xScale = scaleLinear()
    .domain([0, max(filteredData, xValue)])
    .range([0, innerWidth]);

  /* console.log(xScale.ticks()); */

  function handleChange(evt) {
    // console.log(evt.target.value);
    setNumberOfCountries(evt.target.value);
  }

  return (
    <>
      <form>
        <label>
          Set Number of Countries:
          <input
            type="number"
            id="countryListSize"
            name="countryListSize"
            min="1"
            max="235"
            onChange={handleChange}
          />
        </label>
        <button>Update Chart</button>
      </form>
      <svg height={height} width={width}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <AxisBottom xScale={xScale} innerHeight={innerHeight} />
          <AxisLeft yScale={yScale} innerWidth={innerWidth} />
          <DataMarks
            data={filteredData}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
          />
        </g>
      </svg>
    </>
  );
}

export default App;

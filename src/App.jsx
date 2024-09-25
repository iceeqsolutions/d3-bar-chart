import "./App.css";
import { max, scaleBand, scaleLinear } from "d3";
import useData from "./assets/useData";
import AxisBottom from "./assets/AxisBottom";
import AxisLeft from "./assets/AxisLeft";
import DataMarks from "./assets/DataMarks";
import { useState } from "react";

function App() {
  const [numberOfCountries, setNumberOfCountries] = useState(20);
  const coutriesAsNumbers = parseInt(numberOfCountries);

  const data = useData();

  if (!data) {
    return <pre>Loading data...</pre>;
  }

  const filteredData = data.filter((d, i) => i < coutriesAsNumbers);
  const width = 960;
  const height = 500 + (coutriesAsNumbers - 10) * 30;
  const margin = { top: 20, right: 20, bottom: 20, left: 240 };
  const innerWidth = width - margin.right - margin.left;
  const innerHeight = height - margin.top - margin.bottom;

  const yValue = (d) => d.Country;
  const xValue = (d) => d.Population;

  const yScale = scaleBand()
    .domain(filteredData.map(yValue))
    .range([0, innerHeight]);

  const xScale = scaleLinear()
    .domain([0, max(filteredData, xValue)])
    .range([0, innerWidth]);

  function handleChange(evt) {
    setNumberOfCountries(evt.target.value);
  }

  return (
    <>
      <div className="svgCanvas">
        <h2>Population by Country</h2>
        <form>
          <label>
            Set Number of Countries:
            <input
              type="number"
              id="countryListSize"
              name="countryListSize"
              min="1"
              max="235"
              placeholder="20"
              onChange={handleChange}
            />
          </label>
        </form>
        <svg height={height} width={width}>
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <AxisBottom xScale={xScale} innerHeight={innerHeight} />
            <AxisLeft
              yScale={yScale}
              innerWidth={innerWidth}
              coutriesAsNumbers={coutriesAsNumbers}
              height={height}
            />
            <DataMarks
              data={filteredData}
              xScale={xScale}
              yScale={yScale}
              xValue={xValue}
              yValue={yValue}
            />
          </g>
        </svg>
      </div>
    </>
  );
}

export default App;

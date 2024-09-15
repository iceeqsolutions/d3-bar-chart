import "./App.css";
import { max, scaleBand, scaleLinear } from "d3";
import { width, height, useData } from "./assets/useData";
import AxisBottom from "./assets/AxisBottom";
import AxisLeft from "./assets/AxisLeft";
import DataMarks from "./assets/DataMarks";

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
  const data = useData();

  if (!data) {
    return <pre>Loading data...</pre>;
  }

  const yValue = (d) => d.Country;
  const xValue = (d) => d.Population;

  const yScale = scaleBand().domain(data.map(yValue)).range([0, innerHeight]);

  /* console.log(yScale.domain()); */

  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth]);

  /* console.log(xScale.ticks()); */

  return (
    <svg height={height} width={width}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom xScale={xScale} innerHeight={innerHeight} />
        <AxisLeft yScale={yScale} innerWidth={innerWidth} />
        <DataMarks
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
        />
      </g>
    </svg>
  );
}

export default App;

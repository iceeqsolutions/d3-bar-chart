import "./App.css";
import { max, scaleBand, scaleLinear } from "d3";
import useData from "./assets/useData";
import AxisBottom from "./assets/AxisBottom";

const width = 960;
const height = 500;
const margin = { top: 20, right: 20, bottom: 20, left: 200 };
const innerWidth = width - margin.right - margin.left;
const innerHeight = height - margin.top - margin.bottom;

function App() {
  const data = useData();

  if (!data) {
    return <pre>Loading data...</pre>;
  }

  const yScale = scaleBand()
    .domain(data.map((d) => d.Country))
    .range([0, innerHeight]);

  /* console.log(yScale.domain()); */

  const xScale = scaleLinear()
    .domain([0, max(data, (d) => d.Population)])
    .range([0, innerWidth]);

  /* console.log(xScale.ticks()); */

  return (
    <svg height={height} width={width}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {/* {xScale.ticks().map((tick, i) => (
          <g key={i} transform={`translate(${xScale(tick)}, 0)`}>
            <line x1={0} y1={0} x2={0} y2={innerHeight} stroke="white" />
            <text
              dy=".71em"
              y={
                innerHeight + 6
              }
              x="0"
              style={{ textAnchor: "middle", stroke: "white" }}
            >
              {tick}
            </text>
          </g>
        ))} */}
        <AxisBottom xScale={xScale} innerHeight={innerHeight} />

        {yScale.domain().map((tick, i) => (
          <g key={i} transform={`translate(0, ${yScale(tick)})`}>
            {/* <line x1={innerWidth} y1={0} x2={0} y2={0} stroke="white" /> */}
            <text
              dy="2em"
              x={-6}
              style={{ textAnchor: "end", stroke: "white" }}
            >
              {tick}
            </text>
          </g>
        ))}

        {data.map((d, i) => (
          <rect
            key={i}
            x={0}
            y={yScale(d.Country)}
            width={xScale(d.Population)}
            height={yScale.bandwidth()}
            fill={`rgb(${parseInt(Math.random() * 255)},${parseInt(
              Math.random() * 255
            )},${parseInt(Math.random() * 255)})`}
          />
        ))}
      </g>
    </svg>
  );
}

export default App;

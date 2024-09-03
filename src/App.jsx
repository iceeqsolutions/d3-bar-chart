import "./App.css";
import { useEffect, useState } from "react";
import { csv, max, scaleBand, scaleLinear } from "d3";

const csvUrl =
  "https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv";

const width = 960;
const height = 500;
const margin = { top: 20, right: 20, bottom: 20, left: 20 };
const innerWidth = width - margin.right - margin.left;
const innerHeight = height - margin.top - margin.bottom;

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const row = (d) => {
      d.Population = +d["2020"];
      return d;
    };

    csv(csvUrl, row)
      .then((data) => data.filter((d, i) => i < 10))
      .then(setData);
  }, []);

  if (!data) {
    return <pre>Loading data...</pre>;
  }

  const yScale = scaleBand()
    .domain(data.map((d) => d.Country))
    .range([0, innerHeight]);

  const xScale = scaleLinear()
    .domain([0, max(data, (d) => d.Population)])
    .range([0, innerWidth]);

  return (
    <svg height={height} width={width}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {data.map((d, i) => (
          <rect
            key={i}
            x={0}
            y={yScale(d.Country)}
            width={xScale(d.Population)}
            height={yScale.bandwidth()}
            fill={"white"}
          />
        ))}
      </g>
    </svg>
  );
}

export default App;

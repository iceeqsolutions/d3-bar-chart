import "./App.css";
import { useEffect, useState } from "react";
import { csv, scaleBand } from "d3";

const csvUrl =
  "https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv";

const width = 960;
const height = 500;

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    csv(csvUrl).then(setData);
  }, []);

  if (!data) {
    return <pre>Loading data...</pre>;
  }

  const yScale = scaleBand()
    .domain(data.map(d => d.Country))
    .range([0, height]);
    
  return (
    <svg>
      {data.map(d => <rect x={0} y={yScale(d.Country)} width={} height={}/>)}
    </svg>
  );
}

export default App;

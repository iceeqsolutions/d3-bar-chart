import { useEffect, useState } from "react";
import { csv } from "d3";

const useData = (csvUrl) => {
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

  return data;
};

export default useData;

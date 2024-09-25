import { useEffect, useState } from "react";
import { csv } from "d3";

const csvUrl =
  "https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv";

// const numberOfCountries = document.getElementById("countryListSize");
// let amount = numberOfCountries.value;
// console.log(typeof amount);
// let number = parseInt(amount);
// console.log(typeof number);

const countryListSize = 15;
const width = 960;
const height = 500 + (countryListSize - 10) * 30;

const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const row = (d) => {
      d.Population = +d["2020"];
      return d;
    };

    csv(csvUrl, row)
      // .then((data) => data.filter((d, i) => i < countryListSize))
      .then(setData);
  }, []);

  return data;
};

export { width, height, countryListSize, useData };

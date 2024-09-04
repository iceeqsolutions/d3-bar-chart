const DataMarks = ({ data, xScale, yScale }) => {
  return data.map((d, i) => (
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
  ));
};

export default DataMarks;

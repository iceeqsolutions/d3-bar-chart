import colorList from "./colorList";

const DataMarks = ({ data, xScale, yScale, xValue, yValue }) => {
  return data.map((d, i) => (
    <rect
      key={i}
      x={0}
      y={yScale(yValue(d))}
      width={xScale(xValue(d))}
      height={yScale.bandwidth()}
      // fill={`rgb(${parseInt(Math.random() * 255)},${parseInt(
      //   Math.random() * 255
      // )},${parseInt(Math.random() * 255)})`}
      fill={colorList()[i]}
    />
  ));
};

export default DataMarks;

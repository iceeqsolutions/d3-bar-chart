const AxisLeft = ({ yScale, coutriesAsNumbers, height }) => {
  const dyValue = (height / coutriesAsNumbers) * 0.6;
  return yScale.domain().map((tick, i) => (
    <g key={i} transform={`translate(0, ${yScale(tick)})`}>
      <text dy={dyValue} x={-6} style={{ textAnchor: "end", stroke: "white" }}>
        {tick}
      </text>
    </g>
  ));
};

export default AxisLeft;

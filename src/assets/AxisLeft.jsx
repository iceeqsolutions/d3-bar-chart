const AxisLeft = ({ yScale, innerWidth }) => {
  return yScale.domain().map((tick, i) => (
    <g key={i} transform={`translate(0, ${yScale(tick)})`}>
      {/* <line x1={innerWidth} y1={0} x2={0} y2={0} stroke="white" /> */}
      <text dy="2em" x={-6} style={{ textAnchor: "end", stroke: "white" }}>
        {tick}
      </text>
    </g>
  ));
};

export default AxisLeft;

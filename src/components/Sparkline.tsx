import React from "react";

type SparklineProps = {
  data: number[];
};

const Sparkline: React.FC<SparklineProps> = ({ data }) => {
  if (data.length === 0) return null;

  const width = 200;
  const height = 40;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / range) * height;
      return [x, y];
    })
    .map(([x, y]) => `${x},${y}`)
    .join(" ");

  return (
    <svg
      width={width}
      height={height}
      aria-hidden="true"
      focusable="false"
      className="mx-auto my-1"
    >
      <polyline
        fill="none"
        stroke={`rgba(var(--cta))`}
        strokeWidth={2}
        points={points}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={width}
        cy={height - ((data[data.length - 1] - min) / range) * height}
        r={3}
        fill={`rgba(var(--cta))`}
        stroke={`rgba(var(--card))`}
        strokeWidth={1}
      />
    </svg>
  );
};

export default Sparkline;

import React from 'react';

export default function Logo({ width = 200, className = "", textColor = "var(--dark-jungle-green, #1E1E28)" }) {
  // 1 = dark, 2 = orange
  const grid = [
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 2, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 2, 2, 2, 1, 1, 1, 0],
    [1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1],
    [1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1],
    [1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1],
    [1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  const dotSize = 2;
  const spacing = 4.5;

  return (
    <svg 
      width={width} 
      viewBox="0 0 240 60" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'block' }}
    >
      {/* House Dots */}
      <g transform="translate(10, 10)">
        {grid.map((row, rIdx) => (
          row.map((cell, cIdx) => {
            if (cell === 0) return null;
            return (
              <circle 
                key={`${rIdx}-${cIdx}`}
                cx={cIdx * spacing} 
                cy={rIdx * spacing} 
                r={dotSize / 2} 
                fill={cell === 1 ? textColor : 'var(--orange-soda, #fe5d37)'} 
              />
            );
          })
        ))}
      </g>

      {/* Divider Line */}
      <rect x="75" y="10" width="1.5" height="40" fill="var(--orange-soda, #fe5d37)" rx="0.75" />

      {/* Text: RealDots */}
      <text 
        x="90" 
        y="34" 
        fontFamily="'Poppins', sans-serif" 
        fontWeight="700" 
        fontSize="28" 
        fill={textColor}
        letterSpacing="-0.5"
      >
        RealDots
      </text>

      {/* Text: PROPERTIES */}
      <text 
        x="92" 
        y="48" 
        fontFamily="'Poppins', sans-serif" 
        fontWeight="600" 
        fontSize="11" 
        fill="var(--orange-soda, #fe5d37)"
        letterSpacing="3"
      >
        PROPERTIES
      </text>
    </svg>
  );
}

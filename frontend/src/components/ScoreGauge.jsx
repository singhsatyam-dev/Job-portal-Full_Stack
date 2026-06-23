import { useState, useEffect } from "react";

const ScoreGauge = ({ score }) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const radius = 80;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const progress = animatedScore / 100;
  const strokeDashoffset = circumference - progress * circumference;

  const isGood = score >= 80;
  const color = isGood ? "#10b981" : score >= 60 ? "#f59e0b" : "#ef4444";
  const label = isGood
    ? "Excellent Match! 🎉"
    : score >= 60
      ? "Good — Some Improvements Needed"
      : "Needs Significant Improvement";

  useEffect(() => {
    let start = 0;
    const step = score / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [score]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="relative"
        style={{ width: radius * 2, height: radius * 2 }}
      >
        <svg
          width={radius * 2}
          height={radius * 2}
          style={{ transform: "rotate(-90deg)" }}
        >
          <circle
            cx={radius}
            cy={radius}
            r={normalizedRadius}
            stroke="rgba(255,255,255,0.07)"
            strokeWidth={stroke}
            fill="transparent"
          />
          <circle
            cx={radius}
            cy={radius}
            r={normalizedRadius}
            stroke={color}
            strokeWidth={stroke}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 0.05s linear",
              filter: `drop-shadow(0 0 8px ${color})`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-extrabold leading-none"
            style={{
              fontSize: "2.2rem",
              color,
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            {animatedScore}
          </span>
          <span
            className="text-xs mt-0.5"
            style={{ color: "var(--text-muted)" }}
          >
            / 100
          </span>
        </div>
      </div>

      <div
        className="px-5 py-2 rounded-full text-sm font-bold text-center"
        style={{
          background: `${color}22`,
          border: `1px solid ${color}55`,
          color,
        }}
      >
        {label}
      </div>
    </div>
  );
};

export default ScoreGauge;

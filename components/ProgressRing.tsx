import { Container } from "@/lib/types/Common";

interface ProgressRingProps extends Container {
  color: string;
  radius: number;
  stroke: number;
  running: boolean;
  progress: number;
}

export const ProgressRing = ({
  color,
  radius,
  stroke,
  running,
  progress,
  children,
}: ProgressRingProps) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = running ? circumference - (progress / 100) * circumference : 0;

  return (
    <div className="w-10 h-10 flex items-center justify-center text-main">
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={1}
          r={radius - 4}
          cx={radius}
          cy={radius}
        />
        {running && (
          <circle
            className="stroke-current"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + " " + circumference}
            style={{ strokeDashoffset }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        )}
      </svg>
      <div>{children}</div>
    </div>
  );
};

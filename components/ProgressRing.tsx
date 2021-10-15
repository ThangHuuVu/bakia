import { Container } from "@/lib/types/Common";

interface ProgressRingProps extends Container {
  radius?: number;
  strokeWidth: number;
  running: boolean;
  progress: number;
}

export const ProgressRing = ({
  radius = 20,
  strokeWidth,
  running,
  progress,
  children,
}: ProgressRingProps) => {
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = running ? circumference - (progress / 100) * circumference : 0;

  return (
    <div className={`w-10 h-10 relative ${running ? "text-main" : "text-black"}`}>
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="black"
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
            strokeWidth={strokeWidth}
            strokeDasharray={circumference + " " + circumference}
            style={{ strokeDashoffset }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        )}
      </svg>
      <div className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
        {children}
      </div>
    </div>
  );
};

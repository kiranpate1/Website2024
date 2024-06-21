import React from "react";
import { motion, useTransform, motionValue, useSpring } from "framer-motion";

type CornersProps = {
  color?: string;
  size: number;
  stroke: number;
};

const Corners = ({ color, size, stroke }: CornersProps) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full z-[1] pointer-events-none">
      <div
        className="absolute top-0 right-0 w-full h-full"
        style={{ borderColor: "#fff", borderWidth: `${stroke}px` }}
      />
      <div className="absolute top-0 left-0">
        <Corner color={color} size={size} stroke={stroke} />
      </div>
      <div className="absolute top-0 right-0 transform rotate-90">
        <Corner color={color} size={size} stroke={stroke} />
      </div>
      <div className="absolute bottom-0 left-0 transform -rotate-90">
        <Corner color={color} size={size} stroke={stroke} />
      </div>
      <div className="absolute bottom-0 right-0 transform rotate-180">
        <Corner color={color} size={size} stroke={stroke} />
      </div>
    </div>
  );
};

const Corner = ({ color, size, stroke }: CornersProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 116 116"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_487_446)">
        <path
          d="M40.2433 8.8323C55.6184 0.998278 75.7456 0.998279 116 0.998279V0H0V116H0.998279C0.998279 75.7456 0.998278 55.6184 8.8323 40.2433C15.7233 26.7189 26.7189 15.7233 40.2433 8.8323Z"
          fill="black"
        />
        <path
          d="M116.001 0.998047C75.7464 0.998047 55.6192 0.998047 40.244 8.83207C26.7197 15.7231 15.724 26.7187 8.83305 40.2431C0.999023 55.6182 0.999023 75.7454 0.999023 116"
          stroke="#fff"
          stroke-width={(116 / size) * stroke}
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_487_446">
          <rect width="116" height="116" fill="#fff" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Corners;

import React from "react";

type CornersProps = {
  color?: string;
  size: number;
};

const Circle = ({ color, size }: CornersProps) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full z-[1] pointer-events-none"></div>
  );
};

export default Circle;

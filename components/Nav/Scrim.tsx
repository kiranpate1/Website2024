import React from "react";
import "./GradientBlur.css";

type Props = {
  isMobile: boolean;
};

const Scrim = ({ isMobile }: Props) => {
  return (
    <div
      className="absolute w-full h-full pointer-events-none flex flex-col justify-between items-stretch"
      style={{
        visibility: isMobile ? "visible" : "hidden",
      }}
    >
      <Blur size={40} direction="up" />
      <Blur size={15} direction="down" />
    </div>
  );
};

export default Scrim;

type BlurProps = {
  size: number;
  direction: "up" | "down";
};

const Blur = ({ size, direction }: BlurProps) => {
  return (
    <div
      className="gradient-blur"
      style={{
        height: size + "vw",
        zIndex: 0,
        backgroundImage:
          "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)",
        transform: direction === "down" ? "rotate(180deg)" : "none",
      }}
    >
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

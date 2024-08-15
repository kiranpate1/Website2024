import React from "react";
import "./GradientBlur.css";

type Props = {
  isMobile: boolean;
};

const Scrim = ({ isMobile }: Props) => {
  return (
    <div
      className="absolute w-full h-full pointer-events-none flex flex-col justify-between items-stretch"
      style={{ flexDirection: isMobile ? "column" : "row" }}
    >
      <Blur size={40} direction="up" isMobile={isMobile} />
      <Blur size={15} direction="down" isMobile={isMobile} />
    </div>
  );
};

export default Scrim;

type BlurProps = {
  size: number;
  direction: "up" | "down";
  isMobile: boolean;
};

const Blur = ({ size, direction, isMobile }: BlurProps) => {
  return (
    <div
      className="gradient-blur"
      style={{
        // visibility: isMobile ? "visible" : "hidden",
        height: isMobile ? size + "vw" : "auto",
        width: isMobile ? "auto" : "10vw",
        zIndex: 0,
        backgroundImage: `linear-gradient(${
          isMobile ? 180 : 90
        }deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.03) 90%, rgba(0,0,0,0) 100%)`,
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

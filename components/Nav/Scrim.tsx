import React from "react";

type Props = {
  isMobile: boolean;
};

const Scrim = ({ isMobile }: Props) => {
  return (
    <div
      className="absolute w-full h-full pointer-events-none"
      style={{
        visibility: isMobile ? "visible" : "hidden",
      }}
    >
      <div
        className="absolute w-full h-[40vw] top-0 left-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)",
        }}
      />
      <div
        className="absolute w-full h-[15vw] bottom-0 left-0"
        style={{
          backgroundImage:
            "linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)",
        }}
      />
    </div>
  );
};

export default Scrim;

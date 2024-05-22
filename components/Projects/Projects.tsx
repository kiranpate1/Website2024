import React, { MutableRefObject, useRef, useState } from "react";
import Image from "next/image";
import { motion, useTransform, motionValue, useSpring } from "framer-motion";

type ProjectsProps = {};

const Projects = (props: ProjectsProps) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [normalizedPosition, setNormalizedPosition] = useState({ x: 0, y: 0 });
  const divRef = useRef() as MutableRefObject<HTMLDivElement | null>;

  const handleMouseMove = (event: { clientX: number; clientY: number }) => {
    const rect = divRef.current?.getBoundingClientRect();
    if (!rect) return; // Add null check

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;

    // Update the cursor position
    setCursorPosition({ x, y });

    // Normalize the cursor position
    setNormalizedPosition({
      x: x / width,
      y: y / height,
    });
  };

  const handleMouseEnter = () => {
    // Code to execute when the mouse enters the div element
  };

  const handleMouseLeave = () => {
    // Code to execute when the mouse leaves the div element
  };

  const scaleY1 = useTransform(
    motionValue(normalizedPosition.y),
    (latest: number) => latest * 1
  );
  const scaleY2 = useTransform(
    motionValue(normalizedPosition.y),
    (latest: number) => latest * 1
  );

  const y1 = useSpring(scaleY1, {
    stiffness: 400,
    damping: 100,
    // mass: item.desktopWidth * 0.05,
  });
  const y2 = useSpring(scaleY2, {
    stiffness: 400,
    damping: 100,
    // mass: item.desktopWidth * 0.05,
  });

  return (
    <div>
      <h1>Hello & welcome</h1>
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <div
          className="relative w-[600px] h-[400px] border-white border-2"
          ref={divRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="absolute flex flex-col top-0 left-0 w-full h-full">
            <div className="w-full h-full bg-white" />
            <div className="flex">
              <motion.svg
                className="w-full scale-x-[-1]"
                viewBox="0 0 383 108"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  scaleY: y1,
                  scaleX: -1,
                }}
              >
                <path d="M383 0C225 0 155 107.5 0 107.5V0H383Z" fill="white" />
              </motion.svg>
              <motion.svg
                className="w-full"
                viewBox="0 0 383 108"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  scaleY: y2,
                  scaleX: 1,
                }}
              >
                <path d="M383 0C225 0 155 107.5 0 107.5V0H383Z" fill="white" />
              </motion.svg>
            </div>
          </div>
          {/* <Test
            pointerOffsetPercent={pointerOffsetPercent}
            isMouseInSection={isHovering}
          /> */}
          <div className="absolute top-0 left-0 w-full h-full z-[-1]">
            <Image
              src="/projects/thumbnail-1.png"
              alt="test"
              width={200}
              height={200}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;

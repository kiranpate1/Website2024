import React, { MutableRefObject, useRef, useState } from "react";
import Image from "next/image";
import { motion, useTransform, motionValue, useSpring } from "framer-motion";
import Corners from "../Corners/Corners";

type ProjectsProps = {};

const Projects = (props: ProjectsProps) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [normalizedPosition, setNormalizedPosition] = useState({ x: 0, y: 0 });
  const divRef = useRef() as MutableRefObject<HTMLDivElement | null>;
  const width = 600;
  const height = 400;
  const title = "Toronto Tech Week";

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
      y: 1,
    });
  };

  const handleMouseEnter = () => {
    setNormalizedPosition({
      x: 0.5,
      y: 1,
    });
  };

  const handleMouseLeave = () => {
    setNormalizedPosition({
      x: 0.5,
      y: 0,
    });
  };

  const scaleY1 = useTransform(
    motionValue(normalizedPosition.y),
    (latest: number) => latest * 1
  );
  const scaleY2 = useTransform(
    motionValue(normalizedPosition.y),
    (latest: number) => 1 - latest
  );
  const scaleX1 = useTransform(
    motionValue(normalizedPosition.x),
    (latest: number) => latest * 2
  );
  const scaleX2 = useTransform(
    motionValue(normalizedPosition.x),
    (latest: number) => 2 - latest * 2
  );

  const y1 = useSpring(scaleY1, {
    stiffness: 300,
    damping: 50,
    // mass: 50,
  });

  const y2 = useSpring(scaleY2, {
    stiffness: 100,
    damping: 50,
    // mass: 50,
  });

  const x1 = useSpring(scaleX1, {
    stiffness: 400,
    damping: 100,
  });
  const x2 = useSpring(scaleX2, {
    stiffness: 400,
    damping: 100,
  });

  return (
    <div>
      <h1>Hello & welcome</h1>
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <div className="relative" style={{ width: width }}>
          <div
            className="relative w-full overflow-hidden"
            ref={divRef}
            style={{ height: height }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Corners />
            <motion.div
              className="absolute flex flex-col top-0 left-0 w-full h-full origin-top mix-blend-difference"
              style={{
                scaleY: y1,
              }}
            >
              <div
                className="w-full bg-white origin-top"
                style={{
                  minHeight: height,
                }}
              />
              <motion.div
                className="flex origin-top h-[85px]"
                style={
                  {
                    // scaleY: y2,
                  }
                }
              >
                <motion.svg
                  className="scale-x-[-1] origin-top-left"
                  viewBox="0 0 383 108"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    minWidth: width / 2,
                    scaleX: x1,
                    // scaleY: y1,
                  }}
                >
                  <path d="M0 0C158 0 228 107.5 383 107.5V0H0Z" fill="white" />
                </motion.svg>
                <motion.svg
                  className="origin-top-right"
                  viewBox="0 0 383 108"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    minWidth: width / 2,
                    scaleX: x2,
                    // scaleY: y1,
                  }}
                >
                  <path
                    d="M383 0C225 0 155 107.5 0 107.5V0H383Z"
                    fill="white"
                  />
                </motion.svg>
              </motion.div>
            </motion.div>
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

          <div className="absolute h-0 pt-6 w-full bottom-0 left-0 flex items-start justify-center">
            <h2 className="text-4xl text-white">{title}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;

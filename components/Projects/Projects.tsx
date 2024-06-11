import React, { MutableRefObject, useRef, useState } from "react";
import Image from "next/image";
import { motion, useTransform, motionValue, useSpring } from "framer-motion";
import Corners from "../Corners/Corners";
import { sin } from "mathjs";

type ProjectsProps = {};

const Projects = (props: ProjectsProps) => {
  const [normalizedPosition, setNormalizedPosition] = useState({ x: 0, y: 0 });
  const mainRef = useRef() as MutableRefObject<HTMLDivElement | null>;
  const divRef = useRef() as MutableRefObject<HTMLDivElement | null>;
  const titleRef = useRef() as MutableRefObject<HTMLDivElement | null>;
  const width = 600;
  const height = 400;
  const title = "torontotechweek2024.com";
  const titleArray = title.split("");

  const [letterTransitions, setLetterTransitions] = useState(
    titleArray.map((letter) => ({
      translateY: 0,
      skewY: 0,
    }))
  );
  const [titlePosition, setTitlePosition] = useState(-250);

  const calculateLetterPosition = (index: number) => {
    if (!divRef.current || !titleRef.current)
      return { letter: "", position: { xRatio: 0 } };
    const divRect = divRef.current.getBoundingClientRect();
    const letterElement = titleRef.current.children[index];
    if (!letterElement) return { letter: "", position: { xRatio: 0 } };
    const letterRect = letterElement.getBoundingClientRect();
    const letterLeft = letterRect.left;
    const x = letterLeft - divRect.left;
    const xRatio = x / divRect.width;
    return { letter: titleArray[index], position: { xRatio } };
  };

  const mainMove = (event: { clientX: number; clientY: number }) => {
    const rect = divRef.current?.getBoundingClientRect();
    if (!rect) return; // Add null check

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const width = rect.width;
    const xDivRatio = x / width;

    setNormalizedPosition({
      x: x / width,
      y: 0,
    });

    setTitlePosition(-250);

    setLetterTransitions((prev) => {
      return prev.map((item, i) => {
        const {
          position: { xRatio: xLetterRatio },
        } = calculateLetterPosition(i);
        const translateDist =
          xLetterRatio !== undefined
            ? 1 - Math.abs(xLetterRatio - xDivRatio)
            : 0;
        const skewDist =
          xLetterRatio !== undefined ? xDivRatio - xLetterRatio : 0;
        const translateY = translateDist * Math.PI * 1.5 - Math.PI;
        const skewY = -skewDist * Math.PI * 1.5 + Math.PI;
        return {
          translateY,
          skewY,
        };
      });
    });
  };

  const handleMouseMove = (event: { clientX: number; clientY: number }) => {
    const rect = divRef.current?.getBoundingClientRect();
    if (!rect) return; // Add null check

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const width = rect.width;

    setNormalizedPosition({
      x: x / width,
      y: 1,
    });

    setTitlePosition(-130);

    setLetterTransitions((prev) => {
      return prev.map((item) => {
        return {
          translateY: 1,
          skewY: 0,
        };
      });
    });
  };

  const scaleY1 = useTransform(
    motionValue(normalizedPosition.y),
    (latest: number) => latest * 1
  );
  const scaleX1 = useTransform(
    motionValue(normalizedPosition.x),
    (latest: number) => latest * 2
  );
  const scaleX2 = useTransform(
    motionValue(normalizedPosition.x),
    (latest: number) => 2 - latest * 2
  );
  const titleY1 = useTransform(
    motionValue(titlePosition),
    (latest: number) => latest
  );

  const y1 = useSpring(scaleY1, {
    stiffness: 300,
    damping: 50,
  });
  const x1 = useSpring(scaleX1, {
    stiffness: 400,
    damping: 100,
  });
  const x2 = useSpring(scaleX2, {
    stiffness: 400,
    damping: 100,
  });
  const titleY = useSpring(titleY1, {
    stiffness: 400,
    damping: 100,
  });

  return (
    <div>
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <div
          className="absolute top-0 left-0 w-full h-full"
          ref={mainRef}
          onMouseMove={mainMove}
        />
        <div className="relative" style={{ width: width }}>
          <div
            className="relative w-full overflow-hidden z-[1]"
            ref={divRef}
            style={{ height: height }}
            onMouseMove={handleMouseMove}
            // onMouseEnter={handleMouseEnter}
            // onMouseLeave={handleMouseLeave}
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
                className="flex origin-top items-center justify-center"
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
                    minWidth: width / 1.2,
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
                    minWidth: width / 1.2,
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

          <div className="absolute h-0 w-full bottom-0 left-0 flex items-start justify-center z-0">
            <div className="relative h-20 w-full overflow-hidden">
              <motion.div
                className="relative flex justify-center items-center"
                ref={titleRef}
                style={{ y: titleY }}
              >
                {titleArray.map((letter, index) => {
                  const motionTranslateY = useTransform(
                    motionValue(letterTransitions[index].translateY),
                    (latest: number) => Math.sin(latest) * 200
                  );
                  const springTranslateY = useSpring(motionTranslateY, {
                    stiffness: 400,
                    damping: 100,
                  });

                  const motionSkewY = useTransform(
                    motionValue(letterTransitions[index].skewY),
                    (latest: number) => Math.sin(latest) * 60
                  );
                  const springSkewY = useSpring(motionSkewY, {
                    stiffness: 400,
                    damping: 100,
                  });

                  return (
                    <motion.div
                      key={index}
                      className="text-white font-sans-md origin-bottom-left"
                      style={{
                        marginLeft: "-0.03%",
                        y: springTranslateY,
                        skewY: springSkewY,
                      }}
                    >
                      {letter}
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;

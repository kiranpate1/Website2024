import React, { MutableRefObject, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useTransform, motionValue, useSpring } from "framer-motion";
import { usePointerPosition } from "@/hooks/usePointerInfo";
import Corners from "../Corners/Corners";

// const shouldTrack = true;

type Props = {
  projectInfo: {
    name: string;
    image: string;
    type: string[];
    color?: string;
  };
  test: { x: number };
  size: { width: number; height: number; corners: number };
};

const Project = ({ projectInfo, test, size }: Props) => {
  const [normalizedPosition, setNormalizedPosition] = useState(test);
  const [scaleDown, setScaleDown] = useState(0);
  const divRef = useRef() as MutableRefObject<HTMLDivElement | null>;
  const titleRef = useRef() as MutableRefObject<HTMLDivElement | null>;
  const width = size.width;
  const height = size.height;
  const title = projectInfo.name;
  const titleArray = title.split("");

  // window.onmousemove = (event) => {
  //   setNormalizedPosition(test);
  // };

  const [letterTransitions, setLetterTransitions] = useState(
    titleArray.map((letter) => ({
      translateY: 0,
      skewY: 0,
    }))
  );
  const [titlePosition, setTitlePosition] = useState(-250);

  // const shit = usePointerPosition(shouldTrack).x;
  // const xPosition = () => {
  //   console.log(shit);
  // };
  // document.onmouseenter = xPosition;

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

  useEffect(() => {
    const rect = divRef.current?.getBoundingClientRect();
    if (!rect) return; // Add null check

    const x = test.x - rect.left;
    const width = rect.width;
    const xDivRatio = x / width;

    setNormalizedPosition({
      x: x / width,
    });

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
  }, [test]);

  const mainMove = (event: { clientX: number }) => {
    const rect = divRef.current?.getBoundingClientRect();
    if (!rect) return; // Add null check

    const x = event.clientX - rect.left;
    const width = rect.width;
    const xDivRatio = x / width;

    setNormalizedPosition({
      x: x / width,
    });

    setScaleDown(0);

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

  const boxMove = (event: { clientX: number; clientY: number }) => {
    const rect = divRef.current?.getBoundingClientRect();
    if (!rect) return; // Add null check

    const x = event.clientX - rect.left;
    const width = rect.width;

    setNormalizedPosition({
      x: x / width,
    });

    setScaleDown(1);

    setTitlePosition(-135);

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
    motionValue(scaleDown),
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
    <div className="relative" style={{ width: width }}>
      <div
        className="relative w-full overflow-hidden z-[1]"
        ref={divRef}
        style={{ height: height }}
        onMouseEnter={boxMove}
        onMouseMove={boxMove}
        onMouseLeave={mainMove}
      >
        <Corners color={projectInfo.color} size={size.corners} />
        <motion.div
          className="absolute flex flex-col top-0 left-0 w-full h-full origin-top mix-blend-difference"
          style={{
            scaleY: y1,
          }}
        >
          <div
            className="w-full origin-top"
            style={{
              minHeight: height,
              background: projectInfo.color,
            }}
          />
          <div className="flex origin-top items-center justify-center">
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
              <path
                d="M0 80C180.5 -114.5 258 107.5 383 107.5V0H0V80Z"
                fill={projectInfo.color}
              />
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
                d="M383 80C202.5 -114.5 125 107.5 0 107.5V0H383V80Z"
                fill={projectInfo.color}
              />
            </motion.svg>
          </div>
        </motion.div>
        <div className="absolute top-0 left-0 w-full h-full z-[-1]">
          <Image
            src={projectInfo.image}
            alt="test"
            width={200}
            height={200}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute top-0 left-0 w-full h-full mix-blend-difference"
            style={{ background: projectInfo.color }}
          />
        </div>
      </div>

      <div className="absolute h-0 w-full bottom-0 left-0 flex items-start justify-center z-0">
        <div className="relative h-20 w-full overflow-hidden pointer-events-none">
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
                  {letter === " " ? "\u00A0" : letter}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Project;

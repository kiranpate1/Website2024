import React, { MutableRefObject, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useTransform, motionValue, useSpring } from "framer-motion";
import Tag from "./Tag";
import "./style.css";

type Props = {
  projectInfo: {
    name: string;
    image: string;
    type: string[];
    color?: string;
    link?: string;
  };
  scrollPos: number;
  isCurrent?: boolean;
  isMobile: boolean;
  size: { width: string; height: string; corners: number };
  toggleProject: () => void;
};

const Project = ({
  projectInfo,
  scrollPos,
  isCurrent,
  isMobile,
  size,
  toggleProject,
}: Props) => {
  const [scaleDown, setScaleDown] = useState(0);
  const divRef = useRef() as MutableRefObject<HTMLDivElement | null>;
  const titleRef = useRef() as MutableRefObject<HTMLDivElement | null>;
  const width = size.width;
  const height = size.height;
  const title = projectInfo.name;
  const titleArray = title.split("");
  const types = projectInfo.type;

  useEffect(() => {
    updateLetterTransitions(scrollPos);
  }, [scrollPos]);

  const [letterTransitions, setLetterTransitions] = useState(
    titleArray.map((_letter) => ({
      scale: 2 / 3,
      translateY: 0,
      skewY: 0,
    }))
  );

  const calculateLetterPosition = (index: number) => {
    if (!titleRef.current) return { letter: "", position: { xRatio: 0 } };
    const letterElement = titleRef.current.children[index];
    if (!letterElement) return { letter: "", position: { xRatio: 0 } };
    const letterRect = letterElement.getBoundingClientRect();
    const letterLeft = letterRect.left;
    const x = letterLeft;
    const xRatio = x / window.innerWidth;
    return { letter: titleArray[index], position: { xRatio } };
  };

  function updateLetterTransitions(cursorPos: number) {
    const x = cursorPos;
    const width = window.innerWidth;
    const xDivRatio = x / width;

    setLetterTransitions((prev) => {
      return prev.map((_item, i) => {
        const {
          position: { xRatio: xLetterRatio },
        } = calculateLetterPosition(i);
        const translateDist =
          xLetterRatio !== undefined
            ? 1 - Math.abs(xLetterRatio - xDivRatio)
            : 0;
        const skewDist =
          xLetterRatio !== undefined ? xDivRatio - xLetterRatio : 0;
        const scale = 1 + translateDist * Math.PI * 1.5 - Math.PI;
        const translateY = translateDist * Math.PI * 1.5 - Math.PI;
        const skewY = -skewDist * Math.PI * 1.5 + Math.PI;
        return {
          scale,
          translateY,
          skewY,
        };
      });
    });
  }

  const mainMove = () => {
    setScaleDown(0);

    updateLetterTransitions(scrollPos);
  };

  const boxMove = () => {
    setScaleDown(1);

    setLetterTransitions((prev) => {
      return prev.map((_item) => {
        return {
          scale: 2 / 3,
          translateY: 1,
          skewY: 0,
        };
      });
    });
  };

  const TranslateYSpring = (index: number) =>
    useSpring(
      useTransform(
        motionValue(letterTransitions[index].translateY),
        (latest: number) => Math.sin(latest) * 200
      ),
      {
        stiffness: 450,
        damping: 100,
      }
    );

  const SkewYSpring = (index: number) =>
    useSpring(
      useTransform(
        motionValue(letterTransitions[index].skewY),
        (latest: number) => Math.sin(latest) * 30
      ),
      {
        stiffness: 450,
        damping: 100,
      }
    );

  return (
    <a
      className="test1 relative snap-center cursor-pointer z-[2]"
      style={{
        minWidth: width,
        scrollSnapAlign: isMobile ? "snap-center" : "none",
      }}
      // href={projectInfo.link}
      target="_blank"
    >
      <div
        className="relative w-full overflow-hidden z-[1] transition-transform duration-100"
        ref={divRef}
        style={{
          height: height,
          borderRadius: isMobile ? "48px" : "96px",
          WebkitBorderRadius: isMobile ? "48px" : "96px",
          transform: "translateZ(0)",
        }}
        onClick={toggleProject}
        onMouseMove={boxMove}
        onMouseLeave={mainMove}
        onMouseDown={(event) => {
          event.currentTarget.style.transform = "scale(0.98)";
        }}
        onMouseUp={(event) => {
          event.currentTarget.style.transform = "scale(1)";
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full z-[-1]">
          <Image
            src={projectInfo.image}
            alt="test"
            width={200}
            height={200}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="absolute h-0 w-full bottom-0 left-0 flex items-start justify-center z-0">
        <div className="relative h-[25vw] w-full overflow-hidden pointer-events-none">
          <motion.div
            className="relative flex justify-center items-center"
            ref={titleRef}
            style={{ y: "-135px" }}
          >
            {titleArray.map((letter, index) => {
              return (
                <motion.div
                  key={index}
                  className="letter font-sans-md origin-bottom-left text-white"
                  style={{
                    transition: "color 0.8s ease",
                    transitionDelay: "0.4s",
                    marginLeft: "-0.03%",
                    y: TranslateYSpring(index),
                    skewY: SkewYSpring(index),
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.div>
              );
            })}
          </motion.div>
          <div
            className="absolute w-full flex flex-4 gap-4 font-mono-reg justify-center items-center"
            style={{ top: "calc(2vw + 56px)" }}
          >
            {types.map((type, index) => {
              return (
                <motion.div
                  className="tag"
                  key={index}
                  initial={{
                    opacity: 0,
                    transform: "scale(0.5)",
                    filter: "blur(50px)",
                  }}
                  animate={{
                    opacity: scaleDown == 0 ? 0 : 1,
                    transform: scaleDown == 0 ? "scale(0.5)" : "scale(1)",
                    filter: scaleDown == 0 ? "blur(50px)" : "blur(0px)",
                  }}
                  transition={{ duration: 0.2, delay: 0.1 + 0.1 * index }}
                >
                  <Tag key={index} type={type} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </a>
  );
};

export default Project;

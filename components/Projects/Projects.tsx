import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import Project from "./Project";
import { motion, useMotionValueEvent } from "framer-motion";
import { ProjectInfo } from "./ProjectInfo";

type ProjectsProps = {
  projects: ProjectInfo[];
};

const ProjectsWrapper = ({ projects }: ProjectsProps) => {
  const testRef = useRef() as MutableRefObject<HTMLDivElement | null>;
  // const test1 = useRef() as MutableRefObject<HTMLDivElement | null>;
  const boxCont = useRef() as MutableRefObject<HTMLDivElement | null>;
  const [test, setTest] = useState({ x: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [width, setWidth] = useState<number>(0);
  const [currentProtocol, setCurrentProtocol] = useState(0);

  useEffect(() => {
    window.onmousemove = (event) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };
    setWidth(window.innerWidth);

    function handleWindowSizeChange() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  const testMove = (event: { clientX: number; clientY: number }) => {
    setTest({ x: event.clientX });
  };

  // useMotionValueEvent(progress, "change", (latest) => {
  //   const withOffset = latest + 0.5;
  //   const currentItem = Math.round(withOffset * projects.length);
  //   setCurrentProtocol(currentItem);
  // });

  // const calculateBoxPosition = (index: number) => {
  //   if (!boxCont.current) return;
  //   const divRect = boxCont.current.getBoundingClientRect();
  //   const boxElement = boxCont.current.children[index];
  //   if (!boxElement) return;
  //   const boxRect = boxElement.getBoundingClientRect();
  //   const boxLeft = boxRect.left;
  //   const x = boxLeft - divRect.left;
  //   const xRatio = x / divRect.width;
  //   return x;
  // };

  // const testScroll = () => {
  //   const rect = test1.current?.getBoundingClientRect();
  //   if (rect) {
  //     const elementLeft = rect.left;
  //     const elementScrollLeft = test1.current?.scrollLeft;
  //     const elementMiddle = elementLeft + elementScrollLeft! + rect.width / 2;
  //     const distanceFromMiddle = elementMiddle;
  //   }
  // };

  return (
    <motion.div
      // className="relative w-full h-[100vh] overflow-scroll flex items-start"
      // ref={test1}
      // onScroll={testScroll}
      initial={{ filter: "blur(20px)", opacity: 0 }}
      animate={{ filter: "blur(0px)", opacity: 1 }}
      transition={{ duration: 0.6, delay: 1, ease: "easeInOut" }}
    >
      <div
        className="relative flex flex-col h-[100vh] items-center overflow-scroll justify-start"
        ref={boxCont}
        style={{
          gap: isMobile ? "150px" : "300px",
          padding: isMobile ? "100px 0" : "200px 0",
          scrollSnapType: isMobile
            ? "y var(--tw-scroll-snap-strictness)"
            : "none",
          height: isMobile ? "100vh" : "auto",
        }}
      >
        <div
          className="fixed top-0 left-0 w-full h-[100vh] z-0"
          ref={testRef}
          onMouseMove={testMove}
          style={{ display: isMobile ? "none" : "block" }}
        />
        {projects.map((project, index) => (
          <Project
            key={index}
            projectInfo={project}
            test={test}
            isCurrent={currentProtocol === index}
            isMobile={isMobile}
            cursorPosition={cursorPosition}
            size={{
              width: isMobile ? "300px" : "40vw",
              height: isMobile ? "200px" : "26.67vw",
              corners: isMobile ? 68 : 116,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectsWrapper;

import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import Project from "./Project";
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
  const [width, setWidth] = useState<number>(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  const testMove = (event: { clientX: number; clientY: number }) => {
    setTest({ x: event.clientX });
  };

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

  window.onmousemove = (event) => {
    setCursorPosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <div
    // className="relative w-full h-[100vh] overflow-scroll flex items-start"
    // ref={test1}
    // onScroll={testScroll}
    >
      <div
        className="relative flex flex-col h-full items-center justify-start"
        ref={boxCont}
        style={{
          gap: isMobile ? "150px" : "300px",
          padding: isMobile ? "100px 0" : "200px 0",
        }}
      >
        <div
          className="fixed top-0 left-0 w-full h-[100vh] z-0"
          ref={testRef}
          onMouseMove={testMove}
        />
        {projects.map((project, index) => (
          <Project
            projectInfo={project}
            test={test}
            cursorPosition={cursorPosition}
            size={{
              width: isMobile ? 300 : 600,
              height: isMobile ? 200 : 400,
              corners: isMobile ? 68 : 116,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsWrapper;

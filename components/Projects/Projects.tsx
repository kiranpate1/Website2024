import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import Project from "./Project";
import { motion, useMotionValueEvent } from "framer-motion";
import { Projects } from "./ProjectInfo";

type ProjectsProps = {
  expanded: MutableRefObject<HTMLDivElement | null>;
  home: MutableRefObject<HTMLDivElement | null>;
};

const ProjectsWrapper = ({ expanded, home }: ProjectsProps) => {
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

  function expand(index: number) {
    setCurrentProtocol(index);
    const element = boxCont.current?.children[index + 1] as HTMLElement;
    if (!element) return;
    element.style.opacity = "0";
    var rect = element.getBoundingClientRect();
    document.body.style.overflow = "hidden";

    if (expanded.current) {
      const expCont = expanded.current.children[1] as HTMLElement;
      const expProj = expCont.children[index] as HTMLElement;
      const expClose = expProj.children[0] as HTMLElement;
      expProj.style.display = "flex";
      expProj.style.left = `${rect.left}px`;
      expProj.style.top = `${rect.top}px`;
      expProj.style.width = `${rect.width}px`;
      expProj.style.height = `${rect.height}px`;
      expProj.style.padding = "0";

      if (home.current) {
        (expanded.current.children[0] as HTMLElement).style.opacity = "1";
        expanded.current.style.pointerEvents = "all";
        home.current.style.transform = "scale(0.95)";
        home.current.style.filter = "blur(16px)";
      }

      setTimeout(() => {
        expProj.classList.add("expand");
      }, 100);

      expClose.onclick = () => {
        expProj.classList.remove("expand");

        if (expanded.current && home.current) {
          (expanded.current.children[0] as HTMLElement).style.opacity = "0";
          expanded.current.style.pointerEvents = "none";
          home.current.style.transform = "scale(1)";
          home.current.style.filter = "none";
        }

        setTimeout(() => {
          expProj.style.display = "none";
          document.body.style.overflow = "auto";
          element.style.opacity = "1";
        }, 300);
      };
    }
  }

  return (
    <motion.div
      initial={{ filter: "blur(20px)", opacity: 0 }}
      animate={{ filter: "blur(0px)", opacity: 1 }}
      transition={{ duration: 0.6, delay: 1, ease: "easeInOut" }}
    >
      <div
        className="relative flex flex-row h-screen items-center justify-start overflow-y-hidden overflow-x-scroll duration-200"
        ref={boxCont}
        style={{
          overflowY: isMobile ? "scroll" : "hidden",
          overflowX: isMobile ? "hidden" : "scroll",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? "40vw" : "10vw",
          padding: isMobile ? "100px 0" : "0 20vw",
          scrollSnapType: isMobile
            ? "y var(--tw-scroll-snap-strictness)"
            : "none",
        }}
      >
        <div
          className="fixed top-0 left-0 h-[100vh] z-0"
          onMouseMove={testMove}
          style={{ display: isMobile ? "none" : "block" }}
        />
        {Projects.map((project, index) => (
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
            toggleProject={() => expand(index)}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectsWrapper;

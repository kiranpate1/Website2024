import React, { MutableRefObject, useRef, useState } from "react";
import { Projects } from "../Projects/ProjectInfo";
import ExpandedProject from "./ExpandedProject";

type ProjectsProps = {
  expanded: MutableRefObject<HTMLDivElement | null>;
};

const ProjectsWrapper = ({ expanded }: ProjectsProps) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-[100vh] z-[99] pointer-events-none"
      ref={expanded}
    >
      <div className="w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,0.3)] opacity-0 duration-300" />
      <div>
        {Projects.map((project, index) => (
          <ExpandedProject key={index} projectInfo={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsWrapper;

import React, { MutableRefObject, useRef, useState } from "react";
import Project from "./Project";
import { ProjectInfo } from "./ProjectInfo";

type ProjectsProps = {
  projects: ProjectInfo[];
};

const ProjectsWrapper = ({ projects }: ProjectsProps) => {
  const testRef = useRef() as MutableRefObject<HTMLDivElement | null>;
  const [test, setTest] = useState({ x: 0 });

  const testMove = (event: { clientX: number; clientY: number }) => {
    setTest({ x: event.clientX });
  };

  return (
    <div className="relative flex flex-col gap-[300px] w-full items-center justify-center">
      <div
        className="absolute top-0 left-0 w-full h-full"
        ref={testRef}
        onMouseMove={testMove}
      />
      {projects.map((project, index) => (
        <Project projectInfo={project} test={test} />
      ))}
    </div>
  );
};

export default ProjectsWrapper;

import React, { MutableRefObject, useRef, useState } from "react";
import Project from "./Project";
import { Projects } from "./ProjectInfo";
import ProjectsComp from "./Projects";

type ProjectsProps = {};

const ProjectsWrapper = (props: ProjectsProps) => {
  return (
    <div>
      <ProjectsComp projects={Projects} />
    </div>
  );
};

export default ProjectsWrapper;

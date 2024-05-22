import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type ProjectsProps = {};

const Projects = (props: ProjectsProps) => {
  return (
    <div>
      <h1>Hello & welcome</h1>
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <div className="relative w-[600px] h-[400px] border-white border-2">
          <svg
            className="absolute top-0 left-0 z-1"
            width="570"
            height="268"
            viewBox="0 0 570 268"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M187 267.5C80.5 267.5 35 205 0 186V0H570V160C412 160 293.5 267.5 187 267.5Z"
              fill="white"
            />
          </svg>
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
      </div>
    </div>
  );
};

export default Projects;

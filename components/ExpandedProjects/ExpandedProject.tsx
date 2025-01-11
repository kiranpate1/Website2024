import React from "react";
import Image from "next/image";
import "./style.css";

type Props = {
  projectInfo: {
    name: string;
    description: string;
    image: string;
    type: string[];
    color?: string;
    link?: string;
    features?: string[];
  };
};

const ExpandedProject = ({ projectInfo }: Props) => {
  return (
    <div
      className="modal absolute flex-col gap-8 items-stretch hidden overflow-hidden duration-[300ms] ease-out border-white bg-[#2F2F2F]"
      // style={{ background: projectInfo.color }}
    >
      <div className="modal-close flex items-center justify-center absolute rounded-full z-10 bg-[rgba(47,47,47,0.7)] opacity-0 cursor-pointer hover:bg-white">
        <img src="/icons/back.svg" />
      </div>
      <div className="flex justify-center items-center modal-thumbnails w-full relative duration-[300ms] pointer-events-none z-[1]">
        <img
          src={projectInfo.image}
          alt=""
          width={200}
          height={200}
          className="modal-thumbnail-0 absolute top-0 left-0 w-full h-full object-cover duration-[300ms] z-[1]"
        />
        <img
          src={projectInfo.image}
          alt="expanded thumbnail"
          width={200}
          height={200}
          className="modal-thumbnail-1 w-full h-full object-cover z-[2]"
        />
      </div>
      <div className="modal-info flex flex-col items-stretch duration-300 opacity-0 z-[2]">
        <div className="flex flex-row items-stretch flex-wrap gap-4">
          <div className="flex-1 flex flex-col gap-4 items-start">
            <div className="font-sans-md text-white ">{projectInfo.name}</div>
            <a
              href={projectInfo.link}
              target="_blank"
              className="flex gap-2 items-center justify-start font-sans-sm text-white hover:underline"
            >
              <div className="w-2 h-2 bg-[#7CE0C3] rounded-full" />
              {projectInfo.link?.slice(8)}
            </a>
          </div>
          <div className="font-sans-sm text-[rgba(255,255,255,0.7)] text-[18px] flex-1 text-pretty pt-4 min-w-[200px]">
            {projectInfo.description}
          </div>
        </div>
        <div className="flex gap-2 flex-wrap pt-3 mt-8 border-[rgba(255,255,255,0.25)] border-t-[1px]">
          {projectInfo.features?.map((feature, index) => (
            <div
              key={index}
              className="font-mono-reg text-[rgba(255,255,255,0.5)] text-[14px] bg-[rgba(255,255,255,0.1)] px-1 py-1 rounded-md"
            >
              {feature}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpandedProject;

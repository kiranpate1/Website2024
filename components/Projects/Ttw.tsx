import React, { MutableRefObject, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useTransform, motionValue, useSpring } from "framer-motion";
import { Projects } from "./ProjectInfo";
import Tag from "./Tag";
import "./style.css";
import "./TtwScript.js";

type Props = {};

const Ttw = (props: Props) => {
  return (
    <div className="image-link relative w-full h-full flex justify-center items-center z-1">
      <div className="visual w-full h-full bg-black" />
      <div className="label">TTW</div>
    </div>
  );
};

export default Ttw;

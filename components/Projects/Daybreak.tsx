import React, { MutableRefObject, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useTransform, motionValue, useSpring } from "framer-motion";
import { Projects } from "./ProjectInfo";
import Tag from "./Tag";
import "./style.css";

type Props = {};

const Daybreak = (props: Props) => {
  useEffect(() => {}, []);
  return (
    <div className="relative w-full h-full flex justify-center items-center z-1">
      <svg
        className="logomark text-black"
        viewBox="0 0 200 199"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_2254_253)">
          <g clip-path="url(#clip1_2254_253)">
            <g className="logomark-animate">
              <rect
                x="107.469"
                y="199.301"
                width="14.5784"
                height="71.4846"
                transform="rotate(179.9 107.469 199.301)"
                fill="currentColor"
              ></rect>
              <rect
                x="106.959"
                y="75.4922"
                width="14"
                height="75.9607"
                transform="rotate(179.9 106.959 75.4922)"
                fill="currentColor"
              ></rect>
              <rect
                x="143.756"
                y="9.25391"
                width="14.5784"
                height="75.6694"
                transform="rotate(29.36 143.756 9.25391)"
                fill="currentColor"
              ></rect>
              <rect
                x="81.0488"
                y="120.723"
                width="14.5784"
                height="72.1569"
                transform="rotate(29.36 81.0488 120.723)"
                fill="currentColor"
              ></rect>
              <rect
                x="182.494"
                y="44.0703"
                width="14.5784"
                height="74.1255"
                transform="rotate(59 182.494 44.0703)"
                fill="currentColor"
              ></rect>
              <rect
                x="74.0938"
                y="109.203"
                width="14.5784"
                height="73.7623"
                transform="rotate(59 74.0938 109.203)"
                fill="currentColor"
              ></rect>
              <rect
                x="154.41"
                y="183.598"
                width="14.5784"
                height="72.0479"
                transform="rotate(150.64 154.41 183.598)"
                fill="currentColor"
              ></rect>
              <rect
                x="93.6016"
                y="75.5156"
                width="14.5784"
                height="76.0357"
                transform="rotate(150.64 93.6016 75.5156)"
                fill="currentColor"
              ></rect>
              <rect
                x="189.061"
                y="147.113"
                width="14.5784"
                height="74.0452"
                transform="rotate(121 189.061 147.113)"
                fill="currentColor"
              ></rect>
              <rect
                x="81.2207"
                y="82.3086"
                width="14.5784"
                height="74.4117"
                transform="rotate(121 81.2207 82.3086)"
                fill="currentColor"
              ></rect>
              <rect
                x="126.053"
                y="109.227"
                width="14.5784"
                height="73.8174"
                transform="rotate(-90 126.053 109.227)"
                fill="currentColor"
              ></rect>
              <rect
                x="0.0292969"
                y="109.227"
                width="14.5784"
                height="73.8174"
                transform="rotate(-90 0.0292969 109.227)"
                fill="currentColor"
              ></rect>
            </g>
          </g>
          <path
            d="M125.99 109.126C126.647 106.523 126.998 103.645 126.998 100.492C126.998 85.3044 114.91 72.9922 99.998 72.9922C85.0864 72.9922 72.998 85.3044 72.998 100.492C72.998 103.65 73.3502 106.53 74.0083 109.137L100.005 82.6735L125.99 109.126Z"
            fill="currentColor"
          ></path>
        </g>
        <defs>
          <clipPath id="clip0_2254_253">
            <rect
              width="200"
              height="110"
              fill="currentColor"
              transform="translate(0 -1)"
            ></rect>
          </clipPath>
          <clipPath id="clip1_2254_253">
            <rect
              width="200"
              height="205"
              fill="currentColor"
              transform="translate(0.0292969 -0.96875)"
            ></rect>
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default Daybreak;

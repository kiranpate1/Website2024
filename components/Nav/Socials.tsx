import React from "react";
import { motion, useTransform, motionValue, useSpring } from "framer-motion";

type props = {};

const socialInfo = [
  { name: "TW", link: "https://twitter.com/pate1kiran" },
  { name: "IG", link: "https://www.instagram.com/artsbykiran/" },
  { name: "LI", link: "https://www.linkedin.com/in/ka-patel/" },
];

function skew(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  const element = event.target as HTMLAnchorElement;
  const rect = element.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const xPercent = x / rect.width;
  const yPercent = y / rect.height;
  const xSkew = (xPercent - 1) * 30;
  const ySkew = (yPercent - 1) * 30;
  element.style.transform = `skew(${ySkew}deg, ${xSkew}deg)`;
}
function skewLeave(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  const element = event.target as HTMLAnchorElement;
  element.style.transform = `skew(0deg, 0deg)`;
}

const Socials = (props: props) => {
  return (
    <div className="flex gap-4 absolute top-0 right-0 pointer-events-auto">
      {socialInfo.map((item) => (
        <motion.a
          key={item.name}
          className="font-mono-reg flex transition-transform duration-100 p-1"
          href={item.link}
          onMouseMove={skew}
          onMouseLeave={skewLeave}
          style={{}}
        >
          {item.name}
        </motion.a>
      ))}
    </div>
  );
};

export default Socials;

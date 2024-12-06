import React from "react";
import { motion, useTransform, motionValue, useSpring } from "framer-motion";

type props = {
  isMobile: boolean;
};

const socialInfo = [
  { name: "TW", link: "https://twitter.com/pate1kiran" },
  { name: "IG", link: "https://www.instagram.com/artsbykiran/" },
  { name: "CV", link: "https://read.cv/kiranpatel" },
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

const Socials = ({ isMobile }: props) => {
  return (
    <div
      className="flex gap-4 absolute pointer-events-auto text-white"
      style={{
        top: isMobile ? "auto" : 0,
        right: isMobile ? "auto" : 0,
        bottom: isMobile ? 0 : "auto",
        left: isMobile ? 0 : "auto",
      }}
    >
      {socialInfo.map((item, index) => (
        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1, delay: 2 + 0.3 * index }}
          key={item.name}
          className="font-mono-reg flex transition-transform duration-100"
          style={{ padding: "0.3vw" }}
          href={item.link}
          onMouseMove={skew}
          onMouseLeave={skewLeave}
        >
          {item.name}
        </motion.a>
      ))}
    </div>
  );
};

export default Socials;

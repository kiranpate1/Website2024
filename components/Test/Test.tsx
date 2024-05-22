import { MotionValue, motion, useSpring, useTransform } from "framer-motion";
import React, { useMemo } from "react";
import Image from "next/image";

type Props = {
  isMouseInSection: boolean;
  pointerOffsetPercent: { x: MotionValue<number>; y: MotionValue<number> };
};

const EcosystemPanels = ({ isMouseInSection, pointerOffsetPercent }: Props) => {
  const offsetY = useTransform(pointerOffsetPercent.x, (latest: number) =>
    isMouseInSection ? latest * 30 : 0
  );
  const offsetX = useTransform(pointerOffsetPercent.y, (latest: number) =>
    isMouseInSection ? latest * -15 : 0
  );
  const easedY = useSpring(offsetY, {
    // stiffness: stiffness,
    stiffness: 400,
    damping: 100,
    // mass: item.desktopWidth * 0.05,
  });
  const easedX = useSpring(offsetX, {
    // stiffness: stiffness,
    stiffness: 400,
    damping: 100,
    // mass: item.desktopWidth * 0.05,
  });

  return (
    <motion.div
      className="relative"
      style={{
        transformStyle: `preserve-3d`,
        perspectiveOrigin: "50% 50%",
        rotateY: easedY,
      }}
    >
      <motion.div
        style={{
          transformStyle: `preserve-3d`,
          perspectiveOrigin: "50% 50%",
          rotateX: easedX,
        }}
      >
        <motion.div
          style={{
            z: "-110vw",
          }}
        ></motion.div>
      </motion.div>
    </motion.div>
  );
};

export default EcosystemPanels;

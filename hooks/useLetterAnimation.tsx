import React from "react";
import { useSpring, useTransform, motionValue } from "framer-motion";

const useLetterAnimation = (translateY: number, skewY: number) => {
  const translateYValue = motionValue(translateY);
  const skewYValue = motionValue(skewY);

  const translateYSpring = useSpring(
    useTransform(translateYValue, (latest) => Math.sin(latest) * -400),
    { stiffness: 400, damping: 150 }
  );

  const skewYSpring = useSpring(
    useTransform(skewYValue, (latest) => Math.sin(latest) * 60),
    { stiffness: 400, damping: 150 }
  );

  return { translateYSpring, skewYSpring };
};

export default useLetterAnimation;

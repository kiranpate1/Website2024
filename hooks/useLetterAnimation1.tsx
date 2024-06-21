import React from "react";
import { useSpring, useTransform, motionValue } from "framer-motion";

const useLetterAnimation1 = (translateY: number, skewY: number) => {
  const translateYValue = motionValue(translateY);
  const skewYValue = motionValue(skewY);

  const translateYSpring = useSpring(
    useTransform(translateYValue, (latest) => Math.sin(latest) * 200),
    { stiffness: 450, damping: 100 }
  );

  const skewYSpring = useSpring(
    useTransform(skewYValue, (latest) => Math.sin(latest) * 60),
    { stiffness: 450, damping: 100 }
  );

  return { translateYSpring, skewYSpring };
};

export default useLetterAnimation1;

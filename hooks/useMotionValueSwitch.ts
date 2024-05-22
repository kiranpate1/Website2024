import { MotionValue, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

/**
 * Returns a boolean state of whether the current motion value satisfy provided condition.
 *
 * example:  const shouldShowButton = useMotionValueSwitch(scrollYProgress,
 *                (latest) => latest > 1
 *           );
 *
 *
 * @param value
 * @param condition
 * @returns
 */
export function useMotionValueSwitch<T>(
  value: MotionValue<T>,
  condition: (latest: T) => boolean,
) {
  const [isActive, setIsActive] = useState(false);
  useMotionValueEvent(value, "change", (latest) => {
    if (condition(latest)) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  });

  return isActive;
}

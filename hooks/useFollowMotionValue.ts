import {
  MotionValue,
  clamp,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import { useRef, useState } from "react";

interface FollowMotionValueConfig {
  min: number;
  max: number;
  responsiveness: number;
  dampingConst: number;
  dampingMargin: number;
}
export function useFollowMotionValue(
  target: MotionValue,
  {
    min = 0,
    max = Infinity,
    responsiveness = 0.15,
    dampingConst = 8,
    dampingMargin = 1000,
  },
): [MotionValue, boolean] {
  const current = useMotionValue(0);
  const animFrame = useRef<number>();
  const stopThreshold = 0.1;

  const [isMoving, setIsMoving] = useState(false);

  useMotionValueEvent(target, "change", (latest) => {
    if (animFrame.current) cancelAnimationFrame(animFrame.current);

    setIsMoving(true);

    function performFrameUpdate() {
      const currentScrollY = current.get();
      const clampedLatest = clamp(min, max, latest);

      const overflowDirection = clampedLatest > latest ? -1 : 1;
      const overflow = -Math.abs(clampedLatest - latest);

      const overflowFactor = 1 - overflow / dampingMargin;
      const dampFactor = dampingConst * overflowFactor;
      const dampedLatest =
        clampedLatest - (overflow / dampFactor) * overflowDirection;

      const offset = (dampedLatest - currentScrollY) * responsiveness;

      if (Math.abs(offset) > stopThreshold) {
        current.set(currentScrollY + offset);
        animFrame.current = requestAnimationFrame(performFrameUpdate);
        return;
      }

      current.set(dampedLatest);
      setIsMoving(false);
    }

    animFrame.current = requestAnimationFrame(performFrameUpdate);
  });
  return [current, isMoving];
}

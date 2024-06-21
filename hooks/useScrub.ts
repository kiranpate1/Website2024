import {
  MotionValue,
  clamp,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useFollowMotionValue } from "./useFollowMotionValue";
import { useWindowDimension } from "./useWindowDimension";

type Scrub = [
  MutableRefObject<HTMLDivElement>,
  MotionValue,
  MotionValue,
  boolean,
];

enum ScrubDirection {
  x = "x",
  y = "y",
}

export function useScrub({
  maxDistance = Infinity,
  canUseMouseWheel = false,
  direction = ScrubDirection.x,
  maxWheelDelta = 100,
  responsiveness = 0.2,
  dampingConst = 8,
  dampingMargin = 1000,
}): Scrub {
  const containerRef = useRef() as MutableRefObject<HTMLDivElement>;

  const target = useMotionValue(0);
  const [current, isMoving] = useFollowMotionValue(target, {
    min: -maxDistance,
    max: 0,
    responsiveness,
    dampingConst,
    dampingMargin,
  });

  const [isUsingDrag, setIsUsingDrag] = useState(false);
  const [isScrubbing, setIsScrubbing] = useState(false);

  // snap to a position after released a drag
  useEffect(() => {
    if (!isScrubbing) {
      target.set(clamp(-maxDistance, 0, current.get()));
    }
  }, [current, isScrubbing, maxDistance, target]);

  useEffect(() => {
    if (!isMoving && !isUsingDrag) {
      setIsScrubbing(false);
    }
  }, [isMoving, isUsingDrag]);

  const windowDim = useWindowDimension();

  const getClampedNewValue = useCallback(
    (delta: number) => {
      return target.get() + delta;
    },
    [target],
  );

  useEffect(() => {
    const elm = containerRef.current;
    let isDragging = false;
    let prevVal = 0;

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevVal = direction === ScrubDirection.x ? e.clientX : e.clientY;
      setIsScrubbing(true);
      setIsUsingDrag(true);
    };
    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging) return;

      const currVal = direction === ScrubDirection.x ? e.clientX : e.clientY;
      const deltaY = currVal - prevVal;

      const updatedTarget = getClampedNewValue(deltaY);
      target.set(updatedTarget);

      prevVal = currVal;
    };
    const handlePointerUp = (e: PointerEvent) => {
      isDragging = false;
      setIsUsingDrag(false);
    };
    const handlePointerCancel = (e: PointerEvent) => {
      isDragging = false;
      setIsUsingDrag(false);
    };

    elm.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointercancel", handlePointerCancel);

    return () => {
      elm.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointercancel", handlePointerCancel);
    };
  }, [
    containerRef,
    maxDistance,
    windowDim,
    direction,
    getClampedNewValue,
    target,
  ]);

  useEffect(() => {
    if (!canUseMouseWheel) return;

    const containerElm = containerRef.current;

    const handleContainerWheel = (e: WheelEvent) => {
      // delta value
      const delta = direction === ScrubDirection.x ? e.deltaX : e.deltaY;
      const scrollDelta = -clamp(-maxWheelDelta, maxWheelDelta, delta * 1);
      target.set(getClampedNewValue(scrollDelta));
      setIsScrubbing(true);
    };

    containerElm.addEventListener("wheel", handleContainerWheel, {
      passive: true,
    });

    return () => {
      containerElm.removeEventListener("wheel", handleContainerWheel);
    };
  }, [
    maxDistance,
    canUseMouseWheel,
    windowDim.width,
    windowDim.height,
    containerRef,
    direction,
    maxWheelDelta,
    target,
    getClampedNewValue,
  ]);

  return [containerRef, current, target, isScrubbing];
}
/**
 * A hook that allows you to scrub a container element: 
 * - by dragging the container element
 * - by scrolling the mouse wheel over the container element
 * 
 * @param maxDistance - the maximum distance the container can be scrubbed
 * @param canUseMouseWheel - whether to enable scrubbing by mouse wheel
 * @param direction - the direction of scrubbing
 * @param maxWheelDelta - the maximum delta value of the mouse wheel
 * @param responsiveness - the responsiveness of the scrubbing
 * @param dampingConst - the damping constant of the scrubbing
 * @param dampingMargin - the damping margin of the scrubbing
 * 
 * @returns a tuple of [containerRef, current, target, isScrubbing]
 */ 
export default useScrub;

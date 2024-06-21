import { useEffect, useRef, useState } from "react";
import { useWindowDimension } from "./useWindowDimension";
import { useDebounceValue } from "usehooks-ts";

export function usePerformanceProfile() {
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const { isResizing } = useWindowDimension();

  useEffect(() => {
    if (isResizing) {
      return;
    }

    // initialise as not in low performance mode
    setIsLowPerformance(false);

    // let frameDropMillisec = 33; // 33ms per frame, 30 fps
    let frameDropMillisec = 1000 / 24; // 24 fps
    let frameDropProbationTime = 2000; // consecutive 2 secs frame drop
    let lastFrameDropTime = 0;

    let lowPerformanceThreshold = 10; // 10 frames after frame drop
    let droppedFrameCount = 0;

    let start: any = null;
    let last: any = null;

    let animFrame: any;

    animFrame = window.requestAnimationFrame(fpsMeasureLoop);
    function fpsMeasureLoop(timestamp: number) {
      if (start == null) {
        last = start = timestamp;
      }

      let dTime = timestamp - last;
      last = timestamp;

      if (dTime < frameDropMillisec) {
        // normal loop, no drop frames
        animFrame = window.requestAnimationFrame(fpsMeasureLoop);
        return;
      }
      const isDuringPerformanceProbation =
        timestamp - lastFrameDropTime <= frameDropProbationTime;
      lastFrameDropTime = timestamp;

      if (isDuringPerformanceProbation) {
        droppedFrameCount++;
      } else {
        droppedFrameCount = 1;
        console.log("Frame drop detection reset");
      }

      // If more than 33ms since last frame (i.e. below 30fps)
      // have drop freames
      console.log(
        `Frame drop detected - fps: ${1000 / dTime} , ${lowPerformanceThreshold - droppedFrameCount + 1} drops before activating low performance mode`,
      );

      if (droppedFrameCount > lowPerformanceThreshold) {
        console.log("Low performance mode activated");
        setIsLowPerformance(true);
        return;
      }

      animFrame = window.requestAnimationFrame(fpsMeasureLoop);
    }

    return () => {
      cancelAnimationFrame(animFrame);
    };
  }, [isResizing]);

  return {
    isLowPerformance,
  };
}

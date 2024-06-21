import { MutableRefObject, useLayoutEffect, useState } from "react";

export function useIsLowPowerMode(
  videoRef: MutableRefObject<HTMLVideoElement>,
) {
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);

  useLayoutEffect(() => {
    videoRef.current.play().catch((error) => {
      if (error.name === "NotAllowedError") {
        //low power mode
        setIsLowPowerMode(true);
      }
    });
    requestAnimationFrame(() => videoRef.current.pause());
  }, [videoRef]);

  return isLowPowerMode;
}

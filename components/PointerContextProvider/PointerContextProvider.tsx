"use client";

import { MotionValue, useMotionValue } from "framer-motion";
import React, { createContext, useContext, useEffect, useState } from "react";

const PointerStateContext = createContext({
  x: new MotionValue<number>(),
  y: new MotionValue<number>(),
  isPressed: false,
});

type Props = {
  children: React.ReactNode;
};

export const usePointerContext = () => useContext(PointerStateContext);

const PointerContextProvider = ({ children }: Props) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const handlePointerDown = () => setIsPressed(true);
    const handlePointerUp = () => setIsPressed(false);

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [x, y]);

  return (
    <PointerStateContext.Provider
      value={{
        x,
        y,
        isPressed,
      }}
    >
      {children}
    </PointerStateContext.Provider>
  );
};

export default PointerContextProvider;

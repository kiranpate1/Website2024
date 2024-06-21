"use client";

import React, { useLayoutEffect, useRef } from "react";
import { createContext, useContext, useEffect, useState } from "react";

const WindowDimensionContext = createContext({
  width: 0,
  height: 0,
  debounced: {
    width: 0,
    height: 0,
  },
  isResizing: false,
});

type Props = { children: React.ReactNode };

export const WindowDimensionContextProvider = ({ children }: Props) => {
  const [dim, setDim] = useState({ width: 0, height: 0 });

  const [debouncedDim, setDebouncedDim] = useState({ width: 0, height: 0 });

  const [isResizing, setIsResizing] = useState(false);
  const debouncedDimensionDelay = 500;

  useEffect(() => {
    let timeout: any;

    setDim({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = (): void =>
      setDim({
        width: window.innerWidth,
        height: window.innerHeight,
      });

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <WindowDimensionContext.Provider
      value={{ ...dim, debounced: { ...debouncedDim }, isResizing }}
    >
      {children}
    </WindowDimensionContext.Provider>
  );
};

/**
 *
 * A state the captures the window size (width, height)
 *
 * Usage:
 * const {width, height} = useWindowDimension();
 *
 * @returns
 * {width, height}
 *
 */
export const useWindowDimension = () => useContext(WindowDimensionContext);

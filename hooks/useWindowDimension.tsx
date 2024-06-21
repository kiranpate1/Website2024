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

    const updateDim = () => {
      setDim({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        setDebouncedDim({
          width: window.innerWidth,
          height: window.innerHeight,
        });
        setIsResizing(false);
      }, debouncedDimensionDelay);

      setIsResizing(true);
    };
    updateDim();
    window.addEventListener("resize", updateDim);
    return () => {
      timeout && clearTimeout(timeout);
      window.removeEventListener("resize", updateDim);
    };
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

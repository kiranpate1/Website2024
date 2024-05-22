import { useMemo, useEffect, useState } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
//@ts-ignore
import tailwindConfig from "../tailwind.config.ts";
import { useWindowDimension } from "./useWindowDimension";

// USAGE
// const isOverBreakpoint = useBreakpoint(breakpointInPixel)
// const isMobile = useMobileBreakpoint();

const fullConfig = resolveConfig(tailwindConfig);

interface BreakpointValues {
  default: number | string | Function;
  sm?: number | string | Function;
  md?: number | string | Function;
  lg?: number | string | Function;
  xl?: number | string | Function;
  "2xl"?: number | string | Function;
}

/**
 *
 * Quick way to toggle between different breakpoint values
 *
 * @param breakpointValues
 * @param deps
 * @returns
 */
export function useBreakpointValues(
  breakpointValues: BreakpointValues,
  deps: any[],
) {
  const currBreakpoint = useAllBreakpoints();
  const [value, setValue] = useState<any>(breakpoints.sm);
  const allBreakpointsNames = useMemo(() => Object.keys(breakpoints), []);

  useEffect(() => {
    let newBreakpointValue: any = breakpointValues.default;
    let breakpointName = "";
    for (let i = 0; i < allBreakpointsNames.length; i++) {
      breakpointName = allBreakpointsNames[i];
      const breakpointSize = breakpoints[breakpointName];
      if (
        currBreakpoint >= breakpointSize &&
        breakpointValues[breakpointName as keyof BreakpointValues]
      ) {
        newBreakpointValue =
          breakpointValues[breakpointName as keyof BreakpointValues];
      }
    }

    if (typeof newBreakpointValue === "function") {
      setValue(newBreakpointValue());
      return;
    }
    setValue(newBreakpointValue);
  }, [currBreakpoint, deps]);

  return value;
}

export function useAllBreakpoints() {
  const windowDimension = useWindowDimension();
  const [currentBreakpoint, setCurrentBreakpoint] = useState(0);
  const allBreakpoints = useMemo(() => Object.values(breakpoints), []);

  useEffect(() => {
    let newBreakpoint = 0;
    for (let i = 0; i < allBreakpoints.length; i++) {
      if (allBreakpoints[i] < windowDimension.width) {
        newBreakpoint = allBreakpoints[i];
        continue;
      }
      if (allBreakpoints[i] > windowDimension.width) {
        break;
      }
    }
    setCurrentBreakpoint(newBreakpoint);
  }, [windowDimension.width]);

  return currentBreakpoint;
}

/**
 * Returns true when the browser width is bigger than the specific breakpoint number
 * usage:
 *
 * const isBiggerThanMd = useBreakpoint(breakpoints.md); // breakpoints.md is a number
 * const isBiggerThanMiniNav = useBreakpoint(400);
 *
 * @param breakpointSize
 * @returns
 */
export function useBreakpoint(breakpointSize: number) {
  const windowDimension = useWindowDimension();
  const [isOverBreakpoint, setIsOverBreakpoint] = useState(false);

  useEffect(() => {
    setIsOverBreakpoint(windowDimension.width > breakpointSize);
  }, [windowDimension.width, breakpointSize]);

  return isOverBreakpoint;
}

// mobild shorthand for "useBreakpoint"
export function useMobileBreakpoint() {
  //@ts-ignore
  return useBreakpoint(parseInt(fullConfig.theme.screens.sm));
}

interface BreakpointTable {
  [key: string]: number;
}
export const breakpoints: BreakpointTable = {
  //@ts-ignore
  sm: parseInt(fullConfig.theme.screens.sm),
  //@ts-ignore
  md: parseInt(fullConfig.theme.screens.md),
  //@ts-ignore
  lg: parseInt(fullConfig.theme.screens.lg),
  //@ts-ignore
  xl: parseInt(fullConfig.theme.screens.xl),
  //@ts-ignore
  "2xl": parseInt(fullConfig.theme.screens["2xl"]),
};

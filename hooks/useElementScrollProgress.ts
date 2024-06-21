// import {
//   MotionValue,
//   useMotionValue,
//   useScroll,
//   useTransform,
// } from "framer-motion";
// import { useBounds } from "./useBounds";
// import { MutableRefObject, useEffect, useState } from "react";

// /**
//  * Tracks the scroll offset relative to the element.
//  * Beginning - 0, end - 1.
//  * usage: const [containerRef, progress] = useElementScrollProgress(deps);
//  *
//  * @param deps
//  * @returns
//  */
// export function useElementScrollProgress<T extends HTMLElement>(
//   deps = [],
// ): [MutableRefObject<T>, MotionValue] {
//   const { scrollY } = useScroll();

//   const [containerRef, bounds] = useBounds<T>(deps);
//   const progress = useTransform(scrollY, (latest) => {
//     return (latest - bounds.top) / bounds.height;
//   });

//   return [containerRef, progress];
// }

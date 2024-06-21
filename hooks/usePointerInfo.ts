// import { MotionValue, useMotionValue, useTransform } from "framer-motion";
// import { MutableRefObject, createContext, useEffect } from "react";
// import { BoundingBoxInfo } from "./useBounds";
// import { usePointerContext } from "@/components/PointerContextProvider/PointerContextProvider";

// /**
//  * Just like usePointerPosition, but you feed in the pointer bounding box.
//  * this impelmentation depends on the pointer context
//  *
//  * @param containerRef
//  * @param dependency
//  * @returns
//  */
// export function usePointerOffset<T extends HTMLElement>(
//   shouldTrack: boolean,
//   containerRef: MutableRefObject<T>,
//   anchor: "center" | "left" = "center",
// ) {
//   const pointer = usePointerPosition(shouldTrack);

//   const bounds: MotionValue<BoundingBoxInfo> = useTransform(
//     [pointer.x, pointer.y],
//     () => {
//       const rect = containerRef.current?.getBoundingClientRect() || {};
//       return {
//         left: rect.left || 0,
//         top: rect.top || 0,
//         right: rect.right || 0,
//         bottom: rect.bottom || 0,
//         width: rect.width || 0,
//         height: rect.height || 0,
//         x: rect.x || 0,
//         y: rect.y || 0,
//       };
//     },
//   );

//   const x = useTransform(pointer.x, (latest) => {
//     const container = bounds.get();

//     if (anchor === "center")
//       return latest - (container.left + container.width / 2);

//     return latest - container.left;
//   });
//   const y = useTransform(pointer.y, (latest) => {
//     const container = bounds.get();

//     if (anchor === "center")
//       return latest - (container.top + container.height / 2);

//     return latest - container.top;
//   });

//   return { x, y, bounds, anchor };
// }

// /**
//  *
//  * Convert the position of the offset into a value between -1 to -1,
//  * with it relationship to the container element's size.
//  *
//  * @param offset
//  * @returns
//  */
// export function usePointerOffsetNormalized(
//   offset: ReturnType<typeof usePointerOffset>,
// ) {
//   const x = useTransform(offset.x, (latest) => {
//     return latest / offset.bounds.get().width;
//   });
//   const y = useTransform(offset.y, (latest) => {
//     return latest / offset.bounds.get().height;
//   });
//   return { x, y };
// }

// /**
//  * Returns MotionValues that tracks the clientX, and clientY of the mouse position.
//  *
//  * @param shouldTrack
//  * @param boundingBox
//  * @returns
//  */
// export function usePointerPosition(shouldTrack: boolean) {
//   const globalPointerContext = usePointerContext();

//   const x = useMotionValue(0);
//   const y = useMotionValue(0);

//   useEffect(() => {
//     if (!shouldTrack) return;

//     const cleanupX = globalPointerContext.x.on("change", (latest) =>
//       x.set(latest),
//     );
//     const cleanupY = globalPointerContext.y.on("change", (latest) =>
//       y.set(latest),
//     );

//     return () => {
//       cleanupX();
//       cleanupY();
//     };
//   }, [x, y, globalPointerContext, shouldTrack]);

//   return { x, y };
// }

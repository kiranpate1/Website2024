import { useScroll } from "framer-motion";
import {
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useWindowDimension } from "./useWindowDimension";

export type BoundingBoxInfo = {
  x: number;
  y: number;
  width: number;
  height: number;
  left: number;
  right: number;
  top: number;
  bottom: number;
};

/**
 *
 * A state that measures the size of an HTML element.
 * Note that vertical positioning is relative to the page,
 * unlike browser native boundingClientRect.
 *
 * Example:
 *
 * const [elmRef, elmBounds] = useBounds<HTMLDivElement>([]);
 * return <div ref={elmRef}></div>;
 *
 * @param dependency
 * @returns [containerRef, bounds]
 */
export function useBounds<T extends HTMLElement>(
  dependency: any[] = [],
): [MutableRefObject<T>, BoundingBoxInfo] {
  const containerRef = useRef<T>() as MutableRefObject<T>;
  const [bounds, setBounds] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  });

  useLayoutEffect(() => {
    const handleResize = () => {
      const bounds = containerRef.current.getBoundingClientRect();

      const scrollOffset = window.scrollY;

      setBounds({
        x: bounds.x,
        y: bounds.y + scrollOffset,
        width: bounds.width,
        height: bounds.height,
        left: bounds.left,
        right: bounds.right,
        top: bounds.top + scrollOffset,
        bottom: bounds.bottom + scrollOffset,
      });
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, dependency);

  return [containerRef, bounds];
}

/**
 * Return bounds that relative to the document's top, left. (including scroll offset)
 * just like useBounds, but it allows you to feed in the container ref instead.
 * @param containerRef
 * @param dependency
 * @returns
 */
export function usePageBounds<T extends HTMLElement>(
  containerRef: MutableRefObject<T>,
  dependency: any[] = [],
): BoundingBoxInfo {
  const [bounds, setBounds] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  });

  useLayoutEffect(() => {
    const handleResize = () => {
      const bounds = containerRef.current.getBoundingClientRect();

      const scrollOffset = window.scrollY;

      setBounds({
        x: bounds.x,
        y: bounds.y + scrollOffset,
        width: bounds.width,
        height: bounds.height,
        left: bounds.left,
        right: bounds.right,
        top: bounds.top + scrollOffset,
        bottom: bounds.bottom + scrollOffset,
      });
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, dependency);

  return bounds;
}

/**
 * Return bounds that relative to the viewport, no added scroll offset
 * @param containerRef
 * @param dependency
 * @returns
 */
export function useViewportBounds<T extends HTMLElement>(
  containerRef: MutableRefObject<T>,
  dependency: any[] = [],
): BoundingBoxInfo {
  const [bounds, setBounds] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  });

  useLayoutEffect(() => {
    const handleResize = () => {
      const bounds = containerRef.current.getBoundingClientRect();

      setBounds({
        x: bounds.x,
        y: bounds.y,
        width: bounds.width,
        height: bounds.height,
        left: bounds.left,
        right: bounds.right,
        top: bounds.top,
        bottom: bounds.bottom,
      });
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, dependency);

  return bounds;
}

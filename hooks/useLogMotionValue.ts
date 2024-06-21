import { MotionValue, useMotionValueEvent } from "framer-motion";

export function useLogMotionValue(value: MotionValue, name?: string) {
  useMotionValueEvent(value, "change", (latest) => {
    console.log(`${name && `${name}:`}${latest}`);
  });
}

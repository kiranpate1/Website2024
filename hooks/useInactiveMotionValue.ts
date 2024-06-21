import { MotionValue, useTransform } from "framer-motion";

export function useInactiveMotionValue<T>(
  value: MotionValue<T>,
  isActive: boolean,
  defaultValue: T,
) {
  return useTransform(value, (latest) => (isActive ? latest : defaultValue));
}

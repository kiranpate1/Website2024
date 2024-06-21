import { MotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { useState } from "react";

export interface ItemTransitionProgressInfo {
  index: number;
  total: number;
  progress: MotionValue<number>; // the global progress
  transitionRange?: number;
  activeRange?: number;
  clamp?: boolean;
}

/**
 * Extract transition progress(MotionValue) of an item from a collection,
 * with reference to an overall motion value that depicts the overall progress.
 * Particularly useful for scroll interaction.
 *
 * @param param0
 * @returns
 */
export function useItemTransitionProgress({
  index,
  total,
  progress,
  clamp = false,
  transitionRange = 1 / total, // when performing transition
  activeRange = transitionRange / 2, // the stable range in which the item is active
}: ItemTransitionProgressInfo) {
  const progressPosition = index / total;
  const itemProgress = useTransform(
    progress,
    [
      progressPosition - transitionRange,
      progressPosition - activeRange,
      progressPosition + activeRange,
      progressPosition + transitionRange,
    ],
    [-1, 0, 0, 1],
    { clamp: clamp },
  );

  return itemProgress;
}

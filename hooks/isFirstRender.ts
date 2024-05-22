import { useRef } from "react";

function useIsFirstRender(): boolean {
  const isFirst = useRef(true);

  if (isFirst.current) {
    isFirst.current = false;

    return true;
  }

  return isFirst.current;
}

/**
 * A hook that returns true if the component is rendered for the first time.
 *  
 *  
 **/  
export default useIsFirstRender;

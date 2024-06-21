import useIsFirstRender from "@/hooks/isFirstRender";
import { MutableRefObject, useEffect, useRef } from "react";

type ComponentControlsFunctions = { [key: string]: Function };

export type ComponentControls<T extends ComponentControlsFunctions> = T & {
  exposeInternalFunctions: (functions: T) => void;
};

/**
 * Hook that allow a component expose limited
 * internal functions to the parent component
 * via the pattern of a controller.
 * @returns
 */
export function useComponentControls<
  T extends ComponentControlsFunctions,
>(): ComponentControls<T> {
  const controllerFunctionsRef = useRef() as MutableRefObject<T>;
  const isFirstRender = useIsFirstRender();

  // If the internal function is not provided after the first render,
  // it means the user haven't connect the controller to the
  // child component properly.
  if (controllerFunctionsRef.current !== null && !isFirstRender) {
    new Error(
      "Internal function not ready after first render: Make sure the controller is connected to a child component. Or the child component has provided the function",
    );
  }

  const exposeInternalFunctions = (functions: T) => {
    controllerFunctionsRef.current = functions;
  };

  const internalFunctions = controllerFunctionsRef.current;

  if (controllerFunctionsRef.current) {
    const internalFunctionsNames = Object.keys(controllerFunctionsRef.current);
    const internalFunctionsCopy: ComponentControlsFunctions = {};

    internalFunctionsNames.forEach((functionName) => {
      internalFunctionsCopy[functionName] = function () {
        const argsArray = Array.prototype.slice.call(arguments, 0);
        // reference the original original function in ref
        controllerFunctionsRef.current[functionName].apply(null, argsArray);
      };
    });

    return { ...(internalFunctionsCopy as T), exposeInternalFunctions };
  }

  return { ...internalFunctions, exposeInternalFunctions };
}

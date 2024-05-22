import { useEffect, useState } from "react";

export function useRandom(deps: any[] = []) {
  const [random, setRandom] = useState(0);
  useEffect(() => setRandom(Math.random()), deps);
  return random;
}

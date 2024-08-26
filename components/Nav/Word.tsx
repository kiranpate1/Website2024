import React, { MutableRefObject, useRef, useState, useEffect } from "react";
import {
  AnimatePresence,
  motion,
  useTransform,
  motionValue,
  useSpring,
} from "framer-motion";

type Props = {
  word: string;
  divRef: MutableRefObject<HTMLDivElement | null>;
};

const Word = ({ word, divRef }: Props) => {
  const wordRef = useRef() as MutableRefObject<HTMLDivElement | null>;

  const bioArray = word.split("");

  const [letterTransitions, setLetterTransitions] = useState(
    bioArray.map((letter) => ({
      translateY: 0,
      skewY: 0,
    }))
  );

  //letter transition
  const calculateLetterPosition = (index: number) => {
    if (!divRef.current || !wordRef.current)
      return { letter: "", position: { xRatio: 0 } };
    const divRect = divRef.current.getBoundingClientRect();
    const letterElement = wordRef.current.children[index];
    if (!letterElement) return { letter: "", position: { xRatio: 0 } };
    const letterRect = letterElement.getBoundingClientRect();
    const letterLeft = letterRect.left;
    const x = letterLeft - divRect.left;
    const xRatio = x / divRect.width;
    return { letter: bioArray[index], position: { xRatio } };
  };

  useEffect(() => {
    setTimeout(() => {
      let factor = 1;
      const interval = setInterval(() => {
        updateLetterTransitions();
        factor -= 1;
        if (factor < 0) {
          clearInterval(interval);
          setTimeout(() => {
            setLetterTransitions((prev) =>
              prev.map(() => ({
                translateY: 0,
                skewY: 0,
              }))
            );
          }, 200);
        }
      }, 0);

      return () => {
        clearInterval(interval);
      };
    }, 1000);
  }, []);

  function updateLetterTransitions() {
    const rect = divRef.current?.getBoundingClientRect();
    if (!rect) return; // Add null check

    const x = 0 - rect.left;
    const width = rect.width;
    const xDivRatio = x / width;

    setLetterTransitions((prev) =>
      prev.map((item, i) => {
        const {
          position: { xRatio: xLetterRatio },
        } = calculateLetterPosition(i);
        const translateDist =
          xLetterRatio !== undefined
            ? 1 - Math.abs(xLetterRatio - xDivRatio)
            : 0;
        const skewDist =
          xLetterRatio !== undefined ? xDivRatio - xLetterRatio : 0;
        const translateY = translateDist * Math.PI * 0.6;
        const skewY = -skewDist * Math.PI * 0.6;
        return {
          translateY,
          skewY,
        };
      })
    );
  }

  const TranslateYSpring = (index: number) =>
    useSpring(
      useTransform(
        motionValue(letterTransitions[index].translateY),
        (latest: number) => Math.sin(latest) * -400
      ),
      {
        stiffness: 400,
        damping: 150,
      }
    );

  const SkewYSpring = (index: number) =>
    useSpring(
      useTransform(
        motionValue(letterTransitions[index].skewY),
        (latest: number) => Math.sin(latest) * 60
      ),
      {
        stiffness: 400,
        damping: 150,
      }
    );

  return (
    <div ref={wordRef}>
      {word.split("").map((letter: string, index: number) => {
        return (
          <motion.div
            className="font-sans-lg origin-bottom-left inline-block text-white"
            style={{
              fontSize: "calc(1.6px + 4.55vw)",
              marginLeft: "-0.08vw",
              y: TranslateYSpring(index),
              skewY: SkewYSpring(index),
            }}
          >
            {letter}
          </motion.div>
        );
      })}
    </div>
  );
};

export default Word;

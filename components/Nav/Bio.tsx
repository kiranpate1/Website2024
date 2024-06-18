import React, { MutableRefObject, useRef, useState, useEffect } from "react";
import { motion, useTransform, motionValue, useSpring } from "framer-motion";

type props = {};

const Bio = (props: props) => {
  const divRef = useRef() as MutableRefObject<HTMLDivElement | null>;
  const textRef = useRef() as MutableRefObject<HTMLDivElement | null>;
  const text =
    "Kiran Patel is a designer, developer, and part-time nuisance in Toronto, from York-Sheridan design (YSDN). He is currently at Daybreak.";
  const textArray = text.split("");
  const [letterTransitions, setLetterTransitions] = useState(
    textArray.map((letter) => ({
      translateY: 0,
      skewY: 0,
    }))
  );
  const [number, setNumber] = useState(0);

  const calculateLetterPosition = (index: number) => {
    if (!divRef.current || !textRef.current)
      return { letter: "", position: { xRatio: 0 } };
    const divRect = divRef.current.getBoundingClientRect();
    const letterElement = textRef.current.children[index];
    if (!letterElement) return { letter: "", position: { xRatio: 0 } };
    const letterRect = letterElement.getBoundingClientRect();
    const letterLeft = letterRect.left;
    const x = letterLeft - divRect.left;
    const xRatio = x / divRect.width;
    return { letter: textArray[index], position: { xRatio } };
  };

  useEffect(() => {
    let factor = 100;
    const interval = setInterval(() => {
      updateLetterTransitions(factor);
      factor -= 1;
      if (factor < 0) {
        clearInterval(interval);
        setLetterTransitions((prev) => {
          return prev.map((item) => {
            return {
              translateY: 1,
              skewY: 0,
            };
          });
        });
      }
    }, 20);

    return () => {
      clearInterval(interval);
    };
  }, []);

  function updateLetterTransitions(factor: number) {
    const rect = divRef.current?.getBoundingClientRect();
    if (!rect) return; // Add null check

    const x = factor - rect.left;
    const width = 100;
    const xDivRatio = x / width;

    setLetterTransitions((prev) => {
      return prev.map((item, i) => {
        const {
          position: { xRatio: xLetterRatio },
        } = calculateLetterPosition(i);
        const translateDist =
          xLetterRatio !== undefined
            ? 1 - Math.abs(xLetterRatio - xDivRatio)
            : 0;
        const skewDist =
          xLetterRatio !== undefined ? xDivRatio - xLetterRatio : 0;
        const translateY = translateDist * Math.PI * 1.5 - Math.PI;
        const skewY = -skewDist * Math.PI * 1.5 + Math.PI;
        return {
          translateY,
          skewY,
        };
      });
    });
  }

  return (
    <div ref={divRef} className="absolute w-full top-0 left-0 origin-top-left">
      <div ref={textRef} className="">
        {textArray.map((letter, index) => {
          const motionTranslateY = useTransform(
            motionValue(letterTransitions[index].translateY),
            (latest: number) => Math.sin(latest) * 350
          );
          const springTranslateY = useSpring(motionTranslateY, {
            stiffness: 400,
            damping: 100,
          });

          const motionSkewY = useTransform(
            motionValue(letterTransitions[index].skewY),
            (latest: number) => Math.sin(latest) * 60
          );
          const springSkewY = useSpring(motionSkewY, {
            stiffness: 400,
            damping: 100,
          });

          return (
            <motion.div
              key={index}
              className="font-sans-lg origin-bottom-left inline-block"
              style={{
                fontSize: "4.7vw",
                marginLeft: "-0.03%",
                translateY: springTranslateY,
                skewY: springSkewY,
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Bio;

import React, { MutableRefObject, useRef, useState, useEffect } from "react";
import { motion, useTransform, motionValue, useSpring } from "framer-motion";

type props = {};

const Bio = (props: props) => {
  const divRef = useRef() as MutableRefObject<HTMLDivElement | null>;
  const bioRef = useRef() as MutableRefObject<HTMLDivElement | null>;
  const bio =
    "Kiran Patel is a designer, developer, and part-time nuissance in Toronto from York-Sheridan design. He is currently at Daybreak.";
  const bioArray = bio.split("");
  const [letterTransitions, setLetterTransitions] = useState(
    bioArray.map((letter) => ({
      translateY: 0,
      skewY: 0,
    }))
  );
  const [bioPosition, setBioPosition] = useState(320);
  const [bioSize, setBioSize] = useState(1);

  const calculateLetterPosition = (index: number) => {
    if (!divRef.current || !bioRef.current)
      return { letter: "", position: { xRatio: 0 } };
    const divRect = divRef.current.getBoundingClientRect();
    const letterElement = bioRef.current.children[index];
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
            setLetterTransitions((prev) => {
              return prev.map((item) => {
                return {
                  translateY: 0,
                  skewY: 0,
                };
              });
            });
          }, 200);

          setBioPosition(0);
          setBioSize(0.3);
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
        const translateY = translateDist * Math.PI * 0.6;
        const skewY = -skewDist * Math.PI * 0.6;
        return {
          translateY,
          skewY,
        };
      });
    });
  }

  function springTranslateY(index: number) {
    const motionTranslateY = useTransform(
      motionValue(letterTransitions[index].translateY),
      (latest: number) => Math.sin(latest) * -400
    );
    return useSpring(motionTranslateY, {
      stiffness: 400,
      damping: 150,
    });
  }

  function springSkewY(index: number) {
    const motionSkewY = useTransform(
      motionValue(letterTransitions[index].skewY),
      (latest: number) => Math.sin(latest) * 60
    );
    return useSpring(motionSkewY, {
      stiffness: 400,
      damping: 150,
    });
  }

  const bioTranslateY = useTransform(
    motionValue(bioPosition),
    (latest: number) => latest
  );
  const bioScale1 = useTransform(
    motionValue(bioSize),
    (latest: number) => latest
  );

  const bioY = useSpring(bioTranslateY, {
    stiffness: 400,
    damping: 100,
  });

  const bioScale = useSpring(bioScale1, {
    stiffness: 250,
    damping: 100,
  });

  return (
    <div ref={divRef} className="absolute w-full top-0 left-0 p-1">
      <motion.div
        ref={bioRef}
        style={{ y: bioY, scale: bioScale }}
        className="origin-top-left pointer-events-auto"
      >
        {bioArray.map((letter, index) => {
          return (
            <motion.div
              key={index}
              className="font-sans-lg origin-bottom-left inline-block"
              style={{
                fontSize: "4.65vw",
                marginLeft: "-0.03vw",
                translateY: springTranslateY(index),
                skewY: springSkewY(index),
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Bio;

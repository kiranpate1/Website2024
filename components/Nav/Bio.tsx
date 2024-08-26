import React, { MutableRefObject, useRef, useState, useEffect } from "react";
import {
  AnimatePresence,
  motion,
  useTransform,
  motionValue,
  useSpring,
} from "framer-motion";
import Word from "./Word";

type Props = {
  isMobile: boolean;
};

const Bio = ({ isMobile }: Props) => {
  const divRef = useRef() as MutableRefObject<HTMLDivElement | null>;
  const letterRef = useRef() as MutableRefObject<HTMLDivElement | null>;
  const bioRef = useRef() as MutableRefObject<HTMLDivElement | null>;
  const bio =
    "Kiran Patel is a design engineer by day, and illustrator by night from Toronto. Currently, he is crafting experiences at Daybreak.";
  const bioWords = bio.split(" ");

  const [bioPosition, setBioPosition] = useState(320);
  const [bioSize, setBioSize] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      let factor = 1;
      const interval = setInterval(() => {
        factor -= 1;
        if (factor < 0) {
          clearInterval(interval);

          setBioPosition(0);
          setBioSize(0.3);
        }
      }, 0);

      return () => {
        clearInterval(interval);
      };
    }, 1000);
  }, []);

  const bioTranslateY = useTransform(
    motionValue(bioPosition),
    (latest) => latest
  );
  const bioScale1 = useTransform(motionValue(bioSize), (latest) => latest);

  const bioY = useSpring(bioTranslateY, {
    stiffness: 400,
    damping: 100,
  });

  const bioScale = useSpring(bioScale1, {
    stiffness: 250,
    damping: 100,
  });

  return (
    <div
      ref={divRef}
      className="absolute w-full top-0 left-0"
      style={{ padding: "0.3vw" }}
    >
      <motion.div
        ref={bioRef}
        className="origin-top-left pointer-events-auto flex flex-wrap"
        style={{
          y: bioY,
          scale: isMobile ? 1 : bioScale,
          columnGap: "0.8vw",
        }}
      >
        {bioWords.map((word, wordIndex) => {
          return wordIndex == bioWords.length - 1 ? (
            <a
              className="opacity-60 hover:opacity-100 cursor-pointer duration-200"
              href={"https://daybreak.studio"}
              target="_blank"
            >
              <Word key={wordIndex} word={word} divRef={divRef} />
            </a>
          ) : (
            <Word key={wordIndex} word={word} divRef={divRef} />
          );
        })}
      </motion.div>
    </div>
  );
};

export default Bio;

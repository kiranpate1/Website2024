import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import Bio from "./Bio";
import Socials from "./Socials";
import Scrim from "./Scrim";

type props = {};

const Nav = (props: props) => {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    setWidth(window.innerWidth);

    function handleWindowSizeChange() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  return (
    <nav
      className="fixed z-10 top-0 left-0 w-full pointer-events-none"
      style={{
        height: isMobile ? "100%" : "auto",
        transition: "height 0.5s ease-in-out",
      }}
    >
      <Scrim isMobile={isMobile} />
      <Bio isMobile={isMobile} />
      <Socials isMobile={isMobile} />
    </nav>
  );
};

export default Nav;

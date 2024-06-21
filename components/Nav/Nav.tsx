import React from "react";
import Bio from "./Bio";
import Socials from "./Socials";

type props = {};

const Nav = (props: props) => {
  return (
    <nav className="fixed z-10 top-0 left-0 w-full h-auto pointer-events-none">
      <Bio />
      <Socials />
    </nav>
  );
};

export default Nav;

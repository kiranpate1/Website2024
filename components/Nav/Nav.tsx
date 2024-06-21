import React from "react";
import Bio from "./Bio";

type props = {};

const Nav = (props: props) => {
  return (
    <nav className="fixed z-10 top-0 left-0 w-full h-auto pointer-events-none">
      <Bio />
      <div className="absolute top-0 right-0">
        <ul>
          <li>
            <a href="#">Projects</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;

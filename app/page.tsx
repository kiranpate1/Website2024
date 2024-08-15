"use client";

import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import Image from "next/image";
import ExpandedProjects from "../components/ExpandedProjects/ExpandedProjects";
import Projects from "../components/Projects/Projects";
import Nav from "../components/Nav/Nav";

export default function Home() {
  const expanded = useRef() as MutableRefObject<HTMLDivElement | null>;
  const home = useRef() as MutableRefObject<HTMLDivElement | null>;

  return (
    <main className="bg-black">
      <ExpandedProjects expanded={expanded} />
      <div
        className="home"
        ref={home}
        style={{
          transition:
            "height 0.5s ease-in-out, filter 0.2s, transform 0.2s ease-in-out",
        }}
      >
        <Nav />
        <Projects expanded={expanded} home={home} />
      </div>
    </main>
  );
}

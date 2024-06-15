"use client";

import Image from "next/image";
import ProjectsWrapper from "../components/Projects/ProjectsWrapper";
import { ReactLenis } from "@studio-freight/react-lenis";

export default function Home() {
  return (
    // <ReactLenis root options={{ lerp: 1, duration: 1 }}>
    <main>
      <ProjectsWrapper />
    </main>
    // </ReactLenis>
  );
}

"use client";

import Image from "next/image";
import ProjectsWrapper from "../components/Projects/ProjectsWrapper";
import Nav from "../components/Nav/Nav";

export default function Home() {
  return (
    <main>
      <Nav />
      <ProjectsWrapper />
    </main>
  );
}

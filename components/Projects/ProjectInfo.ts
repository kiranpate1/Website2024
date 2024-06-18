import { color } from "framer-motion";

export type ProjectInfo = {
  image: string;
  name: string;
  type: string[];
  color?: string;
};

export const Projects = [
  {
    name: "Superpower website",
    image: "/projects/superpower-test.png",
    type: ["Design", "Development"],
    color: "#75C8FF",
  },
  {
    name: "Toronto Tech Week 2024",
    image: "/projects/thumbnail-1.png",
    type: ["Development"],
    color: "#FFEAD7",
  },
  {
    name: "Workmade vday campaign",
    image: "/projects/dtf.png",
    type: ["Design", "Development"],
    color: "#7ADBA7",
  },
  {
    name: "Pursuit app design",
    image: "/projects/pursuit.png",
    type: ["Product"],
    color: "#F9DAB2",
  },
  {
    name: "Daybreak website",
    image: "/projects/efdsdf.png",
    type: ["Design", "Development"],
    color: "#16C6DA",
  },
  {
    name: "Workmade website",
    image: "/projects/thumbnail-1.png",
    type: ["Design", "Development"],
    color: "#fff",
  },
  {
    name: "Freelance websites",
    image: "/projects/thumbnail-1.png",
    type: ["Development"],
    color: "#fff",
  },
  {
    name: "My failing art",
    image: "/projects/thumbnail-1.png",
    type: ["Artwork"],
    color: "#fff",
  },
  {
    name: "Grandma McFlurry",
    image: "/projects/thumbnail-1.png",
    type: ["Design", "Development"],
    color: "#fff",
  },
];

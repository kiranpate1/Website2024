import { color } from "framer-motion";

export type ProjectInfo = {
  image: string;
  name: string;
  type: string[];
  color?: string;
};

export const Projects = [
  {
    name: "superpower.com",
    image: "/projects/superpower.png",
    type: ["Design", "Development"],
    color: "#fff",
  },
  {
    name: "Toronto Tech Week 2024",
    image: "/projects/thumbnail-1.png",
    type: ["Development"],
    color: "#fff",
  },
  {
    name: "workmade.com",
    image: "/projects/thumbnail-1.png",
    type: ["Design", "Development"],
    color: "#fff",
  },
  {
    name: "Workmade vday campaign",
    image: "/projects/dtf.png",
    type: ["Design", "Development"],
    color: "#FFD2D7",
  },
  {
    name: "Pursuit app design",
    image: "/projects/pursuit.png",
    type: ["Product"],
    color: "#fff",
  },
  {
    name: "daybreak.studio",
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

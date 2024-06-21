import { color } from "framer-motion";
import { link } from "fs";

export type ProjectInfo = {
  image: string;
  name: string;
  type: string[];
  color?: string;
  link?: string;
};

export const Projects = [
  {
    name: "Superpower website",
    image: "/projects/superpower-test.png",
    type: ["Design", "Development"],
    color: "#75C8FF",
    link: "https://superpower.com",
  },
  {
    name: "Toronto Tech Week 2024",
    image: "/projects/thumbnail-1.png",
    type: ["Development"],
    color: "#FFEAD7",
    link: "https://torontotechweek2024.com",
  },
  {
    name: "Workmade vday campaign",
    image: "/projects/dtf.png",
    type: ["Design", "Development"],
    color: "#7ADBA7",
    link: "https://workmade.com",
  },
  {
    name: "Daybreak website",
    image: "/projects/efdsdf.png",
    type: ["Design", "Development"],
    color: "#16C6DA",
    link: "https://daybreak.studio",
  },
  {
    name: "Pursuit app design",
    image: "/projects/pursuit.png",
    type: ["Product"],
    color: "#F9DAB2",
    link: "https://apps.apple.com/us/app/pursuit-everyday-adventures/id6444900374",
  },
  {
    name: "Workmade website",
    image: "/projects/thumbnail-1.png",
    type: ["Design", "Development"],
    color: "#fff",
    link: "https://workmade.com",
  },
  {
    name: "My failing art",
    image: "/projects/thumbnail-1.png",
    type: ["Artwork"],
    color: "#fff",
    link: "https://instagram.com/artsbykiran",
  },
];

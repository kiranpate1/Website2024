import { color } from "framer-motion";
import { link } from "fs";
import { features } from "process";

export type ProjectInfo = {
  name: string;
  description: string;
  image: string;
  type: string[];
  color?: string;
  link?: string;
  features?: string[];
};

export const Projects = [
  {
    name: "Superpower website",
    description:
      "A platform for creators to share their work, connect with their audience, and get paid for their talent and creativity.",
    image: "/projects/superpower-new.png",
    type: ["Design", "Development"],
    color: "#75C8FF",
    link: "https://superpower.com",
    features: [
      "Awwwards SOTD",
      "Awwwards Developer Award",
      "Awwwards Honorable Mention",
      "Design lead",
      "Development lead",
    ],
  },
  {
    name: "Toronto Tech Week 2024",
    description:
      "A week-long event showcasing the best of Toronto's tech scene, featuring industry leaders, workshops, and networking opportunities.",
    image: "/projects/ttw.png",
    type: ["Development"],
    color: "#FFEAD7",
    link: "https://torontotechweek2024.com",
    features: ["Development lead", "Design support"],
  },
  {
    name: "Workmade valentines campaign",
    description:
      "A digital campaign to celebrate love and creativity, encouraging people to express their affection through art and design.",
    image: "/projects/dtf.png",
    type: ["Design", "Development"],
    color: "#7ADBA7",
    link: "https://downtofile.workmade.com",
    features: ["Development lead", "Design support"],
  },
  {
    name: "Daybreak website",
    description:
      "A design studio focused on creating beautiful digital experiences, helping businesses establish a strong online presence and engage with their target audience.",
    image: "/projects/efdsdf.png",
    type: ["Design", "Development"],
    color: "#16C6DA",
    link: "https://daybreak.studio",
    features: ["Development lead", "Design support"],
  },
  {
    name: "Pursuit app design",
    description:
      "A mobile app that helps you find new adventures in your city, discover hidden gems, and connect with like-minded explorers.",
    image: "/projects/pursuit.png",
    type: ["Product"],
    color: "#F9DAB2",
    link: "https://apps.apple.com/us/app/pursuit-everyday-adventures/id6444900374",
    features: ["Design lead"],
  },
  {
    name: "Workmade website",
    description:
      "A platform for creators to share their work, connect with other creatives, and monetize their talent through commissions and collaborations.",
    image: "/projects/workmade.png",
    type: ["Design", "Development"],
    color: "#fff",
    link: "https://workmade.com",
    features: ["Development lead", "Design support"],
  },
  {
    name: "My art instagram",
    description:
      "A collection of my artwork and design work, showcasing my creative journey and inspirations.",
    image: "/projects/art.png",
    type: ["Artwork"],
    color: "#fff",
    link: "https://instagram.com/artsbykiran",
  },
];

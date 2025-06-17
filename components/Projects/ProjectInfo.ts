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
    name: "Dropbox Brand Site",
    description:
      "An digital playground for Dropbox, showcasing their identity and overall brand experience.",
    image: "/projects/dropbox.png",
    type: ["Design", "Development"],
    color: "#75C8FF",
    link: "https://brand.dropbox.com",
    features: [
      "Awwwards Site of the Month",
      "Awwwards Site of the Day",
      "Awwwards Developer Award",
      "CSS Design Awards Site of the Month",
      "CSS Design Awards Site of the Day",
      "Webby: Best User Experience",
      "Webby: Best Responsive/Adaptive Design for Mobile",
      "Webby: Best Responsive/Adaptive Design for Mobile",
      "Development lead",
      "Design support",
    ],
  },
  {
    name: "TTW Teaser Site",
    description:
      "A brand new refresh for Toronto's biggest celebration of tech, innovation, and networking.",
    image: "/projects/ttw-teaser.png",
    type: ["Design", "Development"],
    color: "#75C8FF",
    link: "https://toronto-tech-week.webflow.io/",
    features: ["Lone developer", "Design support"],
  },
  {
    name: "Superpower website",
    description:
      "A modern and innovative website for a digital health clinic, with a focus on telling a compelling story and engaging users.",
    image: "/projects/superpower-new.png",
    type: ["Design", "Development"],
    color: "#75C8FF",
    link: "https://superpower.com",
    features: [
      "Awwwards Site of the Month",
      "Awwwards Site of the Day",
      "Awwwards Developer Award",
      "Awwwards Honorable Mention",
      "Design lead",
      "Development lead",
    ],
  },
  {
    name: "Toronto Tech Week 2024",
    description:
      "A website for Toronto Tech Week—showcasing the best of Toronto's tech scene, featuring industry leaders, workshops, and networking opportunities.",
    image: "/projects/ttw.png",
    type: ["Development"],
    color: "#FFEAD7",
    link: "https://torontotechweek2024.com",
    features: ["Development lead", "Design support"],
  },
  {
    name: "Workmade valentines campaign",
    description:
      "A digital campaign to celebrate valentines day and tax season, to promote Workmade's state-of-the-art tax software.",
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
      "A website for Workmade, a digital agency that helps freelancers file their taxes, manage their finances, and grow their business.",
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
    features: ["Instagram"],
  },
];

import type { TechType } from "./types";

type techInfoType = {
  [tech in TechType]: {
    src: string;
    label: string;
    color: string;
  };
};

export const techInfo: techInfoType = {
  // programming languages
  html: {
    src: "/images/html5.png",
    label: "HTML",
    color: "border-[#E54C21]",
  },
  css: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/CSS3_logo.svg/240px-CSS3_logo.svg.png",
    label: "CSS",
    color: "border-[#214CE5]",
  },
  js: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/2048px-Unofficial_JavaScript_logo_2.svg.png",
    label: "JavaScript",
    color: "border-[#F7E018]",
  },
  ts: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png",
    label: "TypeScript",
    color: "border-[#2D79C7]",
  },
  python: {
    src: "/images/python.png",
    label: "Python",
    color: "border-[#ffd73a]",
  },
  cpp: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1822px-ISO_C%2B%2B_Logo.svg.png",
    label: "C++",
    color: "border-[#659ad2]",
  },
  c: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/C_Programming_Language.svg/1853px-C_Programming_Language.svg.png",
    label: "C",
    color: "border-[#659ad2]",
  },
  // frontend frameworks & libraries
  react: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/768px-React-icon.svg.png?20220125121207",
    label: "React",
    color: "border-[#61DBFB]",
  },
  nextjs: {
    src: "/images/nextjs-dark.svg",
    label: "Next.js",
    color: "border-white",
  },
  vue: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/640px-Vue.js_Logo_2.svg.png",
    label: "Vue",
    color: "border-[#41b883]",
  },
  astro: {
    src: "https://astro.build/assets/press/logomark-dark.png",
    label: "Astro",
    color: "border-[#ff5d01]",
  },
  tailwind: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2048px-Tailwind_CSS_Logo.svg.png",
    label: "Tailwind",
    color: "border-[#07b6d5]",
  },
  vite: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Vitejs-logo.svg/1039px-Vitejs-logo.svg.png",
    label: "Vite",
    color: "border-[#8180fe]",
  },
  // server-side stuff
  node: {
    src: "https://cdn-icons-png.flaticon.com/512/5968/5968322.png",
    label: "Node.js",
    color: "border-[#67BB4A]",
  },
  express: {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG0_9eM3lYU6HHLllCjLdvpx-ppGsF4mUrDv98ORCMkg&s",
    // src: "https://w7.pngwing.com/pngs/925/447/png-transparent-express-js-node-js-javascript-mongodb-node-js-text-trademark-logo.png",
    label: "Express",
    color: "border-white",
  },
  ws: {
    src: "https://rayhan0x01.github.io/img/websocket.webp",
    label: "ws",
    color: "border-white",
  },
  discordjs: {
    src: "/images/discord-icon.svg",
    label: "Discord.js",
    color: "border-[#5865f2]",
  },
  // databases
  sqlite: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Sqlite-square-icon.svg/2048px-Sqlite-square-icon.svg.png",
    label: "SQLite",
    color: "border-[#0f80cc]",
  },
  postgres: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1985px-Postgresql_elephant.svg.png",
    label: "PostgreSQL",
    color: "border-[#336791]",
  },
  mysql: {
    src: "https://seeklogo.com/images/M/mysql-logo-69B39F7D18-seeklogo.com.png",
    label: "MySQL",
    color: "border-[#f29111]",
  },
  prisma: {
    // src: "/images/prisma.png",
    src: "https://www.prisma.io/images/favicon-32x32.png",
    label: "Prisma",
    color: "border-white",
  },
};

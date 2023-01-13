import type { TechType } from "./types";

type techInfoType = {
  [tech in TechType]: {
    link: string;
    src: string;
    label: string;
    color: string;
  };
};

export const techInfo: techInfoType = {
  // programming languages
  html: {
    link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    src: "/images/html5.png",
    label: "HTML",
    color: "border-[#E54C21]",
  },
  css: {
    link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/CSS3_logo.svg/240px-CSS3_logo.svg.png",
    label: "CSS",
    color: "border-[#214CE5]",
  },
  js: {
    link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/2048px-Unofficial_JavaScript_logo_2.svg.png",
    label: "JavaScript",
    color: "border-[#F7E018]",
  },
  ts: {
    link: "https://www.typescriptlang.org/",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png",
    label: "TypeScript",
    color: "border-[#2D79C7]",
  },
  python: {
    link: "https://www.python.org/",
    src: "/images/python.png",
    label: "Python",
    color: "border-[#ffd73a]",
  },
  cpp: {
    link: "https://cplusplus.com/",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1822px-ISO_C%2B%2B_Logo.svg.png",
    label: "C++",
    color: "border-[#659ad2]",
  },
  c: {
    link: "https://cplusplus.com/",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/C_Programming_Language.svg/1853px-C_Programming_Language.svg.png",
    label: "C",
    color: "border-[#659ad2]",
  },
  // frontend frameworks & libraries
  react: {
    link: "https://reactjs.org/",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/768px-React-icon.svg.png?20220125121207",
    label: "React",
    color: "border-[#61DBFB]",
  },
  nextjs: {
    link: "https://nextjs.org/",
    src: "/images/nextjs-dark.svg",
    label: "Next.js",
    color: "border-white",
  },
  vue: {
    link: "https://vuejs.org/",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/640px-Vue.js_Logo_2.svg.png",
    label: "Vue",
    color: "border-[#41b883]",
  },
  astro: {
    link: "https://astro.build/",
    src: "https://astro.build/assets/press/logomark-dark.png",
    label: "Astro",
    color: "border-[#ff5d01]",
  },
  tailwind: {
    link: "https://tailwindcss.com/",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2048px-Tailwind_CSS_Logo.svg.png",
    label: "Tailwind",
    color: "border-[#07b6d5]",
  },
  vite: {
    link: "https://vitejs.dev/",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Vitejs-logo.svg/1039px-Vitejs-logo.svg.png",
    label: "Vite",
    color: "border-[#8180fe]",
  },
  // server-side stuff
  node: {
    link: "https://nodejs.org/",
    src: "https://cdn-icons-png.flaticon.com/512/5968/5968322.png",
    label: "Node.js",
    color: "border-[#67BB4A]",
  },
  express: {
    link: "https://expressjs.com/",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG0_9eM3lYU6HHLllCjLdvpx-ppGsF4mUrDv98ORCMkg&s",
    // src: "https://w7.pngwing.com/pngs/925/447/png-transparent-express-js-node-js-javascript-mongodb-node-js-text-trademark-logo.png",
    label: "Express",
    color: "border-white",
  },
  ws: {
    link: "https://github.com/websockets/ws",
    src: "https://rayhan0x01.github.io/img/websocket.webp",
    label: "ws",
    color: "border-white",
  },
  discord: {
    link: "https://discord.com/developers/docs/intro",
    src: "/images/discord-icon.svg",
    label: "Discord Bot",
    color: "border-[#5865f2]",
  },
  // databases
  sqlite: {
    link: "https://www.sqlite.org/",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Sqlite-square-icon.svg/2048px-Sqlite-square-icon.svg.png",
    label: "SQLite",
    color: "border-[#0f80cc]",
  },
  postgres: {
    link: "https://www.postgresql.org/",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1985px-Postgresql_elephant.svg.png",
    label: "PostgreSQL",
    color: "border-[#336791]",
  },
  mysql: {
    link: "https://www.mysql.com/",
    src: "https://seeklogo.com/images/M/mysql-logo-69B39F7D18-seeklogo.com.png",
    label: "MySQL",
    color: "border-[#f29111]",
  },
  prisma: {
    link: "https://www.prisma.io/",
    // src: "/images/prisma.png",
    src: "https://www.prisma.io/images/favicon-32x32.png",
    label: "Prisma",
    color: "border-white",
  },
};

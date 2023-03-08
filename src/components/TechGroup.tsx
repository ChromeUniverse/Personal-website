import React from "react";
import { techInfo as info, TechType } from "../techInfo";

type CardProps = {
  tech: TechType;
};

const roundedTechs: TechType[] = ["express", "ws", "js", "vercel", "prisma"];
const smallTextTechs: TechType[] = [
  "ts",
  "js",
  "discord",
  "postgres",
  "headless-ui",
];

function TechCard({ tech }: CardProps) {
  const { color, label, src, srcLarge } = info[tech];

  const rounded = roundedTechs.includes(tech);
  const smallText = smallTextTechs.includes(tech);

  return (
    <div
      className={`group relative flex h-[65px] w-[65px] items-center justify-center rounded-xl bg-zinc-800 p-2 hover:border-2 md:h-[90px] md:w-[90px] md:rounded-2xl ${color}`}
    >
      {/* Image */}
      <img
        className={`h-[50px] ${rounded ? "rounded-lg" : ""}`}
        src={srcLarge ?? src}
        alt=""
      />
      {/* Dark translucent background */}
      <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-zinc-900 bg-opacity-80 opacity-0 transition-all group-hover:opacity-100">
        <p
          className={`
            text-center font-bold text-white
            ${smallText ? "text-sm" : "text-base"}
          `}
        >
          {label}
        </p>
      </div>
    </div>
  );
}

type Props = {
  fullWidth?: boolean;
  center?: boolean;
  title: string;
  techs: TechType[];
};

function TechGroup({ fullWidth = false, center = false, title, techs }: Props) {
  return (
    <div className="">
      {/* Title */}
      <h3>{title}</h3>
      {/* Tech card container */}
      <div
        className={`mx-auto mt-4 flex w-full flex-wrap gap-2 ${
          center ? "justify-center" : "justify-start"
        }`}
      >
        {techs.map((tech) => (
          <TechCard key={tech} tech={tech} />
        ))}
      </div>
    </div>
  );
}

export default TechGroup;

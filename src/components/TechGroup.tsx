import React from "react";
import { techInfo as info } from "../techInfo";
import type { TechType } from "../types";

type CardProps = {
  tech: TechType;
};

function TechCard({ tech }: CardProps) {
  const { color, label, src } = info[tech];

  const roundedTechs: TechType[] = ["express", "ws", "js"];
  const rounded = roundedTechs.includes(tech);

  const smallTextTechs: TechType[] = ["ts", "js", "discord", "postgres"];
  const smallText = smallTextTechs.includes(tech);

  return (
    <div
      className={`bg-zinc-800 p-2 rounded-xl md:rounded-2xl w-[65px] h-[65px] md:w-[90px] md:h-[90px] flex items-center justify-center relative tech-card group hover:border-2 ${color}`}
    >
      {/* Image */}
      <img
        className={rounded ? "tech-card-img-rounded" : ""}
        src={src}
        alt=""
      />
      {/* Dark translucent background */}
      <div className="z-10 rounded-2xl absolute bg-zinc-900 bg-opacity-80 inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
        <p
          className={`text-center font-bold ${
            smallText ? "small-text" : "normal-text"
          }`}
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
    <div className={fullWidth ? "tech-group-full-line" : ""}>
      {/* Title */}
      <h3>{title}</h3>
      {/* Tech card container */}
      <div
        className={`flex gap-2 mt-4 w-full flex-wrap mx-auto ${
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

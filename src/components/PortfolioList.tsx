import type { MarkdownInstance } from "astro";
import React, { useMemo, useState } from "react";
import { techInfo } from "../techInfo";
import type { TechType } from "../types";
import PortfolioCard from "./PortfolioCard";

type Props = {
  projects: MarkdownInstance<Record<string, any>>[];
};

function PortfolioList({ projects }: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<TechType[]>([]);

  console.log(selected);

  const toggleTech = (tech: TechType) => {
    setSelected((prevSelected) =>
      prevSelected.includes(tech)
        ? prevSelected.filter((t) => t !== tech)
        : [...prevSelected, tech]
    );
  };

  // todo: finish filtering implementation
  const filteredAndSortedProjects = useMemo(
    () =>
      projects
        .sort((p1, p2) => p1.frontmatter.index - p2.frontmatter.index)
        .filter((project) => {
          const techList = project.frontmatter.tech as TechType[];
          return selected.every((t) => techList.includes(t));
        }),
    [selected]
  );

  return (
    <>
      {/* Filtering section */}
      <div className="flex flex-col font-heading mt-4 select-none">
        {/* Dropdown container */}
        <div className="bg-zinc-800 py-2 ml-auto rounded-lg relative">
          {/* Dropdown toggle */}
          <div
            className={`cursor-pointer px-5 flex items-center transition-all
              ${open ? "w-48" : "w-32"}
            `}
            onClick={() => setOpen((prevOpen) => !prevOpen)}
          >
            {/* Text */}
            <p className="text-lg font-bold">Filter</p>
            {/* Rotating arrow Icon */}
            <i
              className={`ml-auto fa-solid fa-angle-down transition-all ${
                open ? "rotate-180" : "rotate-0"
              }`}
            ></i>
          </div>
          {/* Dropdown menu */}
          <div
            className={`
              absolute top-14 right-0 rounded-lg py-4 px-3 bg-zinc-800 w-48 flex-shrink-0 flex flex-col gap-1 transition-all drop-shadow-2xl
              ${open ? "z-10" : "-z-10 opacity-0"}
            `}
          >
            {/* Dropdown menu entries */}
            {Object.keys(techInfo).map((t) => {
              const tech = t as TechType;
              const { src, label } = techInfo[tech];
              return (
                <div
                  key={tech}
                  onClick={() => toggleTech(tech)}
                  className={`
                    flex items-center pl-2 py-1.5 rounded-md gap-2 cursor-pointer transition-all
                    ${
                      selected.includes(tech)
                        ? "bg-zinc-700 hover:bg-zinc-600 hover:bg-opacity-50"
                        : "bg-transparent hover:bg-zinc-700 hover:bg-opacity-50"
                    }
                  `}
                >
                  {/* Logo */}
                  <img
                    className="h-5 w-6 object-contain"
                    src={src}
                    alt={`Logo for ${label}`}
                  />
                  {/* Label/Name */}
                  <p
                    className={`${
                      selected.includes(tech) ? "font-bold" : "font-normal"
                    }`}
                  >
                    {label}
                  </p>
                  {/* Remove button */}
                </div>
              );
            })}
          </div>
        </div>
        {/* Selected technologies */}
      </div>

      {/* Content */}
      <main>
        {/* Container */}
        <div className="grid grid-cols-2 gap-4 px-2 mt-8 mb-8">
          {/* Portfolio cards */}
          {filteredAndSortedProjects.map((project) => (
            <PortfolioCard
              key={project.frontmatter.title}
              title={project.frontmatter.title}
              subtitle={project.frontmatter.subtitle}
              slug={project.frontmatter.slug}
              img={project.frontmatter["main-image"]}
            />
          ))}
        </div>
      </main>
    </>
  );
}

export default PortfolioList;

import type { MarkdownInstance } from "astro";
import React, { useMemo, useState } from "react";
import { techInfo, TechType } from "../techInfo";
import PortfolioCard from "./PortfolioCard";

type Props = {
  projects: MarkdownInstance<Record<string, any>>[];
};

function PortfolioList({ projects }: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<TechType[]>([]);

  const toggleTech = (tech: TechType) => {
    setSelected((prevSelected) =>
      prevSelected.includes(tech)
        ? prevSelected.filter((t) => t !== tech)
        : [...prevSelected, tech]
    );
  };

  const filteredAndSortedProjects = useMemo(
    () =>
      projects
        // .sort((p1, p2) => p1.frontmatter.index - p2.frontmatter.index)
        .filter((project) => {
          const techList = project.frontmatter.tech as TechType[];
          return selected.every((t) => techList.includes(t));
        }),
    [selected]
  );

  return (
    <>
      {/* Filtering section */}
      <div className="mt-4 flex select-none flex-col font-heading">
        {/* Dropdown container */}
        <div className="relative ml-auto rounded-lg bg-zinc-800 py-2">
          {/* Dropdown toggle */}
          <div
            className={`flex cursor-pointer items-center px-5 transition-all
              ${open ? "w-48" : selected.length === 0 ? "w-32" : "w-36"}
            `}
            onClick={() => setOpen((prevOpen) => !prevOpen)}
          >
            {/* Text */}
            <p className="text-lg font-bold">
              Filter {selected.length > 0 ? `(${selected.length})` : ""}
            </p>
            {/* Rotating arrow Icon */}
            <i
              className={`fa-solid fa-angle-down ml-auto transition-all ${
                open ? "rotate-180" : "rotate-0"
              }`}
            ></i>
          </div>
          {/* Dropdown menu */}
          <div
            className={`
              absolute top-14 right-0 flex h-72 w-48 flex-shrink-0 flex-col gap-1 overflow-y-scroll rounded-lg bg-zinc-800 py-4 px-3 drop-shadow-2xl transition-all
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
                    flex cursor-pointer items-center gap-2 rounded-md py-1.5 pl-2 transition-all
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
        <div className="mt-8 mb-8 grid grid-cols-1 gap-5 px-2 md:grid-cols-2">
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

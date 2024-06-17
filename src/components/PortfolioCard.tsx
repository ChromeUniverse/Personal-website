import React from "react";

type Props = {
  title: string;
  subtitle: string;
  img: string;
  slug: string;
};

function PortfolioCard({ title, subtitle, img, slug }: Props) {
  return (
    <div className="group relative flex items-center justify-center rounded-2xl border-4 border-black bg-zinc-700 font-heading transition-all hover:scale-105 hover:border-blue-500">
      {/*Main image */}
      <img className="rounded-xl" src={img} alt="" />
      {/* Project Name */}
      <p className="absolute bottom-0 right-0 select-none rounded-br-xl rounded-tl-xl border-4 border-blue-500 bg-zinc-900 bg-opacity-[85%] px-5 py-1.5 text-xl font-bold transition-all group-hover:opacity-0 md:select-text">
        {title}
      </p>

      {/* Dark semi-opaque background on card hover */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-xl bg-zinc-900 bg-opacity-[90%] px-4 py-4 opacity-0 transition-all group-hover:opacity-100">
        <h3 className="select-none text-center text-3xl font-bold md:select-text">
          {title}
        </h3>
        <p className="select-none text-center text-zinc-300 md:select-text">
          {subtitle}
        </p>
        <a
          href={`/portfolio/${slug}`}
          className="text-normal select-none space-x-2 rounded-lg border-2 border-blue-500 bg-zinc-900 px-4 py-1.5 font-heading font-bold transition-all hover:bg-blue-500 hover:text-zinc-900 md:select-text"
        >
          <span>More info</span>
          <i className="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
      </div>
    </div>
  );
}

export default PortfolioCard;

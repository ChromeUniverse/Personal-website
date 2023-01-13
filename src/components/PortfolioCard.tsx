import React from "react";

type Props = {
  title: string;
  subtitle: string;
  img: string;
  slug: string;
};

function PortfolioCard({ title, subtitle, img, slug }: Props) {
  return (
    <div className="bg-zinc-700 rounded-xl relative group font-heading flex items-center justify-center">
      {/*Main image */}
      <img className="rounded-xl" src={img} alt="" />
      {/* Project Name */}
      <p className="absolute bottom-0 right-0 rounded-br-xl rounded-tl-xl px-5 py-1.5 font-bold text-xl border-2 border-blue-500 bg-zinc-900 bg-opacity-[85%] group-hover:opacity-0 transition-all select-none md:select-text">
        {title}
      </p>

      {/* Dark semi-opaque background on card hover */}
      <div className="absolute rounded-xl inset-0 bg-zinc-900 bg-opacity-[90%] opacity-0 group-hover:opacity-100 transition-all px-4 py-4 flex flex-col items-center justify-center gap-2 border-2 border-transparent group-hover:border-blue-500">
        <h3 className="text-3xl font-bold text-center select-none md:select-text">
          {title}
        </h3>
        <p className="text-zinc-300 text-center select-none md:select-text">
          {subtitle}
        </p>
        <a
          href={`/portfolio/${slug}`}
          className="font-bold font-heading text-normal px-3 py-1 bg-zinc-900 border-blue-500 border-2 rounded-lg hover:bg-blue-500 hover:text-zinc-900 transition-all select-none md:select-text"
        >
          More info
        </a>
      </div>
    </div>
  );
}

export default PortfolioCard;

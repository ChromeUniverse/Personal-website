import React, { useState } from "react";

type CarouselButtonProps = {
  type: "left" | "right";
  setNextActive: (type: "left" | "right") => void;
};

function CarouselButton({ type, setNextActive }: CarouselButtonProps) {
  return (
    <button
      onClick={() => setNextActive(type)}
      className={`
        absolute top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-gray-900 bg-opacity-20 pt-0.5 text-2xl transition-all hover:bg-opacity-80 
        ${type === "left" ? "left-2" : "right-2"}
      `}
    >
      <i
        className={`
          fa-solid
          ${type === "left" ? "fa-arrow-left" : "fa-arrow-right"}
        `}
      ></i>
    </button>
  );
}

type Props = {
  images: string[];
};

function ImageCarousel({ images }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const mod = (n: number, m: number) => {
    return ((n % m) + m) % m;
  };

  const setNextActive = (type: "left" | "right") => {
    setActiveIndex((prevActiveIndex) => {
      const nextActiveIndex =
        type === "left"
          ? mod(prevActiveIndex - 1, images.length)
          : mod(prevActiveIndex + 1, images.length);
      return nextActiveIndex;
    });
  };

  return (
    <>
      <div className="relative mt-10 h-[400px] w-full rounded-xl">
        {/* Images container */}
        <div id="images">
          {images.map((img, index) => (
            <img
              key={index}
              className={`
            carousel-image absolute inset-0 h-full w-full object-contain transition-all
            ${index === activeIndex ? "opacity-100" : "opacity-0"} 
          `}
              src={img}
              alt={`Carousel image #${index}`}
            />
          ))}
        </div>

        {/* Buttons */}
        <CarouselButton setNextActive={setNextActive} type="left" />
        <CarouselButton setNextActive={setNextActive} type="right" />
      </div>

      {/* Indicator */}
      <div className="mt-5 mb-1 flex justify-center gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-3 w-3 cursor-pointer rounded-full transition-all ${
              index === activeIndex
                ? "scale-110 bg-white"
                : "bg-zinc-600 hover:bg-blue-500"
            }`}
          ></div>
        ))}
      </div>
    </>
  );
}

export default ImageCarousel;

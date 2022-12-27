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
        absolute top-1/2 -translate-y-1/2 text-2xl w-10 h-10 bg-gray-900 bg-opacity-20 rounded-full pt-0.5 hover:bg-opacity-80 transition-all 
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
      <div className="relative w-full h-[400px] rounded-xl">
        {/* Images container */}
        <div id="images">
          {images.map((img, index) => (
            <img
              key={index}
              className={`
            carousel-image absolute inset-0 w-full h-full object-contain transition-all
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
      <div className="flex justify-center gap-2 mt-3 mb-1">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              index === activeIndex ? "bg-white scale-110" : "bg-zinc-600"
            }`}
          ></div>
        ))}
      </div>
    </>
  );
}

export default ImageCarousel;

import React from "react";
import { useGlobalContext } from "../context/AppContext";

const Intro = () => {
  const { getStarted } = useGlobalContext();

  return (
    <div className="w-full min-h-[40rem] flex items-center justify-center">
      <div className="w-full animate-fadeIn flex flex-col items-center justify-center gap-2">
        <h1 className="text-blue300 capitalize   text-2xl font-bold md:text-4xl">
          quizzical
        </h1>
        <h1 className="text-blue300   font-normal text-sm sm:text-base">
          Dive in to test yourself
        </h1>
        <button
          onClick={getStarted}
          className="bg-blue200 text-center rounded-xl text-white100 w-full max-w-[10rem] py-3   text-sm font-medium tracking-wide mt-5 transition-transform active:scale-95 sm:text-base sm:py-4 sm:max-w-[12rem]"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Intro;

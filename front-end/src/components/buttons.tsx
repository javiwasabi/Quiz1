import React from "react";
import { Link } from "react-router-dom";

export const ButtonStart: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[10%] w-full font-title">
      <Link to="/question">
        <button
          className="relative -top-1 -left-1 bg-gray-800 py-10 px-8 sm:py-20 sm:px-10 font-medium uppercase text-white text-3xl sm:text-2xl bg-transparent"
          style={{ transform: "rotate(-11deg)" }}
        >
          START
        </button>
      </Link>
    </div>
  );
};

interface ButtonNextProps {
  onClick?: () => void;
}

export const ButtonNext: React.FC<ButtonNextProps> = ({ onClick }) => {
  return (
    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4 sm:mb-8 md:mb-12 lg:mb-16">
      <button
        className="relative px-8 py-4 sm:px-12 sm:py-6 lg:px-16 lg:py-8 xl:px-20 xl:py-10 bg-transparent text-black text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bentham rounded-full border-4  transition-all hover:bg-black hover:text-white"
        onClick={onClick}>
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity"></div>
        <span className="relative z-10">NEXT</span>
      </button>
    </div>
  );
};


interface ChoiceProps {
  title: string;
  route: string;
}

export const Choice1: React.FC<ChoiceProps> = ({ title, route }) => {
  return (
    <div className="flex flex-col items-center">
      <Link to={route}>
        <button className="relative bg-blue-600 text-white font-medium text-lg py-4 px-8 rounded-full transition-all before:absolute before:top-1 before:left-1 before:w-full before:h-full before:bg-blue-500 before:rounded-full before:content-[''] before:transition-all hover:top-0 hover:left-0 hover:before:top-0 hover:before:left-0 active:top-1 active:left-1 active:before:top-1 active:before:left-1">
          {title}
        </button>
      </Link>
    </div>
  );
};

export const Choice2: React.FC<ChoiceProps> = ({ title, route }) => {
  return (
    <div className="flex flex-col items-center">
      <Link to={route}>
        <button className="relative bg-red-600 text-white font-medium text-lg py-4 px-8 rounded-full transition-all before:absolute before:top-1 before:left-1 before:w-full before:h-full before:bg-red-500 before:rounded-full before:content-[''] before:transition-all hover:top-0 hover:left-0 hover:before:top-0 hover:before:left-0 active:top-1 active:left-1 active:before:top-1 active:before:left-1">
          {title}
        </button>
      </Link>
    </div>
  );
};

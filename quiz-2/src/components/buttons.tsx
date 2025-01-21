import React from "react";
import { Link } from "react-router-dom";

export const ButtonStart: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[10%] w-full font-title">
      <Link to="/question">
        <button
          className="relative -top-1 -left-1 bg-gray-800 py-10 px-8 sm:py-20 sm:px-10 font-medium uppercase text-white text-3xl sm:text-2xl bg-transparent"
          style={{ transform: "rotate(0deg)" }}
        >
          START
        </button>
      </Link>
    </div>
  );
};

interface ButtonNextProps {
  onClick?: () => void;
  id?: string; 
}

export const ButtonNext: React.FC<ButtonNextProps> = ({ onClick, id }) => {
  return (
    <div className="absolute bottom-[15%] left-1/2 transform -translate-x-1/2 mb-4 sm:mb-6 md:mb-8 lg:mb-10">
      <button
        id={id} 
        className="relative px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 lg:px-12 lg:py-6 bg-gray-800 text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bentham rounded-full border-4 transition-all hover:bg-black hover:text-white"
        onClick={onClick}
      >
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity"></div>
        <span className="relative z-10">NEXT</span>
      </button>
    </div>
  );
};


export const NextP:React.FC<ButtonNextProps> = ({ onClick, id }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[10%] w-full font-title">
        <button
          className="relative -top-1 -left-1 bg-gray-800 py-10 px-8 sm:py-20 sm:px-10 font-medium uppercase text-black text-3xl sm:text-2xl bg-transparent"
          style={{ transform: "rotate(0deg)" }}
          onClick={onClick}
          id={id} 
        >
          NEXT
        </button>

    </div>
  );
};


export const Choice: React.FC<{ onClick: () => void; id: string }> = ({
  onClick,
  id,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-[10%] w-[90%] font-title ">
      <button
        className=" bg-gray-800 py-10 px-8 sm:py-14 sm:px-10 md:py-16 md:px-12 lg:py-18 lg:px-16 font-medium uppercase text-white text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl bg-transparent"
        onClick={onClick}
        id={id}
      >
        {id === "choice-pokemon" ? "Pokemon" : "Technology"}
      </button>
    </div>
  );
};



export const ButtonStartp: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[10%] w-full font-title">
      <Link to="/guess">
        <button
          className="relative -top-1 -left-1 bg-gray-800 py-10 px-8 sm:py-20 sm:px-10 font-medium uppercase text-white text-3xl sm:text-2xl bg-transparent"
          style={{ transform: "rotate(0deg)" }}
        >
          START
        </button>
      </Link>
    </div>
  );
};

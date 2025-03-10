import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const userLang = navigator.language || navigator.language;
const isSpanish = userLang.startsWith("es");

interface ButtonNextProps {
  onClick?: () => void;
  id?: string; 
}

export const Choice: React.FC<{ 
  onClick: () => void; 
  id: string; 
  disabled: boolean; 
}> = ({ onClick, id, disabled }) => {
  const isSpanish = navigator.language.startsWith("es"); 

  return (
    <div className="flex flex-col items-center justify-center w-full h-auto font-bentham">
      <button
        className={`bg-white flex items-center justify-center w-auto min-w-[130px] max-w-full py-2 px-4 sm:py-3 sm:px-6 font-medium uppercase text-black text-lg sm:text-2xl leading-tight rounded-full transition-shadow duration-300 h-auto ${
          disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
        }`}
        onClick={!disabled ? onClick : undefined}
        id={id}
        disabled={disabled}
        style={{
          boxShadow: "0px 8px 8px -2px rgba(0, 0, 0, 0.5)",
        }}
      >
        {id === "choice-pokemon" ? (isSpanish ? "Personaje" : "Character") : (isSpanish ? "Tecnología" : "Technology")}
      </button>
    </div>
  );
};

export const ButtonStartp: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[9%] w-full font-bentham">
      <Link to="/guess">
        <button
          className="bg-white flex items-center justify-center w-[100%] py-2 px-4 sm:py-2 sm:px-6 font-medium uppercase text-black text-xl sm:text-2xl leading-tight rounded-full transition-shadow duration-300"
          style={{
            boxShadow: "0px 8px 8px -2px rgba(0, 0, 0, 0.5)",
          }}
        >
       
          {isSpanish ? "INICIAR" : "START"}
        </button>
      </Link>
    </div>
  );
};

export const NextP: React.FC<ButtonNextProps> = ({ onClick, id }) => {
  return (
    <div className="flex items-center justify-center h-full w-full font-bentham">
      <button
        className="bg-white flex items-center justify-center w-auto min-w-[100px] max-w-[90%] py-2 px-4 sm:py-3 sm:px-6 font-medium uppercase text-black text-lg sm:text-2xl leading-tight rounded-full transition-shadow duration-300 h-auto"
        style={{
          boxShadow: "0px 8px 8px -2px rgba(0, 0, 0, 0.5)",
        }}
        onClick={onClick}
        id={id}
        aria-label="Next Button"
      >
        <span className=" z-10">{isSpanish ? "SIGUIENTE" : "NEXT"}</span>
      </button>
    </div>
  );
};

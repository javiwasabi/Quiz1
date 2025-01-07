import React, { useState, useEffect } from "react";
import ReactCardFlip from "react-card-flip";

interface fileCardProps {
  imageUrl: string;
  context: string;
  score: number;
  isCorrect: boolean;
  isFlipped: boolean;
}

interface CardProps {
  imageUrl: string;
  context: string;
  score: number;
  isCorrect: boolean;
  isFlipped: boolean; // Indicador de si la carta está volteada
}

export const Card: React.FC<CardProps> = ({ imageUrl, context, score, isCorrect, isFlipped }) => {
  const [typedText, setTypedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (isFlipped && index < context.length) {
      const timeoutId = setTimeout(() => {
        setTypedText((prev) => prev + context[index]);
        setIndex(index + 1);
      }, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [index, context, isFlipped]);

  return (
    <div className="flex flex-col w-[60%]  sm:w-[80%] lg:w-[60%] mx-auto mt-[0] absolute left-[40%]">
      <div className={`flex flex-col items-center bg-white shadow-lg rounded-lg p-4 sm:p-8`}>
        <div className="w-[100%] h-48 sm:h-64 object-cover rounded-lg" style={{ backgroundColor: isFlipped ? "white" : "black" }}>
          {isFlipped ? (
            <p className="text-sm sm:text-base lg:text-lg mt-4 font-title" style={{ borderRight: "2px solid white", animation: "blink 0.5s step-end infinite" }}>
              {typedText}
            </p>
          ) : (
            <p className="text-sm sm:text-base lg:text-lg mt-4 text-transparent">{"."}</p>
          )}
          {isFlipped && (
            <p className={`mt-4 text-lg sm:text-xl font-frijole ${isCorrect ? "text-green-500" : "text-red-500"}`}>
              {isCorrect ? "Correct!" : "Wrong!"}
            </p>
          )}
        </div>
      </div>

      <style>
        {`
          @keyframes blink {
            from { border-right-color: transparent; }
            to { border-right-color: white; }
          }
        `}
      </style>
    </div>
  );
};

export const FileCard: React.FC<fileCardProps> = ({ imageUrl, context, score, isCorrect, isFlipped }) => {
  return (
    <div className="flex flex-col justify-center items-center w-[60%] sm:w-[80%] lg:w-[60%] mx-auto mt-[0] absolute left-[30%]">
      <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-4 sm:p-8" style={{ transform: "rotate(11deg)" }}>
        <img src={imageUrl} alt="Card" className="w-full h-48 sm:h-64 object-cover rounded-lg" />
        <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-700 font-frijole">Can you guess who this is?</p>
      </div>
    </div>
  );
};

export const PolaroidPhoto: React.FC = () => {
  return (
    <div className="flex flex-col w-[100%] sm:w-[80%] lg:w-[60%] mx-auto mt-[0] absolute left-[10%]">
      <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-4 sm:p-8" style={{ transform: "rotate(-11deg)" }}>
        <div className="w-full h-48 sm:h-64 object-cover rounded-lg bg-black">
          <p>hola</p>
        </div>
        <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-700 font-frijole">Can you guess who this is?</p>
      </div>
    </div>
  );
};

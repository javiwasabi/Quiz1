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
  isFlipped: boolean;
}
export const Card: React.FC<CardProps> = ({ imageUrl, context, isCorrect, isFlipped }) => {
  const [typedText, setTypedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setTypedText("");
    setIndex(0);
  }, [context]);

  useEffect(() => {
    if (isFlipped && index < context.length) {
      const timeoutId = setTimeout(() => {
        setTypedText((prev) => prev + context[index]);
        setIndex((prevIndex) => prevIndex + 1);
      }, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [index, context, isFlipped]);

  return (
    <div className="flex flex-col items-center justify-center w-[50%] sm:w-[60%] lg:w-[60%] mx-auto mt-4 "
    style={{ transform: "rotate(11deg)"}}>
      <div
        className={`relative flex items-center justify-center w-full h-64 sm:h-80 bg-white shadow-lg rounded-lg ${
          isFlipped ? "bg-white" : ""
        }`}
      >
        {isFlipped ? (
          <div className="p-4">
            <p className=" sm:text-base lg:text-lg text-2xl mt-4 font-Merriweather" style={{ animation: "blink 0.5s step-end infinite" }}>
              {typedText}
            </p>
          
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full bg-white">
            <div className="w-40 h-40 bg-black rounded-lg shadow-md">Can you guess who this is?</div>
            <p className="mt-4 text-sm sm:text-base align-center lg:text-lg text-white opacity-50 font-frijole">
              Can you guess who this is?
            </p>
          </div>
        )}
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
    <div className="flex flex-col justify-center items-center w-[100%] sm:w-[80%] lg:w-[60%] mx-auto mt-[0] absolute left-[0%]">
      <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-4 sm:p-8" style={{ transform: "rotate(-11deg)" }}>
        <img src={imageUrl} alt="Card" className="w-full h-48 sm:h-64 object-cover rounded-lg" />
        <p className="mt-4 text-xl text-center sm:text-base lg:text-lg text-gray-900 font-Merriweather">Can you guess who this is?</p>
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
        <p className="mt-4 text-sm sm:text-base lg:text-lg font-bold text-white" >Can you guess who this is?</p>
      </div>
    </div>
  );
};


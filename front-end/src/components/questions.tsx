import React, { useState, useEffect } from "react";

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

export const Card: React.FC<CardProps> = ({ imageUrl, context, isCorrect, isFlipped, score }) => {
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
    <div
      className="flex flex-col items-center justify-center w-[90%] sm:w-[80%] md:w-[90%] lg:w-[90%] mx-auto mt-4"
      style={{ transform: "rotate(11deg)" }}
    >
      <div
        className={`relative flex items-center justify-center w-full h-64 sm:h-80 bg-white shadow-lg rounded-lg ${
          isFlipped ? "bg-white" : ""
        }`}
      >
        {isFlipped ? (
          <div className="p-4">
            <p
              data-testid={`typed-text-${score}`}
              className="sm:text-base lg:text-lg text-2xl mt-4 font-Merriweather"
              style={{ animation: "blink 0.5s step-end infinite" }}
            >
              {typedText}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full bg-white">
            <div className=" text-3xl font-bentham w-32 h-32 sm:w-40 sm:h-40 bg-black rounded-lg shadow-md text-white flex items-center justify-center text-center">
              Guess 
            </div>
            <p className="mt-4 text-sm sm:text-base lg:text-lg text-white font-frijole">
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
    <div className="flex flex-col justify-center items-center w-[100%] sm:w-[100%] md:w-[70%] lg:w-[100%] mx-auto mt-4">
      <div
        className="flex flex-col items-center bg-white shadow-lg rounded-lg p-4 sm:p-6 md:p-8"
        style={{ transform: "rotate(-11deg)" }}
      >
        <img
          src={imageUrl}
          alt="Card"
          className="w-full h-48 sm:h-64 object-cover rounded-lg"
        />
        <p className="mt-4 text-xl sm:text-xl md:text-2xl text-center text-gray-900 font-Merriweather">
          Can you guess who this is?
        </p>
      </div>
    </div>
  );
};

export const PolaroidPhoto: React.FC = () => {
  return (
    <div className="flex flex-col w-[90%] sm:w-[90%] md:w-[90%] lg:w-[90%] mx-auto mt-4">
      <div
        className="flex flex-col items-center bg-white shadow-lg rounded-lg p-4 sm:p-6 md:p-8"
        style={{ transform: "rotate(-11deg)" }}
      >
        <div className="w-[100%] h-[50%] sm:h-64 object-cover rounded-lg bg-black flex items-center justify-center">
          <p className="text-black">Photo Placeholder  </p>
          
        </div>
        <p className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white font-bentham">
          Guess
        </p>
      </div>
    </div>
  );
};

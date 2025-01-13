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
    <div className="flex flex-col items-center justify-center w-full sm:w-full md:w-11/12 lg:w-8/12 mx-auto mt-4">
      <div
        className={`relative flex flex-col items-center bg-white shadow-lg rounded-lg p-4 sm:p-6 md:p-8 ${isFlipped ? "" : ""}`}
        style={{ transform: isFlipped ? "rotate(0deg)" : "rotate(11deg)" }}
      >
        {isFlipped ? (
          <div className="p-4 w-full">
            <p
  className="mt-4 text-lg sm:text-base md:text-lg lg:text-xl font-light font-Merriweather"
  style={{
    fontSize: "3vw",
    lineHeight: "1.5", 
  }}
>
  {typedText}
</p>
          </div>
        ) : (
          <>
            <div className="w-full aspect-[3/4] bg-black flex items-center justify-center rounded-lg">
              <p className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bentham">Guess</p>
            </div>
            <p className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white font-bentham">
              Can you guess who this is?
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export const FileCard: React.FC<fileCardProps> = ({ imageUrl, context, score, isCorrect, isFlipped }) => {
  return (
    <div className="flex flex-col w-full sm:w-3/4 md:w-4/5 lg:w-4/5 mx-auto mt-4">
      <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-4 sm:p-6 md:p-8" style={{ transform: "rotate(-11deg)" }}>
        <div className="w-full aspect-[4/3] bg-white flex items-center justify-center rounded-lg">
          <img
            src={imageUrl}
            alt="Polaroid"
            className="w-full h-full object-contain"
            style={{ maxWidth: "100%", maxHeight: "500px" }}
          />
        </div>

        <p className="mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black font-bentham text-center leading-tight">
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

        <div className="w-full aspect-[3/4] bg-black flex items-center justify-center rounded-lg">
          <p className="text-black">Photo Placeholder</p>
        </div>

        <p className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white font-bentham">
          Guess
        </p>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";

interface CardProps {
  imageUrl: string;
  context: string;
  score: number;
  isCorrect: boolean;
  isFlipped: boolean; // Prop para controlar el flip
}

const Card: React.FC<CardProps> = ({ imageUrl, context, score, isCorrect, isFlipped }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen mt-[20%]">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        {/* Cara frontal */}
        <div className="w-56 h-72 bg-white shadow-lg rounded-lg overflow-hidden relative flex flex-col items-center justify-end mt-[20%]">
          <img
            src={imageUrl}
            alt="Imagen Polaroid"
            className="w-2/3 h-2/3 object-cover z-10 rounded-md"
          />
          {/* Texto inferior */}
          <div className="w-full p-2 text-center text-sm text-black z-10 bg-opacity-75 bg-black">
            <p className="text-white">Choose</p>
          </div>
        </div>

        {/* Cara trasera */}
        <div className="w-56 h-72 bg-gray-800 opacity-95 flex flex-col justify-center items-center rounded-lg shadow-lg text-white">
          <p className="text-center text-lg font-bold">
            {isCorrect ? "¡Nice!" : "Wrong"}
          </p>
          <p className="text-center mt-2">{context}</p>
          <p className="text-center mt-4">Puntaje: {score}</p>
        </div>
      </ReactCardFlip>
    </div>
  );
};

export default Card;


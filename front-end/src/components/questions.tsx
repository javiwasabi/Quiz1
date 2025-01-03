import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";

interface CardProps {
  imageUrl: string;
  context: string;
  score: number;
  isCorrect: boolean;
}

const Card: React.FC<CardProps> = ({ imageUrl, context, score, isCorrect }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen mt-[20%]">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        {/* Cara frontal */}
        <div
          className="w-64 h-80 bg-white shadow-lg rounded-lg overflow-hidden relative flex flex-col items-center justify-end mt-[20%]"
          onClick={handleFlip}
        >
          <img
            src={imageUrl}
            alt="Imagen Polaroid"
            className="w-full h-3/4 object-cover"
          />
          <div className="w-full bg-white p-2 text-center text-sm text-black">
            <p>Choose</p>
          </div>
        </div>

        {/* Cara trasera */}
        <div
          className="w-64 h-80 bg-gray-300 flex flex-col justify-center items-center rounded-lg shadow-lg"
          onClick={handleFlip}
        >
          <p className="text-center text-lg font-bold">
            {isCorrect ? "¡Correcto!" : "Incorrecto"}
          </p>
          <p className="text-center mt-2">{context}</p>
          <p className="text-center mt-4">Puntaje: {score}</p>
        </div>
      </ReactCardFlip>
    </div>
  );
};

export default Card;

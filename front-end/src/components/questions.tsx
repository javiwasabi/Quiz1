import React from "react";
import ReactCardFlip from "react-card-flip";

interface CardProps {
  imageUrl: string;
  context: string;
  score: number;
  isCorrect: boolean;
  isFlipped: boolean;
}

const Card: React.FC<CardProps> = ({ imageUrl, context, score, isCorrect, isFlipped }) => {
  return (
    <div className="flex flex-col justify-center items-center w-[90%] h-auto sm:w-[80%] sm:h-[70%] lg:w-[60%] mt-[10%] mx-auto">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        {/* Front side */}
        <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-4 sm:p-8">
          <img
            src={imageUrl}
            alt="Card"
            className="w-full h-48 sm:h-64 object-cover rounded-lg"
          />
          <p className="mt-4 text-sm sm:text-base lg:text-lg  text-gray-700 font-frijole">
            Can you guess who this is?
          </p>
        </div>

        {/* Back side */}
        <div className="flex flex-col items-center bg-gray-800 shadow-lg rounded-lg p-4 sm:p-8 text-white">
          <p className="text-sm sm:text-base lg:text-lg">{context}</p>
          <p
            className={`mt-4 text-lg sm:text-xl font-bold ${
              isCorrect ? "text-green-500" : "text-red-500"
            }`}>
            {isCorrect ? "Correct!" : "Wrong!"}
          </p>
          <p className="text-sm sm:text-base">Score: {score}</p>
        </div>
      </ReactCardFlip>
    </div>
  );
};

export default Card;



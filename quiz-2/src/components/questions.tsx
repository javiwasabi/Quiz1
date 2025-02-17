import React, { useState, useEffect } from "react";
import '../styles/background.css';
import "../styles/poke.css";


interface CardPropsp {
  imageUrl: string;
  context: string; 
  isCorrect: boolean; 
  isFlipped: boolean; 
  score: number; 
  onNext: () => void; 
  namep: string;
}
export const CardPok: React.FC<CardPropsp> = ({
  imageUrl,
  context,
  isCorrect,
  isFlipped,
  score,
  namep,
  onNext,
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [pokemon, setPokemon] = useState<any>(null);


  useEffect(() => {
    setIsRevealed(isFlipped);
  }, [isFlipped]);

  return (
    <div className="flex absolute bottom-0 w-full">
      <div className="relative flex flex-col items-center font-bentham w-full">

        <div
         className={` nesthub:h-[250px]  nesthub:top-[20%]   nesthub:w-[150px] fixed top-[40%] relative w-[180px] sm:w-[250px] md:w-[300px] lg:w-[350px] xl:w-[200px] h-[250px] sm:h-[180px] md:h-[160px] lg:h-[140px] xl:h-[300px] z-0 ${
          isRevealed ? "opacity-0" : "opacity-100"
        }`}
          style={{
            transform: isRevealed ? "rotateY(180deg)" : "rotate(0deg)",
            transition: "transform 0.5s ease-in-out, opacity 0.5s ease",
          }}
        >
            <img
          src="/assets/who.webp"
          alt="Background"
          className="absolute inset-0 h-full w-full  "
        />
         
        </div>


        <div
          className={`nesthub:h-[250px]  nesthub:top-[10%]   nesthub:w-[320px]  fixed top-[50%] top-[90%] sm:top-[70%] absolute transition-transform duration-500 ${
            isRevealed
              ? "-translate-y-[40%] opacity-100 scale-100"
              : "translate-y-[50%] opacity-0 scale-90"
          }`}
        >
            <img
          src="/assets/who_cleanup.webp"
          alt="Background"
          className="absolute inset-0 h-full w-full  "
        />

          <div
            id="card"
            style={{
             

              transform: isRevealed ? "scale(1)" : "scale(0.7)",
              opacity: isRevealed ? "1" : "0",
              top: "0vh",
            }}
            className="card absolute inset-0 h-full w-full w-full max-w-[210px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px] xl:max-w-[250px] h-[200px] sm:h-[180px] md:h-[160px] lg:h-[140px] xl:h-[120px] z-10 fixed top-[10%]" 
          >
            <img
              src={imageUrl}
              alt={context}
              className="card-image"
              style={{
                transform: isRevealed ? "scale(0.8)" : "scale(0.6)",
                transition: "transform 0.5s ease",
                top: "1vh",
              }}
            />
            <h2 className="poke-name font-light font-bentham text-md sm:text-lg text-center">{context}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

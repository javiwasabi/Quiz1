import React, { useState, useEffect } from "react";
import '../styles/background.css';
import "../styles/poke.css";
import ReactCardFlip from "react-card-flip";

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
  const [showBack, setShowBack] = useState(false);
  const [pokemon, setPokemon] = useState<any>(null);

  useEffect(() => {
    if (isFlipped) {
      setIsRevealed(true);
      setTimeout(() => {
        setShowBack(true);
      }, 100); // Delay para mostrar la carta trasera después del flip
    } else {
      setShowBack(false);
      setTimeout(() => {
        setIsRevealed(false);
      }, 50); // Delay para ocultar la carta trasera después del flip
    }
  }, [isFlipped]);

  const alwaysfalse = useState(false);
  
  return (
    <div className="flex absolute inset-0 items-center justify-center w-full h-full">
      <ReactCardFlip isFlipped={isRevealed} flipDirection="horizontal">
        <div className="relative flex flex-col items-center font-bentham w-full">
          <div 
            className={`nesthub:h-[250px] nesthub:w-[320px] z-0 ${isFlipped ? "transparent" : ""}`}
            style={{
              transform: isRevealed ? "rotateY(180deg)" : "rotate(0deg)",
              overflow: "hidden",
            }}
          >
            <img src="/assets/who.webp" alt="Background" className="absolute inset-0 z-0 h-full w-full" />
            <div
              id="card"
              className={`card flex flex-col items-center justify-center absolute inset-0 max-w-[210px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px] xl:max-w-[250px] h-[200px] sm:h-[180px] md:h-[160px] lg:h-[140px] xl:h-[120px] z-10 ${alwaysfalse ? "invisible" : ""}`}
            >
              <img
                src={imageUrl}
                alt={context}
                className="card-image"
                style={{
                  transform: isRevealed ? "scale(0.8)" : "scale(0.6)",
                }}
              />
              <h2 className="poke-name font-light font-bentham text-md sm:text-lg text-center">
                {context}
              </h2>
            </div>
          </div>
        </div>

        {/* carta trasera */}
        <div className="nesthub:h-[250px] nesthub:w-[320px]">
          <img src="/assets/who_cleanup.webp" alt="Background" className="absolute inset-0 h-full w-full z-10" />
          <div
            id="card"
            style={{
              transform: isRevealed ? "scale(1)" : "scale(0.7)",
              top: "0vh",
              visibility: showBack ? "visible" : "hidden", // Solo se muestra después del delay
            }}
            className="card flex flex-col items-center justify-center absolute inset-0 max-w-[210px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px] xl:max-w-[250px] h-[200px] sm:h-[180px] md:h-[160px] lg:h-[140px] xl:h-[120px] z-10"
          >
            <img
              src={imageUrl}
              alt={context}
              className="card-image"
              style={{
                transform: isRevealed ? "scale(0.8)" : "scale(0.6)",
              }}
            />
            <h2 className="poke-name font-light font-bentham text-md sm:text-lg text-center">
              {context}
            </h2>
          </div>
        </div>
      </ReactCardFlip>
    </div>
  );
};

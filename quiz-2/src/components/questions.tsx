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

  useEffect(() => {
    setIsRevealed(isFlipped);
  }, [isFlipped]);
  const alwaysfalse = useState(false);

  return (
    <div className="flex absolute inset-0 items-center justify-center w-full h-full">
      <ReactCardFlip key={isFlipped ? "flipped" : "unflipped"} isFlipped={isRevealed} flipDirection="horizontal">
        {/* Carta frontal */}
        <div className="relative flex flex-col items-center font-bentham w-full">
          <div className="nesthub:h-[250px] nesthub:w-[320px] z-0 overflow-hidden">
            <img src="/assets/who.webp" alt="Background" className="absolute inset-0 z-0 h-full w-full" />
            <div id="card"   className={`card flex flex-col items-center justify-center absolute inset-0 max-w-[210px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px] xl:max-w-[250px] h-[200px] sm:h-[180px] md:h-[160px] lg:h-[140px] xl:h-[120px] z-10  ${alwaysfalse ? "invisible" : "invisible"}`}>
              <img src={imageUrl} alt={context} className="card-image" style={{ transform: isRevealed ? "scale(0.8)" : "scale(0.6)" }} />
              <h2 className="poke-name font-light font-bentham text-lg text-center">{context}</h2>
            </div>
          </div>
        </div>

        {/* Carta trasera */}
        <div className="nesthub:h-[250px] nesthub:w-[320px]">
          <img src="/assets/who.webp" alt="Background" className="absolute inset-0 h-full w-full" />
          <img src="/assets/who_cleanup.webp" alt="Background" className="absolute inset-0 h-full w-full z-10" />
          <div id="card"   className={`card flex flex-col items-center justify-center absolute inset-0 max-w-[210px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px] xl:max-w-[250px] h-[200px] sm:h-[180px] md:h-[160px] lg:h-[140px] xl:h-[120px] z-10 ${isFlipped ? "" : "invisible"}`}>
            <img src={imageUrl} alt={context} className="card-image" style={{ transform: isRevealed ? "scale(0.8)" : "scale(0.6)" }} />
            <h2 className="poke-name font-light font-bentham text-lg text-center">{context}</h2>
          </div>
        </div>
      </ReactCardFlip>
    </div>
  );
};
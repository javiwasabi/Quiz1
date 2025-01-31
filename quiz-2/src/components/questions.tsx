import React, { useState, useEffect } from "react";
import { NextP } from "./buttons";
import '../styles/background.css';
import "../styles/poke.css";

const typeColor: Record<string, string> = {
  bug: "#26de81",
  dragon: "#CEB154",
  electric: "#F3C92A",
  fairy: "#FF0069",
  fighting: "#30336b",
  fire: "#f0932b",
  flying: "#81ecec",
  grass: "#00b894",
  ground: "#EFB549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#2d3436",
  water: "#59A2E6",
};
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
          className={`fixed top-[-20%] sm:top-[-10%] w-40 h-40 ball z-0 ${
            isRevealed ? "opacity-0" : "opacity-100"
          }`}
          style={{
            transform: isRevealed ? "rotateY(180deg)" : "rotate(0deg)",
            transition: "transform 0.5s ease-in-out, opacity 0.5s ease",
          }}
        >
          <div className="inside"></div>
          <div className="center"></div>
          <div className="absolute bottom-[20%] left-0 right-0 h-1/2 bg-transparent rounded-b-full"></div>
        </div>


        <div
          className={`absolute transition-transform duration-500 ${
            isRevealed
              ? "-translate-y-[40%] opacity-100 scale-100"
              : "translate-y-[50%] opacity-0 scale-90"
          }`}
        >

          <div
            id="card"
            style={{
              background:
                "radial-gradient(circle at 70% 0%, white, 46%, #EEEEEE 36%)",
              transform: isRevealed ? "scale(1)" : "scale(0.7)",
              opacity: isRevealed ? "1" : "0",
              top: "6vh",
            }}
            className="card w-full max-w-[210px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px] xl:max-w-[250px] h-[200px] sm:h-[180px] md:h-[160px] lg:h-[140px] xl:h-[120px] z-10" 
          >
            <img
              src={imageUrl}
              alt={context}
              className="card-image"
              style={{
                transform: isRevealed ? "scale(0.8)" : "scale(0.6)",
                transition: "transform 0.5s ease",
              }}
            />
            <h2 className="poke-name font-light font-bentham text-xl sm:text-xl">{context}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

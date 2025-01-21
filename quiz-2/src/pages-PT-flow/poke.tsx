import React, { useState, useEffect } from "react";
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

const PokemonCard: React.FC = () => {
  const [pokemon, setPokemon] = useState<any>(null);

  const fetchPokemon = async () => {
    const id = Math.floor(Math.random() * 150) + 1;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    setPokemon(data);
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  const {
    stats,
    sprites,
    name,
    types,
  }: { stats: any[]; sprites: any; name: string; types: any[] } = pokemon;
  const hp = stats[0].base_stat;
  const imgSrc = sprites.other.dream_world.front_default;
  const pokeName = name[0].toUpperCase() + name.slice(1);
  const statAttack = stats[1].base_stat;
  const statDefense = stats[2].base_stat;
  const statSpeed = stats[5].base_stat;
  const themeColor = typeColor[types[0].type.name];

  return (
    <div className="container">
      <div
        id="card"
        style={{
          background: `radial-gradient(circle at 70% 0%, ${themeColor} 46%, #EEEEEE 36%)`,
        }}
      >
        <p className="hp">
          <span>HP</span> {hp}
        </p>
        <img src={imgSrc} alt={pokeName} />
        <h2 className="poke-name">{pokeName}</h2>
        <div className="types">
          {types.map((type, index) => (
            <span
              key={index}
              style={{ backgroundColor: themeColor }}
            >
              {type.type.name}
            </span>
          ))}
        </div>
        <div className="stats">
          <div>
            <h3>{statAttack}</h3>
            <p>Attack</p>
          </div>
          <div>
            <h3>{statDefense}</h3>
            <p>Defense</p>
          </div>
          <div>
            <h3>{statSpeed}</h3>
            <p>Speed</p>
          </div>
        </div>
      </div>
      <button id="btn" onClick={fetchPokemon}>
        Refresh ↻
      </button>
    </div>
  );
};

export default PokemonCard;

import React, {useState} from "react";
import { ButtonStartp } from "../components/buttons";

import '../styles/background.css';

const First: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  
    const handleClick = () => {
      setIsRevealed(!isRevealed);
    };
  
  return (
    <div className="bg-gray-300 min-h-screen flex items-center justify-center">
      
      <div className="relative w-[70%] h-[80vh] overflow-hidden rounded-lg shadow-xl flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-bl from-custom-dark via-custom-dark to-[#ebeaea]"></div>


        <div className="relative w-48 h-48 ball" onClick={handleClick}>
          <div className="inside"></div>
          <div className="center"></div>
          <div className="absolute bottom-[0%] left-0 right-0 h-1/2 bg-white rounded-b-full border-t-4 border-black shadow-2xl"></div>
        </div>

        {/* Pokémon */}
        <div
          className={`absolute transition-transform duration-500 ${
            isRevealed ? '-translate-y-48 opacity-100' : 'translate-y-0 opacity-0'
          }`}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black text-6xl font-extrabold">
      ?
    </div>
        </div>
        
        <div className="absolute top-[90%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-10 w-full items-center justify-center  text-center">
          <h2 className=" uppercase text-white text-xl sm:text-2xl bg-transparent items-center justify-center text-center">
            Tecnology or Pokemon
          </h2>
        
          <ButtonStartp />
        </div>

        <div className="absolute top-[20%] left-[50%] transform -translate-x-1/2 text-center px-4 md:px-0 rounded-md z-10">
          
        </div>
      </div>
    </div>
  );
};

export default First;

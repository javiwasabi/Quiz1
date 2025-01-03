import React from "react";
import { ButtonStart } from "../components/buttons";

const Vie: React.FC = () => {
  return (
    <div className="relative h-screen w-screen">
      <img
        src="./first-image.png"
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute top-[10%] left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-4xl font-extrabold text-black">
          Can you guess an inventor from a murderer?
        </p>
      </div>

      <div className="absolute bottom-[37%] left-[22%] w-0 h-0">
        <ButtonStart />
      </div>
    </div>
  );
};

export default Vie;




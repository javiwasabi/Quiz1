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
      <div className="absolute top-[62%] left-[27%] transform -translate-x-1/2 -translate-y-1/2">
        <ButtonStart />
      </div>
      <div className="absolute top-[10%] left-1/2 transform -translate-x-1/2 text-center px-4 md:px-0 bg-black bg-opacity-30 rounded-md">
  <p className="text-2xl md:text-4xl font-frijole text-white">
    Can you guess an inventor from a murderer?
  </p>
</div>

    </div>
  );
};

export default Vie;




import React from "react";
import { ButtonStart } from "../components/buttons";

const Vie: React.FC = () => {
  return (
    <div className="relative h-screen w-screen">
      <img
        src="https://www.ofiellaw.com/images/Sealing-Criminal-Records.2002041345550.jpg"
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute top-[67%] left-[40%] transform -translate-x-1/2 -translate-y-1/2">
        <ButtonStart />
      </div>
      <div className="absolute top-[20%] left-[32%] transform -translate-x-1/2 text-center px-4 md:px-0  rounded-md">
      <p className="text-4xl md:text-4xl font-bentham text-white">
        Can you guess an inventor from a murderer?
      </p>
    </div>

    </div>
  );
};

export default Vie;




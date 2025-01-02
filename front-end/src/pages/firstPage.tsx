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

      <div className="absolute bottom-[30%] left-[20%] z-10">
        <ButtonStart />
      </div>
    </div>
  );
};

export default Vie;





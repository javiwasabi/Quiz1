import React from "react";
import { ButtonStart, ButtonNext, Choice1, Choice2 } from "../components/buttons";

const Middle: React.FC = () => {
  return (
    <div className="relative h-screen w-screen">

      <img
        src="./question-image.webp"
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover"
      />

  
      <div className="absolute top-4 right-4 z-10">
        <ButtonNext />
      </div>

      <div className="absolute bottom-[20%] left-1/2 transform -translate-x-1/2 z-10 flex space-x-4">
        <Choice1 title="Murderer" route="/question" />
        <Choice2 title="Inventor" route="/question" />
      </div>
    </div>
  );
};

export default Middle;

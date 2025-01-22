import React, { useState, useRef, useEffect } from "react";

const PokemonCard: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
  };

  const handleMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || !sliderRef.current || !handleRef.current) return;

    const sliderWidth = sliderRef.current.offsetWidth;
    const handleWidth = handleRef.current.offsetWidth;
    const sliderLeft = sliderRef.current.getBoundingClientRect().left;

    const clientX =
      "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;

    let newPosition = clientX - sliderLeft - handleWidth / 2;
    newPosition = Math.max(0, Math.min(newPosition, sliderWidth - handleWidth));

    setPosition(newPosition);
  };

  const handleEnd = () => {
    if (!isDragging || !sliderRef.current || !handleRef.current) return;

    const sliderWidth = sliderRef.current.offsetWidth;
    const handleWidth = handleRef.current.offsetWidth;

    if (position >= sliderWidth - handleWidth) {
      alert("¡Confirmación completada!");
    }

    setPosition(0); // Reinicia la posición
    setIsDragging(false);
  };

  useEffect(() => {
    const handleGlobalMove = (e: MouseEvent | TouchEvent) => handleMove(e);
    const handleGlobalEnd = () => handleEnd();

    if (isDragging) {
      document.addEventListener("mousemove", handleGlobalMove);
      document.addEventListener("mouseup", handleGlobalEnd);
      document.addEventListener("touchmove", handleGlobalMove);
      document.addEventListener("touchend", handleGlobalEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMove);
      document.removeEventListener("mouseup", handleGlobalEnd);
      document.removeEventListener("touchmove", handleGlobalMove);
      document.removeEventListener("touchend", handleGlobalEnd);
    };
  }, [isDragging, position]);

  return (
    <div
      ref={sliderRef}
      style={{
        position: "relative",
        width: "90%",
        maxWidth: "400px",
        height: "60px", // Ajusta según el tamaño de la figura
        borderRadius: "30px",
        backgroundColor: position >= (sliderRef.current?.offsetWidth || 300) - 60 ? "#4caf50" : "#ddd",
        margin: "20px auto",
        overflow: "hidden",
      }}
    >
      <div
        ref={handleRef}
        onMouseDown={handleStart}
        onTouchStart={handleStart}
        style={{
          position: "absolute",
          top: "10px",
          left: `${position}px`,
          cursor: "pointer",
        }}
      >

        <div className=" ">
        <img
          src=" https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/640px-Pok%C3%A9_Ball_icon.svg.png"
          alt="Background"
          className="absolute inset-0 h-full w-[10%]"
        />

        </div>
      </div>
    </div>
  );
};

export default PokemonCard;

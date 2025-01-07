import React from "react";
import { render, screen, act } from "@testing-library/react";
import { Card, FileCard, PolaroidPhoto } from "../../components/questions"; 

describe("Card Components Test Suite", () => {
  describe("Card Component", () => {
    test("renders typed text incrementally when flipped", async () => {
      jest.useFakeTimers();

      render(
        <Card
          imageUrl="test-image.jpg"
          context="Hello"
          score={0}
          isCorrect={true}
          isFlipped={true}
        />
      );

      // Inicialmente, el texto debería estar vacío
      expect(screen.getByTestId("typed-text-0")).toHaveTextContent("");

      // Avanzar el temporizador para simular la escritura
      act(() => {
        jest.advanceTimersByTime(1000); // Avanza 1 segundo
      });
      expect(screen.getByTestId("typed-text-0")).toHaveTextContent("H");

      act(() => {
        jest.advanceTimersByTime(1000); // Avanza 1 segundo más
      });
      expect(screen.getByTestId("typed-text-0")).toHaveTextContent("He");

      act(() => {
        jest.advanceTimersByTime(1000); // Avanza 1 segundo más
      });
      expect(screen.getByTestId("typed-text-0")).toHaveTextContent("Hel");

      act(() => {
        jest.advanceTimersByTime(1000); // Avanza 1 segundo más
      });
      expect(screen.getByTestId("typed-text-0")).toHaveTextContent("Hell");

      act(() => {
        jest.advanceTimersByTime(2000); // Avanza 2 segundos más
      });
      expect(screen.getByTestId("typed-text-0")).toHaveTextContent("Hello");

      jest.useRealTimers();
    });

    test("renders typed text incrementally when flipped with dynamic score", async () => {
      jest.useFakeTimers();
      const score = 0; // Puedes ajustar el valor del score aquí según sea necesario

      render(
        <Card
          imageUrl="test-image.jpg"
          context="Hello"
          score={score}
          isCorrect={true}
          isFlipped={true}
        />
      );

      // Inicialmente, el texto debería estar vacío
      const typedText = screen.getByTestId(`typed-text-${score}`);
      expect(typedText).toHaveTextContent("");

      act(() => {
        jest.advanceTimersByTime(1000); 
      });
      expect(typedText).toHaveTextContent("H");

      act(() => {
        jest.advanceTimersByTime(1000); 
      });
      expect(typedText).toHaveTextContent("He");

      act(() => {
        jest.advanceTimersByTime(1000); 
      });
      expect(typedText).toHaveTextContent("Hel");

      act(() => {
        jest.advanceTimersByTime(1000); 
      });
      expect(typedText).toHaveTextContent("Hell");

      act(() => {
        jest.advanceTimersByTime(2000);
      });
      expect(typedText).toHaveTextContent("Hello");

      jest.useRealTimers();
    });
  });

  describe("FileCard Component", () => {
    test("renders with correct image and text", () => {
      render(
        <FileCard
          imageUrl="test-image.jpg"
          context="Test context"
          score={10}
          isCorrect={true}
          isFlipped={false}
        />
      );

      // Check image rendering
      const imgElement = screen.getByAltText("Card");
      expect(imgElement).toBeInTheDocument();
      expect(imgElement).toHaveAttribute("src", "test-image.jpg");

      // Check text content
      expect(screen.getByText(/Can you guess who this is\?/i)).toBeInTheDocument();
    });
  });

  describe("PolaroidPhoto Component", () => {
    test("renders with placeholder content", () => {
      render(<PolaroidPhoto />);

      // Check for the placeholder content
      expect(screen.getByText(/hola/i)).toBeInTheDocument();
      expect(screen.getByText(/Can you guess who this is\?/i)).toBeInTheDocument();
    });
  });
});

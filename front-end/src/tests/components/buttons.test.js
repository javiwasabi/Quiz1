import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ButtonStart, ButtonNext } from "../../components/buttons";

let allTestsPassed = true; 

describe("Buttons Test Suite", () => {
  afterAll(() => {
    if (allTestsPassed) {
      console.log("✅ All buttons have been successfully checked.");
    } else {
      console.log("❌ Some buttons failed during the tests. Check the errors.");
    }
  });

  describe("ButtonStart", () => {
    test("renders the START button with correct text and link", () => {
      try {
        render(
          <MemoryRouter>
            <ButtonStart />
          </MemoryRouter>
        );

        // Verify the button has the text START
        const buttonElement = screen.getByText(/START/i);
        expect(buttonElement).toBeInTheDocument();

        // Verify the button has the correct link
        const linkElement = screen.getByRole("link", { name: /START/i });
        expect(linkElement).toHaveAttribute("href", "/question");
      } catch (error) {
        allTestsPassed = false;
        throw error;
      }
    });
  });

  describe("ButtonNext", () => {
    test("renders the NEXT button and handles click event", () => {
      try {
        const mockOnClick = jest.fn();

        render(<ButtonNext onClick={mockOnClick} />);

        const buttonElement = screen.getByText(/NEXT/i);
        expect(buttonElement).toBeInTheDocument();


        fireEvent.click(buttonElement);


        expect(mockOnClick).toHaveBeenCalledTimes(1);
      } catch (error) {
        allTestsPassed = false;
        throw error;
      }
    });
  });
});

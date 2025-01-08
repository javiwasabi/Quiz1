# Quiz1

## Project Description

This repository contains a **Docker**-based web application designed as a quiz game. The game challenges users to identify whether a given individual is an inventor of a programming language or a serial killer. It is developed using the MERN stack and includes options for unit tests and functional tests with Selenium.

## Quiz Gameplay

1. Navigate to the main page of the application.
2. Click Start to begin the quiz.
3. Answer each question by selecting Inventor or Killer.
4. Submit your answers and view your score.
5. Try again to improve your results!

## Technologies Used

- **Frontend:** React  
- **Backend:** Node.js with Express  
- **Database:** MongoDB  
- **Containerization:** Docker & Docker Compose  
- **Testing:**  
  - Unit Testing: Jest  
  - Functional Testing: Selenium  

## Features

- Interactive quiz game: "Inventor vs. Serial Killer."  
- Persistent user data stored in MongoDB.  
- Testable architecture for both unit and functional scenarios.  
- Easy setup with Docker and Docker Compose.  

## Prerequisites

Ensure you have the following installed before starting:  

- [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/)  
- [Node.js](https://nodejs.org/) (for development purposes)  
- A modern web browser  

## Setup and Installation

1. **Clone the repository:**  
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
2. **Start the containers using Docker Compose:**  
   ```bash
   docker-compose up --build
1. **Access the application:**  
   -Frontend: http://localhost:3000
   -Backend API: http://localhost:5000
1. **Stop the containers:**  
   ```bash
   docker-compose down


## testing

1. Unit Tests
Run in back-end or front-end
   - npm run test

2. Functional Tests

Run in functional-tets/selenium

   - node user-flow.test.js
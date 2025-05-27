# LLM Interaction Project

## Description

This project demonstrates interaction with Large Language Models (LLMs) for various tasks, including performing calculations and retrieving weather information. It showcases the use of different LLMs (Ollama and Google Gemini) and how to integrate them with custom tools and APIs.

## Features

* **LLM Integration:**
    * Interacts with Ollama models (e.g., `llama3.1:7b`) for processing prompts and tool usage.
    * Interacts with Google's Generative AI (Gemini 2.0 Flash model) for weather-based advice and tool usage.
* **Tool Usage:**
    * Defines and uses tools for mathematical operations: addition, subtraction, multiplication, and division.
    * Defines and uses a tool to retrieve real-time weather information using the OpenWeatherMap API.
* **Prompt Engineering:**
    * Includes example system messages for guiding LLM behavior for weather assistance and combined calculation/weather tasks.
* **API Interaction:**
    * Fetches weather data from the OpenWeatherMap API.
* **Typescript Project:**
    * Structured as a Typescript project with defined types for data structures like weather information and function call arguments.

## Getting Started

### Prerequisites

* Node.js and npm (or yarn) installed.
* An Ollama instance running locally (default: `http://localhost:11434`) if you want to use the Ollama-based LLM.
* An API key for OpenWeatherMap.
* An API key for Google Generative AI (if using the Gemini LLM).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
    The `package.json` file lists all necessary dependencies. The `package-lock.json` ensures consistent installations.

### Configuration

1.  Create a `.env` file in the root of the project.
2.  Add your API keys to the `.env` file:
    ```env
    API_KEY=your_openweathermap_api_key
    LLM_API=your_google_generative_ai_api_key
    ```
    The `src/api.ts` and `src/LLM/geminiLLM.ts` files utilize these environment variables.

### Running the Project

The `package.json` defines a start script.
* To run the Llama (Ollama) LLM interaction script:
    ```bash
    npm start
    ```
    This will execute `ts-node src/LLM/llama.ts`.

* To run the Gemini LLM interaction script (you might need to adjust the `start` script in `package.json` or run it directly):
    ```bash
    ts-node src/LLM/geminiLLM.ts
    ```

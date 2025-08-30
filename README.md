# Finhelp Application

Finhelp is a modern, AI-powered web application designed to provide users with real-time financial insights. This application serves as a proof-of-concept for a financial intelligence tool, leveraging the power of Google's Gemini API to deliver concise, up-to-date analysis on stocks and other financial entities.

## Features

- **AI-Powered Financial Search**: Users can ask natural language questions about companies or market trends, receiving real-time data grounded in the latest public information.
- **Dynamic Model Selection**: Users can choose from various Gemini models to process their queries, allowing for comparison of outputs.
- **Dynamic & Static Content Display**: The application features a responsive interface that adapts based on user interactions, displaying relevant financial summaries and sources.

## Technical Overview

### Frontend

The application is built as a single-page application using React. Key components include:

- **Dashboard**: The main container that manages application state and orchestrates API calls.
- **SearchBar**: A controlled form component for user input and model selection.
- **SearchResults**: Displays the API response, including loading and error states.

### API Integration

Finhelp integrates with the @google/genai library to utilize the Gemini API for generating content based on user queries. The application ensures that responses are timely and relevant by grounding them in real-time search results.

## Project Structure

```
finhelp-app
├── public
│   └── index.html
├── src
│   ├── index.tsx
│   ├── main.css
│   ├── lib
│   │   └── models.js
│   └── components
│       ├── App.jsx
│       └── finhelp
│           ├── Dashboard.jsx
│           ├── Header.jsx
│           ├── SearchBar.jsx
│           ├── SearchResults.jsx
│           ├── TrendingStocks.jsx
│           ├── IndianTrendingStocks.jsx
│           └── NewsFeed.jsx
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd finhelp-app
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the application:
   ```
   npm start
   ```

## Usage

Once the application is running, you can enter a company name or stock ticker in the search bar to receive real-time financial insights. Select different models to compare outputs and explore various financial entities.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
# Steam Librarian: AI Game Recommender

An intelligent web application that bridges the gap between your massive
Steam library and your next gaming experience. By analyzing your play
history and library through the Steam API, this app utilizes Gemini 1.5
Flash to provide highly contextual, data-driven recommendations.

------------------------------------------------------------------------

## 🚀 The Core Concept

Many gamers suffer from **"choice paralysis."** This project explores
how LLMs can act as personalized curators by processing structured API
data---such as playtime, genres, and recent activity---into human-like
reasoning for why you should play a specific game in your collection
next.

------------------------------------------------------------------------

## 🛠️ Tech Stack

-   **Backend:** Node.js / Express\
-   **AI Model:** Gemini 1.5 Flash (via Google AI Studio)\
-   **External API:** Steam Web API\
-   **Database:** MongoDB (via `DB_CONNECTION_STRING`)

------------------------------------------------------------------------

## ⚙️ Setup & Installation

### 1. Prerequisites

-   Node.js installed on your machine\
-   A Steam API Key (obtainable from the Steam Community Dev Portal)\
-   A Gemini API Key (obtainable from Google AI Studio)

------------------------------------------------------------------------

### 2. Clone & Install

``` bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name/backend
npm install
```

> **Note:** If the terminal returns vulnerability warnings, run:
>
> ``` bash
> npm audit fix
> ```

------------------------------------------------------------------------

### 3. Environment Configuration

This project uses sensitive credentials that are ignored by Git for
security.

1.  Create a `.env` file in the `backend` directory\
2.  Follow the structure provided in `.env.example`:

``` env
STEAM_API_KEY=your_steam_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
DB_CONNECTION_STRING=your_mongodb_connection_uri_here
```

------------------------------------------------------------------------

### 4. Run Locally

``` bash
npm run dev
```

------------------------------------------------------------------------

## 🚧 Current "Kinks" & Roadmap

-   Improve recommendation accuracy with more user behavior signals\
-   Add frontend UI for better user interaction\
-   Implement caching to reduce API calls\
-   Enhance error handling for API failures

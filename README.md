# The Calm Content Companion Tools

A suite of tools for soulful creators, providing authentic, humanized content strategies using OpenAI.

## Features

- **Find Your Voice**: Humanize rough text drafts.
- **Bio Builder**: Create high-converting Instagram bios.
- **Find Your Hook**: Turn messy ideas into magnetic openings.
- **Content Planner**: Strategic 3-post mapping.

## Setup

1.  **Clone the repository.**
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Environment Variables**:
    - Copy `.env.example` to `.env`.
    - Add your `OPENAI_API_KEY`.
4.  **Run locally**:
    ```bash
    npm start
    ```
    The server will run on `http://localhost:10000`.

## Deployment on Render

This project is optimized for deployment on [Render.com](https://render.com).

1.  **Blueprints (Recommended)**:
    The `render.yaml` file in this repository allows for easy setup. Simply connect your GitHub repo to Render and it will auto-configure.
2.  **Manual Setup**:
    - Create a new **Web Service**.
    - **Build Command**: `npm install`
    - **Start Command**: `npm start`
    - **Environment Variables**: Add `OPENAI_API_KEY`.

## Tech Stack

- **Backend**: Node.js with Express.
- **AI**: OpenAI API (`gpt-4-turbo-preview`, `gpt-4o-mini`).
- **Frontend**: Plain HTML/CSS/JS (served from `/public`).

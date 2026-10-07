# JARVIS - Voice & AI Assistant with Real-Time Google Search Grounding

An advanced AI assistant powered by Google Gemini 2.5 Flash, equipped with live voice interaction and real-time Google Search grounding.

## Features
- **Real-Time Web Search**: Grounded with Google Search to fetch up-to-the-minute data, news, and live facts.
- **Voice-First AI**: Low-latency conversational audio streaming with responsive audio visualizer.
- **Modern Responsive UI**: Cyberpunk-inspired Jarvis dashboard with sleek animations.
- **Dual Deployment Ready**: Seamlessly runs locally via Node/Express or deployed serverless to Vercel.

## Quick Start (Local)

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Configure API Key**:
   Set `GEMINI_API_KEY` in `.env.local`:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
3. **Start Development Server**:
   ```bash
   npm run dev
   ```
4. Access JARVIS at `http://localhost:3000`.

## Deploy to Vercel

1. Import this repository into Vercel.
2. Add your environment variable:
   - `GEMINI_API_KEY`: Your Google Gemini API Key
3. Deploy! The frontend Vite bundle and serverless API functions (`/api`) are preconfigured in `vercel.json`.

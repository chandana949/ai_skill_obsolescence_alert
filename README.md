# SkillGuard

A React + Vite application that helps workers understand their automation risk and provides AI-powered career guidance.

## Features

- **Role-based skill assessment**: Select your role and skills to assess automation risk
- **AI-powered insights**: Get personalized career advice powered by Google Gemini AI
- **Skill recommendations**: Receive tailored recommendations for future-proof skills
- **Interactive AI chat**: Chat with an AI career advisor for real-time guidance

## Google AI Studio Integration

This project is integrated with **Google AI Studio** and uses the **Gemini API** for all AI-powered features.

### Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Get your Gemini API key:**
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Create a new API key

3. **Configure environment variables:**
   Create a `.env` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   VITE_GEMINI_MODEL=gemini-pro
   ```
   
   Optional:
   ```env
   VITE_USE_MOCK_AI=true  # Use mock responses for development/testing
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Google Generative AI SDK** - Gemini API integration
- **React Router** - Navigation

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## AI Features

The application uses Google Gemini API for:
- Skill analysis and automation risk assessment
- Personalized skill recommendations
- Interactive career guidance chat
- Learning path generation

If no API key is provided, the app will automatically fall back to mock responses for development and testing purposes.

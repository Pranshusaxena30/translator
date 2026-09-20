# Language Translation Tool

A full-stack language translation tool built with React + Vite on the frontend and Express on the backend.

## Features

- Enter text to translate
- Select source and target languages
- Google Cloud Translation API integration
- Swap source and target languages
- Copy translated text
- Text-to-speech
- Character counter
- Loading and error states
- API key kept safely on the server

## Project Structure

```text
language-translation-tool/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── LanguageSelect.jsx
│   │   │   ├── TranslationBox.jsx
│   │   │   └── Translator.jsx
│   │   ├── services/
│   │   │   └── translationApi.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── .env.example
│   ├── index.html
│   └── package.json
├── server/
│   ├── routes/
│   │   └── translate.js
│   ├── index.js
│   ├── .env.example
│   └── package.json
├── .gitignore
├── package.json
└── README.md
```

## Setup

### 1. Install dependencies

From the root folder:

```bash
npm run install-all
```

### 2. Configure Google Cloud Translation

Create a Google Cloud project, enable the Cloud Translation API, and create an API key.

Copy:

```text
server/.env.example
```

to:

```text
server/.env
```

Then add your key:

```env
PORT=5000
GOOGLE_TRANSLATE_API_KEY=your_google_cloud_api_key
```

### 3. Start the application

```bash
npm run dev
```

Frontend:
http://localhost:5173

Backend:
http://localhost:5000

## Important

Do not put the Google API key inside React/Vite code. The frontend calls the Express backend, and the backend calls Google Cloud Translation.

## API Endpoint

```http
POST /api/translate
Content-Type: application/json
```

Example:

```json
{
  "text": "Hello, how are you?",
  "source": "en",
  "target": "hi"
}
```
"# -translator" 

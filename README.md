# 🎯 Emoji Finder API

An API that helps you find a relevant emoji based on a sentence, in any language.

Powered by **GROQ** using the **LLaMA 3.1 8B Instant** model.

## 🚀 Demo

👉 [Demo Site](https://emojiefinder.vercel.app)

## ✨ Features

- Emoji generation from multilingual text.
- Secure authentication via API key.
- Simple web interface to quickly test the API.

## 🛠️ Installation

1. **Clone the repository:**

   ```bash
   git clone <repo-url>
   cd emojie-api
   cp env.example .env
   # Edit the environment variables in the .env file
   npm install
   npm run dev
   ```

## 📦 Usage

### 1. From the web interface

Access the interface at [http://localhost:3000](http://localhost:3000) to easily test the API.

### 2. From an API request

Make an HTTP POST call:

```bash
 curl -X POST "http://localhost:3000/api/emoji" \
  -H "Content-Type: application/json" \
  -H "X-API-KEY: YOUR_SECRET_API_KEY" \
  -d '{"text": "Your text" }'
```

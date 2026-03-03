<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy

This is a Vite + React portfolio with a serverless API at `api/chat.ts`.

## Local development

Prerequisites: Node.js 18+.

1. Install dependencies:
   `npm install`
2. Create `.env.local` from `.env.example` and set at least one key:
   `OPENAI_API_KEY` (recommended) or `HUGGINGFACE_API_KEY`
3. Run full-stack locally (frontend + `/api/chat`):
   `npm run dev:vercel`

Notes:
- `npm run dev` runs only Vite frontend, so `/api/chat` will not exist there.
- The API route supports OpenAI first, and Hugging Face via OpenAI-compatible router fallback.

## Deploy on Vercel

1. Push this repo to GitHub.
2. Import into Vercel.
3. Build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Add environment variables in Vercel project settings:
   - `OPENAI_API_KEY` (recommended)
   - Optional: `OPENAI_MODEL` (default `gpt-4o-mini`)
   - Optional fallback: `HUGGINGFACE_API_KEY`, `HUGGINGFACE_MODEL`
5. Deploy.

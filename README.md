# Portland Realtor Dashboard

AI-powered Portland real estate market dashboard using FRED API + Redfin data.

## What It Does
Pulls live and historical Portland real estate metrics (median price, days on market, inventory, mortgage rates) and surfaces one actionable AI insight per session.

## Stack
- Frontend: React + TypeScript + Vite + Tailwind + Recharts
- Backend: Python + FastAPI
- AI: Claude API (direct, no framework)
- Data: FRED API + Redfin CSV downloads

## Run Locally
```bash
# Backend
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # fill in ANTHROPIC_API_KEY and FRED_API_KEY
uvicorn main:app --reload

# Frontend
cd frontend
npm install && npm run dev
```

## Build Plan
See `../docs/portland-realtor-demo-plan.docx`

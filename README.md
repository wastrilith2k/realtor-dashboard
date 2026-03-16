# Portland Realtor Dashboard

Real estate market dashboard for the Portland-Vancouver-Hillsboro metro area. Pulls live economic data from the FRED API and generates AI-powered market insights via OpenRouter.

## Architecture

```
React (Vite + Tailwind + Recharts)
        |
        v
FastAPI backend
   /api/market          --> FRED API (housing series, fetched concurrently)
   /api/insight/stream  --> OpenRouter (streamed text, typewriter UI)
        |
        v
AWS Lambda + API Gateway (via SAM + Mangum)
```

**Frontend:** React 19, TypeScript, Tailwind CSS, Recharts for charts. Vercel AI SDK for streaming.

**Backend:** FastAPI on Python 3.12. Runs locally with Uvicorn, deployed to Lambda via Mangum adapter.

**Data:** FRED series for Portland metro -- active listings, median price, days on market, building permits, price reductions, mortgage rates.

**AI:** OpenRouter (Gemini 2.5 Flash) streams market insights from the raw data. Frontend parses series tags and renders insight cards in real-time.

## Run locally

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env        # add your API keys
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Environment variables

| Variable | Source | Description |
|---|---|---|
| `FRED_API_KEY` | [fred.stlouisfed.org/docs/api](https://fred.stlouisfed.org/docs/api/) | Access to FRED economic data |
| `OPEN_ROUTER_API_KEY` | [openrouter.ai](https://openrouter.ai/) | OpenRouter for AI insights |

Copy `backend/.env.example` to `backend/.env` and fill in your keys.

## Deploy

Uses AWS SAM. First deploy is interactive:

```bash
cd backend
sam build
sam deploy --guided
```

Subsequent deploys:

```bash
sam build && sam deploy
```

API keys are passed as CloudFormation parameters (stored in `samconfig.toml` after first deploy).

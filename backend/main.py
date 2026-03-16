import os
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from tools.fred_client import market as fetch_market_data
from tools.gemini_client import generate_insight, generate_insight_stream

# load_dotenv reads your .env file locally. On Lambda, env vars come from
# the SAM template instead — os.environ works either way.
load_dotenv()

app = FastAPI(title="Portland Realtor Dashboard API")

# CORS — lets your React frontend (different port/domain) call this API.
# In production, tighten origins to your actual domain.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# Pydantic model for the insight request body.
# This is how FastAPI knows to parse the POST JSON body.
# The frontend sends: { "market_data": { "MEDLISPRI38900": [...], ... }, "series_names": {"MEDLISPRI38900": "Median Listing Price", ...}, "date_range": { "from": "2023-01", "to": "2026-03" } }
# FastAPI validates the shape automatically — if it doesn't match, the client gets a 422 error.
class DateRange(BaseModel):
    from_date: str
    to_date: str

class InsightRequest(BaseModel):
    market_data: dict
    series_names: dict[str, str]
    date_range: DateRange


# Load the prompt template once at startup, not on every request
PROMPT_PATH = Path(__file__).parent / "agents" / "prompts" / "insight.md"


@app.get("/api/health")
def health():
    """Smoke test — proves the Lambda is running and can respond."""
    return {"data": {"status": "ok"}, "error": None}


@app.get("/api/market")
async def market():
    data = await fetch_market_data()
    return {"data": data, "error": None}


@app.post("/api/insight")
def insight(body: InsightRequest):
    try:
        prompt_template = PROMPT_PATH.read_text()
    except FileNotFoundError:
        return {"data": None, "error": "Prompt template not found"}

    result = generate_insight(
        market_data=body.market_data,
        series_names=body.series_names,
        prompt_template=prompt_template,
    )
    return {"data": {"insights": result, "date_range": body.date_range}, "error": None}


@app.post("/api/insight/stream")
def insight_stream(body: InsightRequest):
    try:
        prompt_template = PROMPT_PATH.read_text()
    except FileNotFoundError:
        return {"data": None, "error": "Prompt template not found"}

    result = generate_insight_stream(
        market_data=body.market_data,
        series_names=body.series_names,
        prompt_template=prompt_template,
    )
    return StreamingResponse(result, media_type="text/plain")

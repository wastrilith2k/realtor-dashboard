import os
from collections.abc import Generator
from datetime import date

from google import genai
from google.genai import types
from pydantic import BaseModel


# Structured output schema — Gemini is forced to return this exact shape.
# This is like defining a TypeScript interface for the API response,
# except Gemini uses it to constrain its own output.
class Insight(BaseModel):
  insight: str
  series_ids: list[str]
  dates: list[str]

class InsightResponse(BaseModel):
  insights: list[Insight]

def format_series_names(series_names: dict[str, str]) -> str:
  """Formats the series_names dict into a string for the prompt."""
  return "\n".join(f"- {series_id}: {name}" for series_id, name in series_names.items())


def generate_insight(market_data: dict, series_names: dict[str, str], prompt_template: str) -> list[dict]:
  """Send market data + prompt to Gemini, return structured insights."""
  client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])

  # Inject today's date into the prompt template
  prompt = prompt_template.replace("{current_date}", date.today().isoformat())

  full_prompt = f"{prompt}\n\n## Market Data\n{market_data}\n\n## Series Names\n{format_series_names(series_names)}"

  response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=full_prompt,
    config=types.GenerateContentConfig(
      # These two lines force Gemini to return valid JSON matching our schema.
      # Without this, you'd be parsing free text and hoping for the best.
      response_mime_type="application/json",
      response_schema=InsightResponse,
    ),
  )

  # response.text is now guaranteed to be valid JSON matching InsightResponse
  parsed = InsightResponse.model_validate_json(response.text)
  return [insight.model_dump() for insight in parsed.insights]


def generate_insight_stream(market_data: dict, series_names: dict[str, str], prompt_template: str) -> Generator[str, None, None]:
  """Send market data + prompt to Gemini, return Generator of text chunks as insights stream in."""
  client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])

  # Inject today's date into the prompt template
  prompt = prompt_template.replace("{current_date}", date.today().isoformat()).replace("{series_names}", format_series_names(series_names))

  full_prompt = f"{prompt}\n\n## Market Data\n{market_data}"

  stream = client.models.generate_content_stream(
    model="gemini-2.5-flash",
    contents=full_prompt,
  )

  for chunk in stream:
    yield chunk.text

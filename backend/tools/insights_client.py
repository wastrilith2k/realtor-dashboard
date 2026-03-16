import os
from collections.abc import Generator
from datetime import date

from openai import OpenAI
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

model = "google/gemini-2.5-flash"

def format_series_names(series_names: dict[str, str]) -> str:
  """Formats the series_names dict into a string for the prompt."""
  return "\n".join(f"- {series_id}: {name}" for series_id, name in series_names.items())


def generate_insight(market_data: dict, series_names: dict[str, str], prompt_template: str) -> list[dict]:
  """Send market data + prompt to OpenRouter, return structured insights."""
  client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.environ["OPEN_ROUTER_API_KEY"],
  )

  # Inject today's date into the prompt template
  prompt = prompt_template.replace("{current_date}", date.today().isoformat())

  full_prompt = f"{prompt}\n\n## Market Data\n{market_data}\n\n## Series Names\n{format_series_names(series_names)}"

  response = client.chat.completions.create(
      model=model,
      messages=[
          {"role": "system", "content": full_prompt},
          {"role": "user", "content": f"## Market Data\n{market_data}"},
      ],
  )

  # response.text is now guaranteed to be valid JSON matching InsightResponse
  parsed = InsightResponse.model_validate_json(response.choices[0].message.content or "")
  return [insight.model_dump() for insight in parsed.insights]


def generate_insight_stream(market_data: dict, series_names: dict[str, str], prompt_template: str) -> Generator[str, None, None]:
  """Send market data + prompt to OpenRouter, return Generator of text chunks as insights stream in."""
  client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.environ["OPEN_ROUTER_API_KEY"],
  )

  # Inject today's date into the prompt template
  prompt = prompt_template.replace("{current_date}", date.today().isoformat()).replace("{series_names}", format_series_names(series_names))

  full_prompt = f"{prompt}\n\n## Market Data\n{market_data}"

  stream = client.chat.completions.create(
      model=model,
      messages=[
          {"role": "system", "content": full_prompt},
          {"role": "user", "content": f"## Market Data\n{market_data}"},
      ],
      stream=True,
  )

  for chunk in stream:
      text = chunk.choices[0].delta.content
      if text:
          yield text

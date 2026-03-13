import httpx
import asyncio
import os

# Housing Inventory: Active Listing Count in Portland-Vancouver-Hillsboro, OR-WA (CBSA)	ACTLISCOU38900
# New Private Housing Structures Authorized by Building Permits for Portland-Vancouver-Hillsboro, OR-WA (MSA)	PORT941BPPRIVSA
# All-Transactions House Price Index for Portland-Vancouver-Hillsboro, OR-WA (MSA)	ATNHPIUS38900Q
# Housing Inventory: Median Listing Price in Portland-Vancouver-Hillsboro, OR-WA (CBSA)	MEDLISPRI38900
# Housing Inventory: Active Listing Count Month-Over-Month in Portland-Vancouver-Hillsboro, OR-WA (CBSA)	ACTLISCOUMM38900
# Regional Price Parities: Services: Housing for Portland-Vancouver-Hillsboro, OR-WA (MSA)	RPPSERVERENT38900
# Housing Inventory: Price Increased Count Month-Over-Month in Portland-Vancouver-Hillsboro, OR-WA (CBSA)	PRIINCCOUMM38900
# Housing Inventory: Price Reduced Count in Portland-Vancouver-Hillsboro, OR-WA (CBSA)	PRIREDCOU38900
# Housing Inventory: Median Days on Market in Portland-Vancouver-Hillsboro, OR-WA (CBSA)	MEDDAYONMAR38900

series_id_list = [
  "ACTLISCOU38900",
  "PORT941BPPRIVSA",
  "ATNHPIUS38900Q",
  "MEDLISPRI38900",
  "ACTLISCOUMM38900",
  "RPPSERVERENT38900",
  "PRIINCCOUMM38900",
  "PRIREDCOU38900",
  "MEDDAYONMAR38900",
  "MORTGAGE30US"
]


async def fetch_series(client: httpx.AsyncClient, series_id: str):
  params={
    "series_id": series_id,
    "api_key": os.environ["FRED_API_KEY"],
    "file_type": "json",
  }

  response = await client.get(
    "https://api.stlouisfed.org/fred/series/observations",
    params=params,
  )

  if (response.status_code != 200):
    return [] # fail gracefully.
  data = response.json()

  return [
    {"date":obs["date"], "value": float(obs["value"])}
    for obs in data["observations"]
    if obs["value"] != "."
  ]


async def market():
  async with httpx.AsyncClient() as client:
    results = await asyncio.gather(
      *[fetch_series(client, series_id) for series_id in series_id_list]
    )

  return dict(zip(series_id_list, results))
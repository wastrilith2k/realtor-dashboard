# Lambda entry point
#
# This is the ONLY file Lambda cares about. When a request hits API Gateway,
# Lambda calls handler(event, context) where:
#   - event: dict with HTTP method, path, headers, body, query params
#   - context: Lambda metadata (request ID, time remaining, etc.)
#
# Mangum translates that event dict into a fake HTTP request,
# passes it to FastAPI, gets the response, and translates it back
# into the dict format Lambda expects ({ statusCode, headers, body }).
#
# You never touch this file — all your logic goes in main.py and tools/.

from mangum import Mangum
from main import app

handler = Mangum(app, lifespan="off")

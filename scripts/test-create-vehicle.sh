#!/usr/bin/env bash
set -e

URL="http://localhost:3000/vehicles"
DATA='{"make":"Mazda","model":"3","year":2019}'

echo "Posting to $URL"

# POST and capture status
RESP=$(curl -s -w "\nHTTP_STATUS:%{http_code}\n" -X POST "$URL" -H "Content-Type: application/json" -d "$DATA")

# If jq exists, pretty-print JSON part; otherwise print raw response
if command -v jq >/dev/null 2>&1; then
  # split body and status
  BODY=$(echo "$RESP" | sed '$d')
  STATUS=$(echo "$RESP" | tail -n1)
  echo "$STATUS"
  echo "$BODY" | jq .
else
  echo "$RESP"
fi

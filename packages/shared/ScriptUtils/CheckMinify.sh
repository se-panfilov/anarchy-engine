#!/bin/bash

JS_FILE="$1"
MAP_FILE="$2"
GZ_FILE="${JS_FILE}.gz"
BR_FILE="${JS_FILE}.br"

if [[ -z "$JS_FILE" || -z "$MAP_FILE" ]]; then
  echo "❌ Usage: ./check-minify.sh path/to/file.js path/to/file.js.map"
  exit 1
fi

if [[ ! -f "$JS_FILE" ]]; then
  echo "❌ JS file not found: $JS_FILE"
  exit 1
fi

if [[ ! -f "$MAP_FILE" ]]; then
  echo "❌ Map file not found: $MAP_FILE"
  exit 1
fi

LINES=$(wc -l < "$JS_FILE")
if [[ "$LINES" -gt 50 ]]; then
  echo "❌ Too many lines in JS file ($LINES). Probably not minified."
  exit 1
else
  echo "✅ JS file appears minified ($LINES lines)"
fi

if [[ -f "$GZ_FILE" ]]; then
  gunzip -c "$GZ_FILE" | cmp -s - "$JS_FILE"
  if [[ $? -ne 0 ]]; then
    echo "❌ Gzip file doesn't match JS file"
    exit 1
  else
    echo "✅ Gzip file matches"
  fi
else
  echo "⚠️ Gzip file not found: $GZ_FILE"
fi

if [[ -f "$BR_FILE" ]]; then
  brotli -d -c "$BR_FILE" | cmp -s - "$JS_FILE"
  if [[ $? -ne 0 ]]; then
    echo "❌ Brotli file doesn't match JS file"
    exit 1
  else
    echo "✅ Brotli file matches"
  fi
else
  echo "⚠️ Brotli file not found: $BR_FILE"
fi

npx --yes source-map-explorer "$JS_FILE" "$MAP_FILE" --only-mapped > /dev/null 2>&1
if [[ $? -ne 0 ]]; then
  echo "❌ Source map doesn't match JS file"
  exit 1
else
  echo "✅ Source map is valid"
fi

echo "🎉 All checks passed"

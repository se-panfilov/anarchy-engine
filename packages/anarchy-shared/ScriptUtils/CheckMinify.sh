#!/bin/bash

JS_FILE="$1"
MAP_FILE="$2"
GZ_FILE="${JS_FILE}.gz"
BR_FILE="${JS_FILE}.br"

if [[ -z "$JS_FILE" || -z "$MAP_FILE" ]]; then
  echo "❌ Usage: ./CheckMinify.sh path/to/file.js path/to/file.js.map"
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

#LINES=$(wc -l < "$JS_FILE")
#if [[ "$LINES" -gt 50 ]]; then
#  echo "❌ Too many lines in JS file ($LINES). Probably not minified."
#  exit 1
#else
#  echo "✅ JS file appears minified ($LINES lines)"
#fi

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

echo "🔍 Checking sourcemap integrity..."

TMP_JSON=$(mktemp -t sourcemapXXXXXX.json)

SOURCEMAP_ERR=$(npx --yes source-map-explorer "$JS_FILE" "$MAP_FILE" --json "$TMP_JSON" 2>&1)
echo "📄 Sourcemap analysis written to: $TMP_JSON"

if [[ $? -eq 0 && -s "$TMP_JSON" ]]; then
  echo "✅ Sourcemap check passed: $JS_FILE"
  rm "$TMP_JSON"
else
  echo "❌ Failed to analyze sourcemap: $JS_FILE"
  echo "🧾 stderr:"
  echo "$SOURCEMAP_ERR"
  [[ -f "$TMP_JSON" ]] && cat "$TMP_JSON"
rm -f "$TMP_JSON"
  exit 1
fi

echo "🎉 All checks passed"

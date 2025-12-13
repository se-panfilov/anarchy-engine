#!/bin/bash

#Requires: npm install source-map-explorer

set -e

JS_FILE="dist/anarchy-engine.es.js"
MAP_FILE="dist/anarchy-engine.es.js.map"
GZ_FILE="${JS_FILE}.gz"
BR_FILE="${JS_FILE}.br"
TEMP_DIR="dist/__check_temp"
mkdir -p "$TEMP_DIR"

function fail {
  echo "❌ $1"
  rm -rf "$TEMP_DIR"
  exit 1
}

function ok {
  echo "✅ $1"
}

# 1. Check JS file is minified (one line, no comments)
LINES=$(wc -l < "$JS_FILE")
if [ "$LINES" -gt 10 ]; then
  fail "JS file has too many lines, looks unminified"
else
  ok "JS file appears minified"
fi

# 2. Check gzip and brotli decompress back to JS file
gunzip -c "$GZ_FILE" > "$TEMP_DIR/unzipped.js" || fail "Failed to decompress gzip"
cmp --silent "$JS_FILE" "$TEMP_DIR/unzipped.js" || fail "gzip output does not match JS"

ok "Gzip file matches JS"

brotli -d "$BR_FILE" -o "$TEMP_DIR/unbrotli.js" || fail "Failed to decompress brotli"
cmp --silent "$JS_FILE" "$TEMP_DIR/unbrotli.js" || fail "brotli output does not match JS"

ok "Brotli file matches JS"

# 3. Check source map is valid
npx --yes source-map-explorer "$JS_FILE" "$MAP_FILE" > "$TEMP_DIR/map-check.txt" 2>&1 || fail "Source map is invalid or mismatched"

ok "Source map appears valid"

rm -rf "$TEMP_DIR"
echo "🎉 All checks passed"

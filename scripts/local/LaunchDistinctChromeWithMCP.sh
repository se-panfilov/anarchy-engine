#mac
open -na "Google Chrome" --args --user-data-dir="$HOME/.chrome-devtools-mcp" --remote-debugging-port=9222 --no-first-run --no-default-browser-check

#win
#"%ProgramFiles%\Google\Chrome\Application\chrome.exe" ^
 #  --user-data-dir="%LOCALAPPDATA%\ChromeMCP" ^
 #  --remote-debugging-port=9222 ^
 #  --no-first-run --no-default-browser-check

#linux
#google-chrome \
#  --user-data-dir="$HOME/.chrome-devtools-mcp" \
#  --remote-debugging-port=9222 \
#  --no-first-run --no-default-browser-check

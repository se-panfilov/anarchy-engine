import { DefaultBannedInJsonKeys, JsonSpecialCharactersAscii, JsonSpecialCharactersUnicode } from '@Anarchy/Shared/Constants';

const { TAB, DEL, LF, CR, MAX_CONTROL } = JsonSpecialCharactersAscii;
const { BOM, QUOTE, LINE_SEPARATOR, PARAGRAPH_SEPARATOR, BACKSLASH } = JsonSpecialCharactersUnicode;

export function validateJson<T = unknown>(raw: string, dangerousKeys: ReadonlyArray<string> = DefaultBannedInJsonKeys, options: Readonly<{ maxBytes?: number; maxDepth?: number }> = {}): T {
  if (typeof raw !== 'string' || raw.length === 0) throw new Error('Invalid input: JSON must be a non-empty string');

  const maxBytes: number = options.maxBytes ?? 5 * 1024 * 1024;
  const maxDepth: number = options.maxDepth ?? 200;

  const byteSize: number = Buffer.byteLength(raw, 'utf8');
  if (byteSize > maxBytes) {
    throw new Error(`JSON too large: ${byteSize} bytes (limit ${maxBytes})`);
  }

  scanText(raw);

  let parsedData: unknown;
  try {
    parsedData = JSON.parse(raw);
  } catch (error) {
    throw new Error(`JSON parse failed: ${(error as Error).message}`);
  }

  assertTree(parsedData, maxDepth, dangerousKeys);
  return parsedData as T;
}

function getContext(text: string, index: number, radius: number = 24): string {
  const start: number = Math.max(0, index - radius);
  const end: number = Math.min(text.length, index + radius);
  const char: string = text[index] ?? '';

  return text.slice(start, index) + '⟦' + char + '⟧' + text.slice(index + 1, end);
}

function isAllowedControlCharacter(charCode: number): boolean {
  return charCode === TAB || charCode === LF || charCode === CR;
}

function isControlCharacter(charCode: number): boolean {
  return charCode <= MAX_CONTROL || charCode === DEL;
}

function validateCharacterOutsideString(charCode: number, index: number, text: string): void {
  // Check for invalid control characters outside strings
  if (isControlCharacter(charCode) && !isAllowedControlCharacter(charCode)) {
    const hexCode: string = charCode.toString(16).padStart(4, '0').toUpperCase();
    throw new Error(`Invalid control outside string at index ${index} (U+${hexCode}).\n${getContext(text, index)}`);
  }

  // Check for line/paragraph separators outside strings (JS embedding hazard)
  if (charCode === LINE_SEPARATOR || charCode === PARAGRAPH_SEPARATOR) {
    const hexCode: string = charCode.toString(16).toUpperCase();
    throw new Error(`Disallowed U+${hexCode} outside string at index ${index}.\n${getContext(text, index)}`);
  }
}

function validateCharacterInsideString(charCode: number, index: number, text: string): void {
  if (isControlCharacter(charCode)) {
    const hexCode: string = charCode.toString(16).padStart(4, '0').toUpperCase();
    throw new Error(`Unescaped control in string at index ${index} (U+${hexCode}).\n` + `Controls must be escaped as \\n, \\t, \\r or \\u00XX.\n${getContext(text, index)}`);
  }
}

// Scan raw JSON text for basic textual hazards.
// - BOM at start is not allowed.
// - Unescaped ASCII controls (0x00..0x1F, 0x7F) inside strings are forbidden.
// - Outside strings only TAB(0x09), LF(0x0A), CR(0x0D) are allowed among ASCII controls.
// - U+2028/U+2029 outside strings are disallowed (JS embedding hazard).
function scanText(raw: string): void {
  // Check for BOM at start
  if (raw.charCodeAt(0) === BOM) {
    throw new Error(`Invalid JSON text: BOM U+FEFF at start.\n${getContext(raw, 0)}`);
  }

  let inString: boolean = false;
  let isEscaped: boolean = false;

  Array.from(raw).forEach((_char: string, index: number): void => {
    const charCode: number = raw.charCodeAt(index);

    if (!inString) {
      validateCharacterOutsideString(charCode, index, raw);

      if (charCode === QUOTE) {
        inString = true;
        isEscaped = false;
      }
      return;
    }

    // Inside a string
    if (isEscaped) {
      isEscaped = false;
      return;
    }

    if (charCode === BACKSLASH) {
      isEscaped = true;
      return;
    }

    if (charCode === QUOTE) {
      inString = false;
      return;
    }

    validateCharacterInsideString(charCode, index, raw);
  });
}

function assertTree(value: unknown, maxDepth: number, dangerousKeys: ReadonlyArray<string>, path: string = '', depth: number = 0): void {
  if (depth > maxDepth) {
    const location: string = path || '<root>';
    throw new Error(`Max depth exceeded at ${location} (> ${maxDepth})`);
  }

  if (value === null || typeof value !== 'object') {
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index: number): void => {
      const itemPath: string = `${path}[${index}]`;
      assertTree(item, maxDepth, dangerousKeys, itemPath, depth + 1);
    });
    return;
  }

  const obj = value as Record<string, unknown>;
  Object.keys(obj).forEach((key: string): void => {
    if (dangerousKeys.includes(key)) {
      const keyPath: string = path ? `${path}.${key}` : key;
      throw new Error(`Dangerous key "${key}" at ${keyPath}`);
    }

    const keyPath = path ? `${path}.${key}` : key;
    assertTree(obj[key], maxDepth, dangerousKeys, keyPath, depth + 1);
  });
}

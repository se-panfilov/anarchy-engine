import { DefaultBannedInJsonKeys, JsonSpecialCharactersAscii, JsonSpecialCharactersUnicode } from '@Anarchy/Shared/Constants';

const { TAB, DEL, LF, CR, MAX_CONTROL } = JsonSpecialCharactersAscii;
const { BOM, QUOTE, LINE_SEPARATOR, PARAGRAPH_SEPARATOR, BACKSLASH } = JsonSpecialCharactersUnicode;

export function validateJson<T = unknown>(json: string, dangerousKeys: ReadonlyArray<string> = DefaultBannedInJsonKeys, options: Readonly<{ maxBytes?: number; maxDepth?: number }> = {}): T {
  if (typeof json !== 'string' || json.length === 0) throw new Error('[JSON] Invalid input: JSON must be a non-empty string');

  const maxBytes: number = options.maxBytes ?? 5 * 1024 * 1024;
  const maxDepth: number = options.maxDepth ?? 200;

  const byteSize: number = Buffer.byteLength(json, 'utf8');
  if (byteSize > maxBytes) throw new Error(`[JSON] The size is too large: ${byteSize} bytes (limit ${maxBytes})`);

  scanText(json);

  let parsedData: unknown;
  try {
    parsedData = JSON.parse(json);
  } catch (error) {
    throw new Error(`[JSON] Parse failed: ${(error as Error).message}`);
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
    throw new Error(`[JSON] Invalid control outside string at index ${index} (U+${hexCode}).\n${getContext(text, index)}`);
  }

  // Check for line/paragraph separators outside strings (JS embedding hazard)
  if (charCode === LINE_SEPARATOR || charCode === PARAGRAPH_SEPARATOR) {
    const hexCode: string = charCode.toString(16).toUpperCase();
    throw new Error(`[JSON] Disallowed U+${hexCode} outside string at index ${index}.\n${getContext(text, index)}`);
  }
}

function validateCharacterInsideString(charCode: number, index: number, text: string): void {
  if (isControlCharacter(charCode)) {
    const hexCode: string = charCode.toString(16).padStart(4, '0').toUpperCase();
    throw new Error(`[JSON] Unescaped control in string at index ${index} (U+${hexCode}).\n` + `Controls must be escaped as \\n, \\t, \\r or \\u00XX.\n${getContext(text, index)}`);
  }
}

function scanText(raw: string): void {
  if (raw.charCodeAt(0) === BOM) throw new Error(`[JSON] Invalid JSON text: BOM U+FEFF at start.\n${getContext(raw, 0)}`);
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
    throw new Error(`[JSON] Max depth exceeded at ${location} (> ${maxDepth})`);
  }

  if (value === null || typeof value !== 'object') return;

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
      throw new Error(`[JSON] Dangerous key "${key}" at ${keyPath}`);
    }

    const keyPath = path ? `${path}.${key}` : key;
    assertTree(obj[key], maxDepth, dangerousKeys, keyPath, depth + 1);
  });
}

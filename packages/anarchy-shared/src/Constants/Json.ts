export const DefaultBannedInJsonKeys: ReadonlyArray<string> = [
  //Ban these case for sure
  '__proto__',
  'prototype',
  'constructor',

  //A bit of extra caution
  '__defineGetter__',
  '__defineSetter__',
  '__lookupGetter__',
  '__lookupSetter__',
  'valueOf',
  'toString',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable'
];

export enum JsonSpecialCharactersAscii {
  TAB = 0x09,
  LF = 0x0a,
  CR = 0x0d,
  MAX_CONTROL = 0x1f,
  DEL = 0x7f
}

export enum JsonSpecialCharactersUnicode {
  BOM = 0xfeff,
  QUOTE = 0x22,
  BACKSLASH = 0x5c,
  LINE_SEPARATOR = 0x2028,
  PARAGRAPH_SEPARATOR = 0x2029
}

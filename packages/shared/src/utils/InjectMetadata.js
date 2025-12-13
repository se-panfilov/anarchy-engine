import { Buffer } from 'buffer';
import fs from 'fs';
import path from 'path';
import encode from 'png-chunks-encode';
import extract from 'png-chunks-extract';

//THis script meant to be used for testing of cleaning metadata

const inputPath = path.resolve(process.cwd(), './test.png');
const outputPath = path.resolve(process.cwd(), './test.png');

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createTextChunk(keyword, text) {
  // eslint-disable-next-line spellcheck/spell-checker
  const keywordBuffer = Buffer.from(keyword, 'latin1');
  const nullByte = Buffer.from([0x00]);
  // eslint-disable-next-line spellcheck/spell-checker
  const textBuffer = Buffer.from(text, 'latin1');
  const data = Buffer.concat([keywordBuffer, nullByte, textBuffer]);
  return {
    name: 'tEXt',
    data
  };
}

const pngBuffer = fs.readFileSync(inputPath);

const chunks = extract(pngBuffer);

const myTextChunk = createTextChunk('Author', 'Someone (to remove)');

chunks.splice(1, 0, myTextChunk);

const newBuffer = Buffer.from(encode(chunks));
fs.writeFileSync(outputPath, newBuffer);

console.log('✅ PNG with metadata saved to with-meta.png');

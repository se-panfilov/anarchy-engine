import fs from 'fs';
import path from 'path';
import extract from 'png-chunks-extract';
import encode from 'png-chunks-encode';
import { Buffer } from 'buffer';

//THis script meant to be used for testing of cleaning metadata

const inputPath = path.resolve(process.cwd(), './test.png');
const outputPath = path.resolve(process.cwd(), './test.png');

export function createTextChunk(keyword, text) {
  const keywordBuf = Buffer.from(keyword, 'latin1');
  const nullByte = Buffer.from([0x00]);
  const textBuf = Buffer.from(text, 'latin1');
  const data = Buffer.concat([keywordBuf, nullByte, textBuf]);
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

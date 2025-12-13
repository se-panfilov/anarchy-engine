import bodyParser from 'body-parser';
import cors from 'cors';
import type { Express } from 'express';
import express from 'express';
import fs from 'fs';
import type http from 'http';
import path from 'path';

const app: Express = express();
export const PORT = 3001;

// Directories for JSON and image files
// const jsonDir: string = path.join(process.cwd(), 'json');
const imageDir: string = path.join(process.cwd(), 'screenshots');

// fs.mkdirSync(jsonDir, { recursive: true });
fs.mkdirSync(imageDir, { recursive: true });

// Parsing JSON and base64 payload
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// app.post('/save-json', (req, res) => {
//   const { name, data } = req.body;
//   if (!name || !data) return res.status(400).send('Missing name or data');
//
//   fs.writeFileSync(path.join(jsonDir, name), JSON.stringify(data, null, 2));
//   res.send({ success: true });
// });

// app.get('/load-json/:name', (req, res) => {
//   const filename = path.join(jsonDir, req.params.name);
//   if (!fs.existsSync(filename)) return res.status(404).send('File not found');
//
//   const data = fs.readFileSync(filename, 'utf8');
//   res.json(JSON.parse(data));
// });

// app.get('/list-json', (req, res): void => {
//   const files = fs.readdirSync(jsonDir);
//   res.json(files);
// });

// Save the new screenshot of the "space"
app.post('/screenshot/:spaceName', (req, res) => {
  const { name, base64 } = req.body;
  const { spaceName } = req.params;

  if (!name || !base64) return res.status(400).send(`[Test server] Missing name or base64`);

  const base64Data = base64.replace(/^data:image\/png;base64,/, '');
  fs.writeFileSync(path.join(`${imageDir}/${spaceName}`, name + '_new'), base64Data, 'base64');

  res.send({ success: true });
});

// Get the original screenshot of the "spaceName"
app.get('/screenshot/original/:spaceName', (req, res) => {
  const result: ReadonlyArray<string> | undefined = getImage(req.params.spaceName, false);
  if (!result) return res.status(404).send(`File with name "${req.params.spaceName}" not found`);
  res.json(result);
});

// Get the new screenshot of the "spaceName"
app.get('/screenshot/new/:spaceName', (req, res) => {
  const result: ReadonlyArray<string> | undefined = getImage(req.params.spaceName, true);
  if (!result) return res.status(404).send(`File with name "${req.params.spaceName}_new" not found`);
  res.json(result);
});

function getImage(spaceName: string, isNew: boolean): ReadonlyArray<string> | undefined {
  const filename: string = path.join(imageDir, spaceName + (isNew ? '_new' : ''));
  if (!fs.existsSync(filename)) return undefined;

  const files: ReadonlyArray<string> = fs.readdirSync(filename);
  return files.map((file: string): string => {
    const filePath: string = path.join(filename, file);
    const base64: string = fs.readFileSync(filePath, 'base64');
    return `data:image/png;base64,${base64}`;
  });
}

let server: http.Server | undefined;

export function startServer(): Promise<http.Server | undefined> {
  return new Promise((resolve): void => {
    server = app.listen(PORT, (): void => {
      console.log(`🏴‍☠️Server running on http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

export function stopServer(): Promise<void> {
  return new Promise((resolve, reject): void => {
    if (!server) return resolve();
    server.close((err: Error | undefined): void => {
      if (err) return reject(err);
      console.log('Server stopped');
      resolve();
    });
  });
}

startServer();

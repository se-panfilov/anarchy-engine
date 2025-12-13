import bodyParser from 'body-parser';
import cors from 'cors';
import type { Application, Express } from 'express';
import express from 'express';
import fs from 'fs';
import type http from 'http';
import path from 'path';

const app: Express = express();
export const PORT = 3001;

// Directories for JSON and image files
const jsonDir: string = path.join(__dirname, 'json');
const imageDir: string = path.join(__dirname, 'screenshots');

fs.mkdirSync(jsonDir, { recursive: true });
fs.mkdirSync(imageDir, { recursive: true });

// Parsing JSON and base64 payload
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.post('/save-json', (req, res) => {
  const { name, data } = req.body;
  if (!name || !data) return res.status(400).send('Missing name or data');

  fs.writeFileSync(path.join(jsonDir, name), JSON.stringify(data, null, 2));
  res.send({ success: true });
});

app.get('/load-json/:name', (req, res) => {
  const filename = path.join(jsonDir, req.params.name);
  if (!fs.existsSync(filename)) return res.status(404).send('File not found');

  const data = fs.readFileSync(filename, 'utf8');
  res.json(JSON.parse(data));
});

app.post('/save-image', (req, res) => {
  const { name, base64 } = req.body;
  if (!name || !base64) return res.status(400).send('Missing name or base64');

  const base64Data = base64.replace(/^data:image\/png;base64,/, '');
  fs.writeFileSync(path.join(imageDir, name), base64Data, 'base64');
  res.send({ success: true });
});

app.get('/list-json', (req, res): void => {
  const files = fs.readdirSync(jsonDir);
  res.json(files);
});

app.listen(PORT, () => {
  console.log(`Test server running at http://localhost:${PORT}`);
});

let server: http.Server | undefined;

export function startServer(): Promise<http.Server | undefined> {
  return new Promise((resolve): void => {
    server = app.listen(PORT, (): void => {
      console.log(`Server running on http://localhost:${PORT}`);
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

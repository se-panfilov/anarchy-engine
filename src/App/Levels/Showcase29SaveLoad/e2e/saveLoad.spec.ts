import { PORT, startServer, stopServer } from './testServer';

beforeAll(async () => {
  await startServer();
});

afterAll(async () => {
  await stopServer();
});

it('my test', async () => {
  const res = await fetch(`http://localhost:${PORT}/load-json/textTest.json`);
  const data = await res.json();
  expect(data).toBeDefined();
});

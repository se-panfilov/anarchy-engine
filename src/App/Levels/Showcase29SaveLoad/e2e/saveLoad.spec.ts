import { describe } from 'vitest';

import { PORT, startServer, stopServer } from './testServer';

describe('SaveLoad', () => {
  const TIMEOUT = 15_000;

  beforeAll(async () => await startServer());

  afterAll(async () => {
    await Promise.race([stopServer(), new Promise((_, reject) => setTimeout(() => reject(new Error('Server stop timeout')), TIMEOUT))]);
  });

  it('my test', async () => {
    // await startServer();
    const res = await fetch(`http://localhost:${PORT}/load-json/textTest.json`);
    console.log('XXX res', res);
    // const data = await res.json();
    // expect(data).toBeDefined();
  });
});

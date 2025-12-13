import { describe } from 'vitest';

import { PORT, startServer, stopServer } from './testServer';

describe('SaveLoad', () => {
  beforeAll(async () => await startServer());

  afterAll(async () => await stopServer());

  it('my test', async () => {
    // await startServer();
    const res = await fetch(`http://localhost:${PORT}/load-json/textTest.json`);
    console.log('XXX res', res);
    // const data = await res.json();
    // expect(data).toBeDefined();
  });
});

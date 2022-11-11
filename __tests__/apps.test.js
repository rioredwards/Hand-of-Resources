const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('apps routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('#GET /apps should return a list of apps', async () => {
    const resp = await request(app).get('/apps');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "id": "1",
          "name": "Span",
          "version": "3.29",
        },
        Object {
          "id": "2",
          "name": "Voltsillam",
          "version": "6.2.9",
        },
        Object {
          "id": "3",
          "name": "Treeflex",
          "version": "7.0",
        },
        Object {
          "id": "4",
          "name": "Hatity",
          "version": "6.9.0",
        },
        Object {
          "id": "5",
          "name": "Prodder",
          "version": "9.4.4",
        },
      ]
    `);
  });

  afterAll(() => {
    pool.end();
  });
});

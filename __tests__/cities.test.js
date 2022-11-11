const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('cities routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('#GET /cities should return a list of cities', async () => {
    const resp = await request(app).get('/cities');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "address": "359 Loomis Junction",
          "id": "1",
          "name": "Sungai",
        },
        Object {
          "address": "0 Merry Street",
          "id": "2",
          "name": "Ambelókipoi",
        },
        Object {
          "address": "19 Harper Plaza",
          "id": "3",
          "name": "Portland",
        },
        Object {
          "address": "64739 Beilfuss Lane",
          "id": "4",
          "name": "Lamakera Dua",
        },
        Object {
          "address": "2 Rowland Point",
          "id": "5",
          "name": "Bojongsarung",
        },
      ]
    `);
  });

  afterAll(() => {
    pool.end();
  });
});

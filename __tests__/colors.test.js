const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('colors routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('#GET /colors should return a list of colors', async () => {
    const resp = await request(app).get('/colors');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "id": "1",
          "is_my_favorite": false,
          "name": "Purple",
        },
        Object {
          "id": "2",
          "is_my_favorite": false,
          "name": "Red",
        },
        Object {
          "id": "3",
          "is_my_favorite": false,
          "name": "Pink",
        },
        Object {
          "id": "4",
          "is_my_favorite": true,
          "name": "Blue",
        },
        Object {
          "id": "5",
          "is_my_favorite": false,
          "name": "Orange",
        },
      ]
    `);
  });

  it('#GET colors/:id should return a single color', async () => {
    const resp = await request(app).get('/colors/1');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "id": "1",
        "is_my_favorite": false,
        "name": "Purple",
      }
    `);
  });

  afterAll(() => {
    pool.end();
  });
});

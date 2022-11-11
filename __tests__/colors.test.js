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

  it('#POST /colors should create a new color', async () => {
    const newColor = {
      name: 'Violet',
      is_my_favorite: false,
    };
    const resp = await request(app).post('/colors').send(newColor);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newColor,
    });
  });

  it('#PUT /colors/:id should update an existing color', async () => {
    const resp = await request(app).put('/colors/1').send({
      name: 'Yellow',
    });
    expect(resp.status).toBe(200);
    expect(resp.body.name).toBe('Yellow');
  });

  afterAll(() => {
    pool.end();
  });
});

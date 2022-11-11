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

  it('#GET cities/:id should return a single city', async () => {
    const resp = await request(app).get('/cities/1');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "address": "359 Loomis Junction",
        "id": "1",
        "name": "Sungai",
      }
    `);
  });

  it('#POST /cities should create a new city', async () => {
    const newCity = {
      name: 'Hood River',
      address: '123 Address Street',
    };
    const resp = await request(app).post('/cities').send(newCity);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newCity,
    });
  });

  it('#PUT /cities/:id should update an existing city', async () => {
    const resp = await request(app).put('/cities/1').send({
      address: 'Vancouver',
    });
    expect(resp.status).toBe(200);
    expect(resp.body.address).toBe('Vancouver');
  });

  it('#DELETE /cities/:id should delete a city', async () => {
    const resp = await request(app).delete('/cities/1');
    expect(resp.status).toBe(200);

    const cityResp = await request(app).get('/cities/1');
    expect(cityResp.status).toBe(404);
  });

  afterAll(() => {
    pool.end();
  });
});

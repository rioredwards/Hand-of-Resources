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

  it('#GET apps/:id should return a single app', async () => {
    const resp = await request(app).get('/apps/1');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "id": "1",
        "name": "Span",
        "version": "3.29",
      }
    `);
  });

  it('#POST /apps should create a new app', async () => {
    const newApp = {
      name: 'Facebook',
      version: '4.7',
    };
    const resp = await request(app).post('/apps').send(newApp);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newApp,
    });
  });

  it('#PUT /apps/:id should update an existing app', async () => {
    const resp = await request(app).put('/apps/1').send({
      name: 'Reddit',
    });
    expect(resp.status).toBe(200);
    expect(resp.body.name).toBe('Reddit');
  });

  it('#DELETE /apps/:id should delete a app', async () => {
    const resp = await request(app).delete('/apps/1');
    expect(resp.status).toBe(200);

    const appResp = await request(app).get('/apps/1');
    expect(appResp.status).toBe(404);
  });

  afterAll(() => {
    pool.end();
  });
});

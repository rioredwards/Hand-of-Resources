const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('users routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('#GET /users should return a list of users', async () => {
    const resp = await request(app).get('/users');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "email": "jlefriec0@feedburner.com",
          "id": "1",
          "username": "tguinan0",
        },
        Object {
          "email": "sducker1@nationalgeographic.com",
          "id": "2",
          "username": "ctixall1",
        },
        Object {
          "email": "pdagostini2@smh.com.au",
          "id": "3",
          "username": "bvannucci2",
        },
        Object {
          "email": "ajohnsey3@paypal.com",
          "id": "4",
          "username": "bandrieu3",
        },
        Object {
          "email": "ebalcon4@elpais.com",
          "id": "5",
          "username": "dedy4",
        },
      ]
    `);
  });

  it('#GET users/:id should return a single user', async () => {
    const resp = await request(app).get('/users/1');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "email": "jlefriec0@feedburner.com",
        "id": "1",
        "username": "tguinan0",
      }
    `);
  });

  afterAll(() => {
    pool.end();
  });
});

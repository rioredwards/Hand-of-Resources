const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('animals routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('#GET /animals should return a list of animals', async () => {
    const resp = await request(app).get('/animals');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "common_name": "Echidna",
          "id": "1",
          "num_legs": 4,
        },
        Object {
          "common_name": "Capuchin",
          "id": "2",
          "num_legs": 2,
        },
        Object {
          "common_name": "Python",
          "id": "3",
          "num_legs": 0,
        },
        Object {
          "common_name": "Fox",
          "id": "4",
          "num_legs": 4,
        },
        Object {
          "common_name": "Butterfly",
          "id": "5",
          "num_legs": 6,
        },
      ]
    `);
  });

  it('#GET animals/:id should return a single animal', async () => {
    const resp = await request(app).get('/animals/1');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "common_name": "Echidna",
        "id": "1",
        "num_legs": 4,
      }
    `);
  });

  it('#POST /animals should create a new animal', async () => {
    const newAnimal = {
      common_name: 'Cat',
      num_legs: 4,
    };
    const resp = await request(app).post('/animals').send(newAnimal);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newAnimal,
    });
  });

  it('#PUT /animals/:id should update an existing animal', async () => {
    const resp = await request(app).put('/animals/1').send({
      num_legs: 3,
    });
    expect(resp.status).toBe(200);
    expect(resp.body.num_legs).toBe(3);
  });

  it('#DELETE /animals/:id should delete a animal', async () => {
    const resp = await request(app).delete('/animals/1');
    expect(resp.status).toBe(200);

    const animalResp = await request(app).get('/animals/1');
    expect(animalResp.status).toBe(404);
  });

  afterAll(() => {
    pool.end();
  });
});

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
    expect(resp.body).toEqual([
      {
        id: '1',
        common_name: 'Echidna',
        num_legs: 4,
      },
      {
        id: '2',
        common_name: 'Capuchin',
        num_legs: 2,
      },
      {
        id: '3',
        common_name: 'Python',
        num_legs: 0,
      },
      {
        id: '4',
        common_name: 'Fox',
        num_legs: 4,
      },
      {
        id: '5',
        common_name: 'Butterfly',
        num_legs: 6,
      },
    ]);
  });

  afterAll(() => {
    pool.end();
  });
});

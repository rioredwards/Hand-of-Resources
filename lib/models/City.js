const pool = require('../utils/pool');

class City {
  id;
  name;
  address;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.address = row.address;
  }

  static async getAll() {
    const { rows } = await pool.query(`
      SELECT * FROM cities;
    `);
    return rows.map((row) => new City(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
    SELECT * FROM cities 
    WHERE cities.id = $1`,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new City(rows[0]);
  }

  static async insert({ name, address }) {
    const { rows } = await pool.query(
      `
        INSERT INTO cities (name, address)
        VALUES ($1, $2)
        RETURNING *
      `,
      [name, address]
    );
    return new City(rows[0]);
  }

  static async updateById(id, newAttrs) {
    const city = await City.getById(id);
    if (!city) return null;
    const updatedData = { ...city, ...newAttrs };
    const { rows } = await pool.query(
      `
      UPDATE cities
      SET name = $2, address = $3
      WHERE id = $1
      RETURNING *;
    `,
      [id, updatedData.name, updatedData.address]
    );
    return new City(rows[0]);
  }
}

module.exports = { City };

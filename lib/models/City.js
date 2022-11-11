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
}

module.exports = { City };

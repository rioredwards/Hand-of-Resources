const pool = require('../utils/pool');

class Animal {
  id;
  common_name;
  num_legs;

  constructor(row) {
    this.id = row.id;
    this.common_name = row.common_name;
    this.num_legs = row.num_legs;
  }

  static async getAll() {
    const { rows } = await pool.query(`
      SELECT * FROM animals;
    `);
    return rows.map((row) => new Animal(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
    SELECT * FROM animals 
    WHERE animals.id = $1`,
      [id]
    );
    return new Animal(rows[0]);
  }

  static async insert({ common_name, num_legs }) {
    const { rows } = await pool.query(
      `
        INSERT INTO animals (common_name, num_legs)
        VALUES ($1, $2)
        RETURNING *
      `,
      [common_name, num_legs]
    );
    return new Animal(rows[0]);
  }
}

module.exports = { Animal };
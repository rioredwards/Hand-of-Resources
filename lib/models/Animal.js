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
      SELECT * from animals;
    `);
    return rows.map((row) => new Animal(row));
  }
}

module.exports = { Animal };

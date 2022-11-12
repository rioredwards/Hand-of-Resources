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
    if (rows.length === 0) {
      return null;
    }
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

  static async updateById(id, newAttrs) {
    const animal = await Animal.getById(id);
    if (!animal) return null;

    const updatedData = { ...animal, ...newAttrs };
    const { rows } = await pool.query(
      `
      UPDATE animals
      SET common_name = $2, num_legs = $3
      WHERE id = $1
      RETURNING *;
    `,
      [id, updatedData.common_name, updatedData.num_legs]
    );
    return new Animal(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
      DELETE from animals
      WHERE id = $1
      RETURNING *
    `,
      [id]
    );
    return new Animal(rows[0]);
  }
}

module.exports = { Animal };

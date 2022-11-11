const pool = require('../utils/pool');

class Color {
  id;
  name;
  is_my_favorite;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.is_my_favorite = row.is_my_favorite;
  }

  static async getAll() {
    const { rows } = await pool.query(`
      SELECT * FROM colors;
    `);
    return rows.map((row) => new Color(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
    SELECT * FROM colors 
    WHERE colors.id = $1`,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new Color(rows[0]);
  }

  static async insert({ name, is_my_favorite }) {
    const { rows } = await pool.query(
      `
        INSERT INTO colors (name, is_my_favorite)
        VALUES ($1, $2)
        RETURNING *
      `,
      [name, is_my_favorite]
    );
    return new Color(rows[0]);
  }

  static async updateById(id, newAttrs) {
    const color = await Color.getById(id);
    if (!color) return null;
    const updatedData = { ...color, ...newAttrs };
    const { rows } = await pool.query(
      `
      UPDATE colors
      SET name = $2, is_my_favorite = $3
      WHERE id = $1
      RETURNING *;
    `,
      [id, updatedData.name, updatedData.is_my_favorite]
    );
    return new Color(rows[0]);
  }
}

module.exports = { Color };

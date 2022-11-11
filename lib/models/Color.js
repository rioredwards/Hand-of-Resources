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
}

module.exports = { Color };

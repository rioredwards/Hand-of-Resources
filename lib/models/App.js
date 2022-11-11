const pool = require('../utils/pool');

class App {
  id;
  name;
  version;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.version = row.version;
  }

  static async getAll() {
    const { rows } = await pool.query(`
      SELECT * FROM apps;
    `);
    return rows.map((row) => new App(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
    SELECT * FROM apps 
    WHERE apps.id = $1`,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new App(rows[0]);
  }

  static async insert({ name, version }) {
    const { rows } = await pool.query(
      `
        INSERT INTO apps (name, version)
        VALUES ($1, $2)
        RETURNING *
      `,
      [name, version]
    );
    return new App(rows[0]);
  }

  static async updateById(id, newAttrs) {
    const app = await App.getById(id);
    if (!app) return null;
    const updatedData = { ...app, ...newAttrs };
    const { rows } = await pool.query(
      `
      UPDATE apps
      SET name = $2, version = $3
      WHERE id = $1
      RETURNING *;
    `,
      [id, updatedData.name, updatedData.version]
    );
    return new App(rows[0]);
  }
}

module.exports = { App };

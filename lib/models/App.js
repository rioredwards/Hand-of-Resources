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
}

module.exports = { App };

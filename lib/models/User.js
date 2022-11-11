const pool = require('../utils/pool');

class User {
  id;
  username;
  email;

  constructor(row) {
    this.id = row.id;
    this.username = row.username;
    this.email = row.email;
  }

  static async getAll() {
    const { rows } = await pool.query(`
      SELECT * FROM users;
    `);
    return rows.map((row) => new User(row));
  }
}

module.exports = { User };

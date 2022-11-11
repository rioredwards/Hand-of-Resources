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

  static async getById(id) {
    const { rows } = await pool.query(
      `
    SELECT * FROM users 
    WHERE users.id = $1`,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new User(rows[0]);
  }

  static async insert({ username, email }) {
    const { rows } = await pool.query(
      `
        INSERT INTO users (username, email)
        VALUES ($1, $2)
        RETURNING *
      `,
      [username, email]
    );
    return new User(rows[0]);
  }
}

module.exports = { User };

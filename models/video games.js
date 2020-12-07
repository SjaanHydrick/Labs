const pool = require('../utils/pool');

module.exports = class VideoGame {
    id;
    title;
    description;
    url;

    constructor(row) {
      this.id = row.id;
      this.title = row.title;
      this.description = row.description;
      this.url = row.url;
    }

    static async insert({ title, description, url }) {
      const { rows } = await pool.query(
        'INSERT INTO video games (title, description, url) VALUES ($1, $2, $3) RETURNING *', [title, description, url]
      );

      return new VideoGame(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query('SELECT * FROM video games');

      return rows.map(row => new VideoGame(row));
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM video games WHERE id=$1', [id]
      );

      if(!rows[0]) throw new Error(`No video games with id ${id}`);
      return new VideoGame(rows[0]);
    }

    static async update(id, { title, description, url }) {
      const { rows } = await pool.query(
        `UPDATE video games SET title=$1, description=$2, url=$3
        WHERE id=$4
        RETURNING *`,
        [title, description, url, id]
      );

      return new VideoGame(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM video games WHERE id=$1 RETURNING *', [id]
      );

      return new VideoGame(rows[0]);
    }
};

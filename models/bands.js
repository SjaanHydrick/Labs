const pool = require('../utils/pool');

module.exports = class Band {
    id;
    name;
    genre;
    url;

    constructor(row) {
      this.id = row.id;
      this.name = row.title;
      this.genre = row.description;
      this.url = row.url;
    }

    static async insert({ name, genre, url }) {
      const { rows } = await pool.query(
        'INSERT INTO bands (name, genre, url) VALUES ($1, $2, $3) RETURNING *', [name, genre, url]
      );

      return new Band(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query('SELECT * FROM bands');

      return rows.map(row => new Band(row));
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM bands WHERE id=$1', [id]
      );

      if(!rows[0]) throw new Error(`No bands with id ${id}`);
      return new Band(rows[0]);
    }

    static async update(id, { name, genre, url }) {
      const { rows } = await pool.query(
        `UPDATE bands SET name=$1, genre=$2, url=$3
        WHERE id=$4
        RETURNING *`,
        [name, genre, url, id]
      );

      return new Band(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM bands WHERE id=$1 RETURNING *', [id]
      );

      return new Band(rows[0]);
    }
};

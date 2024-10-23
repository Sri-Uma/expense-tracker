// models/category.js
const db = require('../config/database');

// Add a new category
exports.create = (category, callback) => {
  const { name, type } = category;
  const sql = `INSERT INTO categories (name, type) VALUES (?, ?)`;
  db.run(sql, [name, type], function (err) {
    callback(err, { id: this.lastID });
  });
};

// Get all categories
exports.getAll = (callback) => {
  db.all('SELECT * FROM categories', [], (err, rows) => {
    callback(err, rows);
  });
};

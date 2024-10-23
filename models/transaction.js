// models/transaction.js
const db = require('../config/database');

// Create a new transaction
exports.create = (transaction, callback) => {
  const { type, category_id, amount, date, description } = transaction;
  const sql = `
    INSERT INTO transactions (type, category_id, amount, date, description) 
    VALUES (?, ?, ?, ?, ?)`;
  db.run(sql, [type, category_id, amount, date, description], function (err) {
    callback(err, { id: this.lastID });
  });
};

// Get all transactions
exports.getAll = (callback) => {
  db.all('SELECT * FROM transactions', [], (err, rows) => {
    callback(err, rows);
  });
};

// Get transaction by ID
exports.getById = (id, callback) => {
  db.get('SELECT * FROM transactions WHERE id = ?', [id], (err, row) => {
    callback(err, row);
  });
};

// Update transaction
exports.update = (id, transaction, callback) => {
  const { type, category_id, amount, date, description } = transaction;
  const sql = `
    UPDATE transactions 
    SET type = ?, category_id = ?, amount = ?, date = ?, description = ? 
    WHERE id = ?`;
  db.run(sql, [type, category_id, amount, date, description, id], function (err) {
    callback(err, this.changes);
  });
};

// Delete transaction
exports.delete = (id, callback) => {
  db.run('DELETE FROM transactions WHERE id = ?', [id], function (err) {
    callback(err, this.changes);
  });
};

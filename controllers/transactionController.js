const Transaction = require('../models/transaction');

exports.addTransaction = (req, res) => {
  const transaction = req.body;
  Transaction.create(transaction, (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to add transaction' });
    // Include message in the response
    res.status(201).json({ id: result.id, message: 'Transaction added successfully' });
  });
};

exports.getAllTransactions = (req, res) => {
  Transaction.getAll((err, transactions) => {
    if (err) return res.status(500).json({ error: 'Failed to retrieve transactions' });
    res.json(transactions);
  });
};

exports.getTransactionById = (req, res) => {
  const { id } = req.params;
  Transaction.getById(id, (err, transaction) => {
    if (err || !transaction) return res.status(404).json({ error: 'Transaction not found' });
    res.json(transaction);
  });
};

exports.updateTransaction = (req, res) => {
  const { id } = req.params;
  const transaction = req.body;
  Transaction.update(id, transaction, (err, changes) => {
    if (err || changes === 0) return res.status(404).json({ error: 'Failed to update transaction' });
    // Include a success message
    res.json({ message: 'Transaction updated successfully' });
  });
};

exports.deleteTransaction = (req, res) => {
  const { id } = req.params;
  Transaction.delete(id, (err, changes) => {
    if (err || changes === 0) return res.status(404).json({ error: 'Transaction not found or failed to delete' });
    // Include a success message
    res.json({ message: 'Transaction deleted successfully' });
  });
};

exports.getSummary = (req, res) => {
  // Retrieve all transactions to calculate summary
  Transaction.getAll((err, transactions) => {
    if (err) return res.status(500).json({ error: 'Failed to retrieve summary' });

    const summary = transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'income') {
          acc.income += transaction.amount;
        } else if (transaction.type === 'expense') {
          acc.expense += transaction.amount;
        }
        return acc;
      },
      { income: 0, expense: 0 }
    );

    summary.balance = summary.income - summary.expense;
    res.json(summary);
  });
};

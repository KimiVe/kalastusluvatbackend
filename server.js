const express = require('express');
const db = require('./db');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('MySQL with Express.js on Windows!');
});

// Get all users (example query)
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

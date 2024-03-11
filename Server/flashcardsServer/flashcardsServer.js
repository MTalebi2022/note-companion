const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
const port = 3002;

// PostgreSQL pool connection setup
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'notes',
  password: 'yourPassword',
  port: 5432,
});

app.use(cors());
app.use(bodyParser.json());

// Get all notes
app.get('/notes', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM flash_entries');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).send('Error fetching notes');
  }
});
// Save a flashcard
app.post('/notes', async (req, res) => {
  const { question, answer } = req.body;
  try {
    const insertQuery = 'INSERT INTO flash_entries(front, back) VALUES ($2, $1) RETURNING *';
    const { rows } = await pool.query(insertQuery, [question, answer]);
    res.json(rows[0]);
  } catch (error) {
    console.error('Error saving flashcard:', error);
    res.status(500).send('Server error during flashcard saving');
  }
});

// Delete a flashcard
app.delete('/notes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleteQuery = 'DELETE FROM flash_entries WHERE id = $1';
    await pool.query(deleteQuery, [id]);
    res.json({ message: "Flashcard deleted successfully." });
  } catch (error) {
    console.error('Error deleting flashcard:', error);
    res.status(500).send('Server error during flashcard deletion');
  }
});
app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    })
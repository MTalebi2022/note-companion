const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3001;

// Enable CORS for all routes
app.use(cors());

// Setup body-parser middleware to parse JSON bodies
app.use(bodyParser.json());

// PostgreSQL pool connection setup
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'notes',
  password: 'yourPassword', // Make sure to use your real password
  port: 5432,
});

// Define your routes here
// For example, a route to fetch all notes
app.get('/notes', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM note_entries');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).send('Error fetching notes');
  }
});
// Create a new note
app.post('/notes', async (req, res) => {
  const { title, text } = req.body;
  try {
    const { rows } = await pool.query('INSERT INTO note_entries(title, text) VALUES ($1, $2) RETURNING *', [title, text]);
    res.json(rows[0]);
  } catch (error) {
    console.error('Error saving note:', error);
    res.status(500).send('Error saving note');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
app.delete('/notes/:id', async (req, res) => {
  const { id } = req.params;
  try {
      const deleteQuery = 'DELETE FROM note_entries WHERE id = $1';
      await pool.query(deleteQuery, [id]);
      res.json({ message: "Note deleted successfully." });
  } catch (error) {
      console.error('Error deleting note:', error);
      res.status(500).send('Server error');
  }
});

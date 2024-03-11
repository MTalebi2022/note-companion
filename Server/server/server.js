const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");
const admin = require("firebase-admin");
const db = require("./db");

const app = express();
const port = 3001;

// Enable CORS for all routes
app.use(cors());

// Setup body-parser middleware to parse JSON bodies
app.use(bodyParser.json());

// Define your routes here
// For example, a route to fetch all notes
app.get("/notes", async (req, res) => {
  try {
    const snapshot = await db.collection("note_entries").get();
    const notes = [];
    snapshot.forEach((doc) => {
      notes.push({ id: doc.id, ...doc.data() });
    });
    res.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).send("Error fetching notes");
  }
});
// Create a new note
app.post("/notes", async (req, res) => {
  const { title, text } = req.body;
  try {
    const docRef = db.collection("note_entries").doc(); // Create a new document reference with an auto-generated ID
    await docRef.set({
      title: title,
      text: text,
    });

    // Fetch the saved document back
    const savedDoc = await docRef.get();
    res.json(savedDoc.data());
  } catch (error) {
    console.error("Error saving note:", error);
    res.status(500).send("Error saving note");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
app.delete("/notes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.collection("note_entries").doc(id).delete();
    res.json({ message: "Note deleted successfully." });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).send("Server error");
  }
});

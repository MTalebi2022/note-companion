const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");
const admin = require("firebase-admin");
const db = require("./db");

const app = express();
app.use(cors());
const port = 3002;

app.use(cors());
app.use(bodyParser.json());

// Get all notes
app.get("/notes", async (req, res) => {
  try {
    const snapshot = await db.collection("flash_entries").get();
    const flashEntries = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(flashEntries);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).send("Error fetching notes");
  }
});
// Save a flashcard
app.post("/notes", async (req, res) => {
  const { question, answer } = req.body;
  try {
    const docRef = await db.collection("flash_entries").add({
      front: answer, // Assuming $2 corresponds to 'question'
      back: question, // Assuming $1 corresponds to 'answer'
    });

    // Fetch the saved document back
    const newDoc = await docRef.get();
    res.json({ id: newDoc.id, ...newDoc.data() });
  } catch (error) {
    console.error("Error saving flashcard:", error);
    res.status(500).send("Server error during flashcard saving");
  }
});

// Delete a flashcard
app.delete("/notes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.collection("flash_entries").doc(id).delete();
    res.json({ message: "Flashcard deleted successfully." });
  } catch (error) {
    console.error("Error deleting flashcard:", error);
    res.status(500).send("Server error during flashcard deletion");
  }
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

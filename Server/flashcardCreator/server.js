import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import openai from "./open-ai.js"; // Ensure this exports a properly configured OpenAI client instance

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post("/generate_flashcards", async (req, res) => {
  try {
    const { text } = req.body;
    console.log(req.body);
    if (!text) throw new Error("text is required");

    // Preparing the prompt for OpenAI
    const prompt = `Convert the following text into a series of flashcards and just return me an array of json. With keys of "answer" and "question":"\nText: "${text}"\nFlashcards:`;

    // Sending the prompt to OpenAI
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-3.5-turbo",
    });
    //console.log(JSON.stringify(completion, null, 2));
    // Parse the API response from JSON string to JavaScript object
    const rawFlashcards = JSON.parse(completion.choices[0].message.content);

    // Validate and structure the flashcards
    const flashcards = rawFlashcards
      .map((flashcard) => {
        return flashcard.question && flashcard.answer
          ? { question: flashcard.question, answer: flashcard.answer }
          : null;
      })
      .filter((flashcard) => flashcard != null);

    console.log(flashcards);
    res.json(flashcards);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing flashcards: " + error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

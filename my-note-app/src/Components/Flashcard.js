import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiTrash2 } from 'react-icons/fi';
import './Flashcard.css';

function Flashcards({ isDarkMode }) {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    fetchFlashEntries();
  }, []);

  const flashcardsAPI = 'http://localhost:3002/notes';

  const fetchFlashEntries = () => {
    axios.get(flashcardsAPI)
      .then(response => {
        const cardsWithFlipState = response.data.map(card => ({
          ...card,
          isFlipped: false
        }));
        setFlashcards(cardsWithFlipState);
      })
      .catch(error => {
        console.error('Error fetching flash entries:', error);
      });
  };

  const deleteFlashcard = (id, event) => {
    event.stopPropagation(); // Prevent the flip action when clicking delete
    if (window.confirm('Are you sure you want to delete this flashcard?')) {
      axios.delete(`${flashcardsAPI}/${id}`)
        .then(fetchFlashEntries)
        .catch(error => console.error('Error deleting flashcard:', error));
    }
  };

  const flipCard = (id, event) => {
    event.stopPropagation(); // Prevent the delete action when clicking flip
    setFlashcards(flashcards.map(card =>
      card.id === id ? { ...card, isFlipped: !card.isFlipped } : card
    ));
  };

  return (
    <div className={`flashcards-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {flashcards.map(flashcard => (
        <div key={flashcard.id} className="flashcard" onClick={(event) => flipCard(flashcard.id, event)}>
          <div className={`card ${flashcard.isFlipped ? 'flipped' : ''}`}>
            <div className="card-face front">
              <span className="card-text">{flashcard.isFlipped ? flashcard.back : flashcard.front}</span>
            </div>
            <div className="card-face back">
              <span className="card-text">{flashcard.isFlipped ? flashcard.front : flashcard.back}</span>
            </div>
            <FiTrash2 className="delete-icon" onClick={(event) => deleteFlashcard(flashcard.id, event)} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Flashcards;

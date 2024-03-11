import React, { Component } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import { FiEdit, FiTrash2, FiPlusSquare } from "react-icons/fi"; // Import FiPlusSquare for the new icon

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      flashcards: [],
    };
  }

  componentDidMount() {
    this.loadNotes();
  }

  loadNotes = () => {
    axios
      .get("/notes")
      .then((res) => this.setState({ notes: res.data }))
      .catch((err) => console.error("Could not fetch notes", err));
  };

  handleDelete = (noteId) => {
    // Use window.confirm to ask for confirmation
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (isConfirmed) {
      axios
        .delete(`/notes/${noteId}`)
        .then(() => this.loadNotes()) // Refresh notes after deletion
        .catch((err) => console.error("Error deleting note", err));
    } else {
      // If the user cancels, you can optionally perform some action, but typically nothing is needed
      console.log("Deletion cancelled by user.");
    }
  };

  handleCreateFlashcard = (note) => {
    console.log("Creating flashcard for note:", note);

    // Format and print the current date and time
    const now = new Date();
    const formattedDate = now.toISOString(); // This will give you the date and time in ISO format, e.g., "2024-03-10T04:38:20.000Z"
    console.log("Current date and time:", formattedDate);

    const apiUrl = "http://localhost:5000/generate_flashcards";
    const requestData = {
      num_flashcards_limit: 5, // or any other number you prefer
      text: note.text,
    };
    console.log(requestData);
    axios
      .post(apiUrl, requestData)
      .then((response) => {
        console.log("Response data from API:", response.data);

        // Iterate over each flashcard in the response data
        response.data.forEach((flashcard) => {
          // Post each flashcard to your backend endpoint for saving
          axios
            .post("http://localhost:3002/notes/", flashcard)
            .then((saveResponse) => {
              console.log("Flashcard saved successfully", saveResponse.data);
            })
            .catch((saveError) => {
              console.error("Error saving flashcard:", saveError);
            });
        });
      })
      .catch((error) => {
        console.error("Error generating flashcards:", error);
      });
  };

  render() {
    const { isDarkMode } = this.props;
    const tableStyle = isDarkMode ? "table-dark" : "table-light";

    const textTruncateStyle = {
      maxWidth: "200px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    };

    const pageStyle = {
      minHeight: "100vh",
      backgroundColor: isDarkMode ? "#343a40" : "#f8f9fa",
      color: isDarkMode ? "white" : "black",
      padding: "20px",
    };

    return (
      <div style={pageStyle}>
        <Table striped bordered hover className={tableStyle}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Text</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.notes.map((note) => (
              <tr key={note.id}>
                <td>{note.title}</td>
                <td style={textTruncateStyle} title={note.text}>
                  {note.text}
                </td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    style={{ marginRight: "10px" }}
                    onClick={() => {
                      /* Handle edit logic here */
                    }}
                  >
                    <FiEdit />
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    style={{ marginRight: "10px" }}
                    onClick={() => this.handleDelete(note.id)}
                  >
                    <FiTrash2 />
                  </Button>
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={() => this.handleCreateFlashcard(note)}
                  >
                    <FiPlusSquare /> {/* Icon for creating a flashcard */}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Notes;

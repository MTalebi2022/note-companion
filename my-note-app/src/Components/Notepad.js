import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import React, { Component } from 'react';

class NotePad extends Component {
	constructor(props) {
		super(props);
		// Initialize state with props for edit mode or default values for create mode
		this.state = {
			id: props.editNote?.id || null,
			title: props.editNote?.title || "",
			text: props.editNote?.text || "",
			wordCount: props.editNote?.text
				? props.editNote.text.split(/\s+/).filter(Boolean).length
				: 0,
			showModal: false,
			showClearModal: false,
		};
	}

	handleInputChange = (event) => {
		const { name, value } = event.target;
		const words = value.trim().split(/\s+/).filter(Boolean);
		this.setState({
			[name]: value,
			wordCount: words.length,
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		// Validation logic remains the same
		if (
			this.state.title.length >= 3 &&
			this.state.text.length >= 20 &&
			this.state.wordCount <= 500
		) {
			this.setState({ showModal: true });
		} else {
			alert(
				"Title must contain at least 3 characters, text must contain at least 20 characters, and you cannot exceed 1000 words."
			);
		}
	};

	handleSave = () => {
		const { id, title, text } = this.state;
		// Decide whether to create a new note or update an existing one
		const method = id ? axios.put : axios.post;
		const url = id ? `/notes/${id}` : "/notes";

		method(url, { title, text })
			.then((response) => {
				console.log("Operation successful:", response.data);
				this.setState({
					title: "",
					text: "",
					wordCount: 0,
					showModal: false,
				});
				// Optionally, redirect or inform parent component to update the list of notes
			})
			.catch((error) => {
				console.error("Error during operation:", error);
			});
	};
	handleClose = () => {
		this.setState({ showModal: false });
	};

	handleClear = () => {
		this.setState({ showClearModal: true });
	};

	handleClearConfirmation = () => {
		this.setState({
			title: "",
			text: "",
			wordCount: 0,
			showClearModal: false,
		});
	};

	handleClearCancel = () => {
		this.setState({ showClearModal: false });
	};

	render() {
		const { isDarkMode } = this.props;
		const { showModal, showClearModal } = this.state;
		const notePadStyle = {
			position: "fixed",
			top: "50px",
			left: 0,
			right: 0,
			bottom: 0,
			width: "100vw",
			height: "calc(100vh - 50px)",
			backgroundColor: isDarkMode ? "#343a40" : "#f8f9fa",
			color: isDarkMode ? "#fff" : "#000",
			padding: "20px",
			overflowY: "auto",
			zIndex: 10,
		};

		const formStyle = {
			display: "flex",
			flexDirection: "column",
			height: "100%",
			justifyContent: "center",
			alignItems: "center",
		};

		const buttonStyle = {
			padding: "10px 20px",
			marginLeft: "10px",
			borderRadius: "5px",
			fontSize: "16px",
			cursor: "pointer",
		};

		return (
			<div style={notePadStyle}>
				<form onSubmit={this.handleSubmit} style={formStyle}>
					{/* Conditional rendering for Dark/Light mode */}
					<h2 style={{ color: isDarkMode ? "#fff" : "#000" }}>
						{isDarkMode
							? "Dark Mode NotePad"
							: "Light Mode NotePad"}
					</h2>
					<input
						type="text"
						id="title"
						name="title"
						placeholder="Title"
						value={this.state.title}
						onChange={this.handleInputChange}
						style={{
							margin: "10px 0",
							padding: "5px",
							width: "80%",
						}}
					/>
					<textarea
						id="text"
						name="text"
						placeholder="Note text"
						value={this.state.text}
						onChange={this.handleInputChange}
						rows="10"
						style={{
							margin: "10px 0",
							padding: "5px",
							width: "80%",
						}}
					/>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							width: "80%",
						}}>
						<p>Words Typed: {this.state.wordCount}</p>
						<div>
							<button
								type="button"
								onClick={this.handleClear}
								style={{
									...buttonStyle,
									backgroundColor: "red",
									color: "#fff",
								}}>
								Clear
							</button>
							<button
								type="submit"
								style={{
									...buttonStyle,
									backgroundColor: "green",
									color: "#fff",
								}}>
								Save
							</button>
						</div>
					</div>
				</form>
				<Modal show={showModal} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Confirmation</Modal.Title>
					</Modal.Header>
					<Modal.Body>Do you want to save this note?</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={this.handleClose}>
							Cancel
						</Button>
						<Button variant="primary" onClick={this.handleSave}>
							Save
						</Button>
					</Modal.Footer>
				</Modal>
				<Modal show={showClearModal} onHide={this.handleClearCancel}>
					<Modal.Header closeButton>
						<Modal.Title>Confirmation</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						Are you sure you want to clear all fields?
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant="secondary"
							onClick={this.handleClearCancel}>
							Cancel
						</Button>
						<Button
							variant="danger"
							onClick={this.handleClearConfirmation}>
							Clear
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}

export default NotePad;

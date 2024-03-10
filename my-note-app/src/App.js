import React, { Component } from "react";
import "bootswatch/dist/quartz/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navpane from "./Components/Navpane";
import Home from "./Components/Home";
import NotePad from "./Components/Notepad";
import Notes from "./Components/Notes";
import Flashcard from "./Components/Flashcard"; // Ensure this import is correct

const lightTheme = {
	backgroundColor: "#f8f9fa",
	color: "#000",
};

const darkTheme = {
	backgroundColor: "#343a40",
	color: "#fff",
};

class App extends Component {
	constructor() {
		super();
		this.state = {
			notes: [],
			isDarkMode: false,
		};
	}

	toggleTheme = () => {
		this.setState({ isDarkMode: !this.state.isDarkMode });
	};

	render() {
		const theme = this.state.isDarkMode ? darkTheme : lightTheme;

		return (
			<div style={{ ...theme }}>
				<Router>
					<Navpane
						toggleTheme={this.toggleTheme}
						isDarkMode={this.state.isDarkMode}
					/>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route
							path="/notepad"
							element={
								<NotePad isDarkMode={this.state.isDarkMode} />
							}
						/>
						<Route
							path="/notes"
							element={
								<Notes isDarkMode={this.state.isDarkMode} />
							}
						/>
						<Route
							path="/flashcard"
							element={
								<Flashcard
									frontContent="Front of the Card"
									backContent="Back of the Card"
									isDarkMode={this.state.isDarkMode}
								/>
							}
						/>
						
					</Routes>
				</Router>
			</div>
		);
	}
}

export default App;

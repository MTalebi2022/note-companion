import React, { Component } from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faStickyNote, faList, faMoon, faSun, faLayerGroup } from '@fortawesome/free-solid-svg-icons'; // Assuming you want to use faLayerGroup for Flashcard

export default class Navpane extends Component {
    render() {
        const { toggleTheme, isDarkMode } = this.props;

        const navbarStyle = {
            backgroundColor: isDarkMode ? '#454d55' : '#f8f9fa',
            borderRadius: '10px',
            padding: '10px', // Add padding to the navbar
        };

        const linkStyle = {
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            padding: '5px 15px', // Add padding to each link
        };

        const toggleIconStyle = {
            cursor: 'pointer',
            fontSize: '1.2rem',
            color: isDarkMode ? '#f8f9fa' : '#343a40',
            transition: 'color 0.3s',
            marginLeft: '10px',
        };

        return (
            <div className="navigation">
                <Container>
                    <Navbar expand="lg" variant={isDarkMode ? 'dark' : 'light'} style={navbarStyle}>
                        <LinkContainer to="/">
                            <Navbar.Brand style={{ fontWeight: 'bold', color: isDarkMode ? '#fff' : '#000' }}>MyNoteApp</Navbar.Brand>
                        </LinkContainer>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <LinkContainer to='/' style={linkStyle}>
                                    <Nav.Link style={linkStyle}><FontAwesomeIcon icon={faHome} /> Home</Nav.Link>
                                </LinkContainer>

                                <LinkContainer to='/Notepad' style={linkStyle}>
                                    <Nav.Link style={linkStyle}><FontAwesomeIcon icon={faStickyNote} /> Notepad</Nav.Link>
                                </LinkContainer>

                                <LinkContainer to='/Notes' style={linkStyle}>
                                    <Nav.Link style={linkStyle}><FontAwesomeIcon icon={faList} /> Notes</Nav.Link>
                                </LinkContainer>

                                {/* Added Flashcard Option */}
                                <LinkContainer to='/Flashcard' style={linkStyle}>
                                    <Nav.Link style={linkStyle}><FontAwesomeIcon icon={faLayerGroup} /> Flashcard</Nav.Link>
                                </LinkContainer>

                            </Nav>
                            <div onClick={toggleTheme} style={toggleIconStyle}>
                                <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
                            </div>
                        </Navbar.Collapse>
                    </Navbar>
                </Container>
            </div>
        );
    }
}

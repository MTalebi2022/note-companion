import React, { Component } from 'react';

export default class Home extends Component {
    render() {
        const containerStyle = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            textAlign: 'center',
            padding: '0 20px',
        };

        const summaryStyle = {
            fontSize: '1.5rem',
            lineHeight: '1.8',
            maxWidth: '800px',
            margin: '0 auto',
        };

        return (
            <div style={containerStyle}>
                <div>
                    <h1>Welcome to NoteCompanion</h1>
                    <p style={summaryStyle}>
                        NoteCompanion is a web app designed to enhance your note-taking experience, especially when reading or studying. With NoteCompanion, users can create summaries from textbooks and retrieve them easily. Advanced search features and categorization tools help you quickly find and sort information. NoteCompanion also offers synchronization across devices, ensuring your notes are always accessible, whether you're at home, in the library, or on the go. Ideal for students, researchers, and avid readers, NoteCompanion transforms the way you gather and manage knowledge, making study sessions more productive and reading experiences more enriching.
                    </p>
                </div>
            </div>
        );
    }
}

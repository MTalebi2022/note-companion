from flask import Flask, request, jsonify
from flask_cors import CORS
import app

main = Flask(__name__)
CORS(main)  # Enable CORS for all routes

@main.route('/generate_flashcards', methods=['POST'])
def generate_flashcards():
    # Get the text input and number of flashcards from the request
    text = request.json['text']
    num_flashcards = request.json['num_flashcards_limit']

    # Call your machine learning model to generate the flashcards
    flashcards = app.generate_flashcards(text, num_flashcards)

    # Return the flashcards as a JSON response
    response = {
        'flashcards': flashcards
    }
    return jsonify(response)

if __name__ == '__main__':
    main.run(debug=True)  # Added debug=True for development purposes
from flask import Flask, jsonify, request
from gemini_utils import generate_quiz_questions
from flask_cors import CORS

import os

app = Flask(__name__)

CORS(app)


# Route for testing the API
@app.route("/")
def hello():
    return jsonify({"message": "Hello, World!"})


@app.route("/get_quiz", methods=["GET"])
def get_quiz():
    standard = request.args.get("standard")
    topics = request.args.get("topics")
    subject = request.args.get("subject")

    quiz = generate_quiz_questions(standard, subject, topics)

    return jsonify(quiz)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))

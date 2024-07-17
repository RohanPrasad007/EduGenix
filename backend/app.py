from flask import Flask, jsonify, request
from gemini_utils import generate_quiz_questions
from flask_cors import CORS
from google.oauth2 import id_token
from google.auth.transport import requests
from dotenv import load_dotenv
from mongo_utils import add_user

import os
import time

load_dotenv()

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


@app.route("/auth/google", methods=["POST"])
def google_auth():
    print("this is working")
    print(request.json)
    credential = request.json["credential"]
    print(credential)
    try:
        time.sleep(2)
        idinfo = id_token.verify_oauth2_token(
            credential, requests.Request(), os.environ.get("GOOGLE_CLIENT_ID")
        )

        if idinfo["iss"] not in ["accounts.google.com", "https://accounts.google.com"]:
            raise ValueError("Wrong issuer.")

        user = add_user(idinfo)

        return jsonify({"success": True, "user": user}), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"success": False, "error": "Invalid token"}), 400


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))

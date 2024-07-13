import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.environ["GEMINI_API_KEY"])


def generate_quiz_questions(standard, subject, topics):
    generation_config = {
        "temperature": 1,
        "top_p": 0.95,
        "top_k": 64,
        "max_output_tokens": 8192,
        "response_mime_type": "application/json",
    }

    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        generation_config=generation_config,
        system_instruction='You are an advanced educational content generator for an interactive learning app. Your task is to create a JSON-formatted quiz based on the subject and topic provided by the user. Follow these guidelines:\n\n1. Generate 10 multiple-choice questions on the given subject and topic.\n2. Each question should have 4 answer options, with only one correct answer.\n3. Provide a brief, one-line explanation for both correct answers.\n4. Include metadata for each question, such as difficulty level and topic tags.\n5. Adapt the language complexity and tone to the student\'s age or education level, which will be provided.\n\nUse the following JSON structure for your output:\n\n{\n  "subject": "Subject name",\n  "topic": "Specific topic",\n  "targetAgeGroup": "Age group or education level",\n  "questions": [\n    {\n      "id": 1,\n      "question": "Question text here?",\n      "options": [\n        {"label": "A", "text": "Option A"},\n        {"label": "B", "text": "Option B"},\n        {"label": "C", "text": "Option C"},\n        {"label": "D", "text": "Option D"}\n      ],\n      "correctAnswer": "A",\n      "explanation": "Brief explanation for the correct answer",\n      "difficulty": "easy/medium/hard",\n      "tags": ["tag1", "tag2"]\n    }\n    // Repeat this structure for all 10 questions\n  ]\n}\n\nNow, please wait for the user to provide:\n1. The subject\n2. The specific topic within that subject\n3. The target age group or education level\n\nOnce you receive this information, generate the quiz accordingly.',
    )

    chat_session = model.start_chat(history=[])

    response = chat_session.send_message(
        f"Subject: {subject}\nTopic: {topics}\n Standard :{standard}"
    )

    return json.loads(response.text)

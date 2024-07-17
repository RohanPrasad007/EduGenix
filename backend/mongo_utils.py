from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

client = MongoClient(os.environ.get("MONGO_URI"))
db = client.edugenix


def add_user(idinfo):
    user = db.users.find_one({"google_id": idinfo["sub"]})
    if not user:
        user = {
            "google_id": idinfo["sub"],
            "email": idinfo["email"],
            "name": idinfo["name"],
            "picture": idinfo.get("picture", ""),
        }
        db.users.insert_one(user)
    user["_id"] = str(user["_id"])
    return user

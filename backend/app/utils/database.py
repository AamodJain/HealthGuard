from mongoengine import connect
import os
from dotenv import load_dotenv
import sys

load_dotenv()

try:
    connect(
        db=os.getenv("MONGO_DB"),
        host=os.getenv("MONGO_URI")
    )
    print("[✅] MongoDB connection established successfully.")
except Exception as e:
    print(f"[❌] Failed to connect to MongoDB: {e}")
    sys.exit(1) 
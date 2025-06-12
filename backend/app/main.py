from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.auth import router as auth_router
import app.utils.database  
from mongoengine import connect
import os
from dotenv import load_dotenv
from app.utils.mobility import function_to_run
from app.utils.diseaseData import simulate  # Import the function to run the job
from app.routes.diseaseData import router as disease_router
from app.routes.updates import router as updates_router
from app.utils.alert import genAlert
from app.utils.update import genUpdates
from app.routes.alerts import router as alert_router

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("MONGO_DB")

# This creates the default connection
try:
    connect(DB_NAME, host=MONGO_URI)
    print(f"✅ Connected to MongoDB: {DB_NAME}")
except Exception as e:
    print(f"❌ Failed to connect to MongoDB: {e}")


function_to_run()  # Call the function to run the job
simulate()  # Call the function to run the disease simulation
genAlert()
genUpdates()  # Call the function to generate updates


app = FastAPI()
app.include_router(auth_router)
app.include_router(disease_router)
app.include_router(updates_router)
app.include_router(alert_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Backend running"}
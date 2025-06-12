from mongoengine import connect
# from simD.app.models.disease import disease  # adjust import to where your Document is defined
import random
from time import sleep
from mongoengine import Document, StringField, IntField
import random
import math
from typing import List
import json
from pydantic import BaseModel
from mongoengine import connect, Q, Document, StringField, IntField
import google.generativeai as genai
import os
from dotenv import load_dotenv
import schedule
from app.models.disease import disease  # adjust import to where your Document is defined

load_dotenv()  # Load environment variables from .env file

genai.configure(api_key=os.getenv("GENAI_API_KEY"))
MODEL = "gemini-2.0-flash"

states = [
    "AP", "KL", "TR", "AR", "AS", "BR", "CG", "GA", "GJ", "HR", "HP", "JK",
    "JH", "KA", "MP", "MH", "MN", "ML", "MZ", "NL", "OR", "PB", "RJ", "SK",
    "TN", "UK", "UP", "WB", "AN", "CH", "DH", "DD", "DL", "LD", "PY"
]

populations = {
    'AP': 55, 'KL': 35, 'TR': 4, 'AR': 1.5, 'AS': 35, 'BR': 125, 'CG': 30,
    'GA': 1.5, 'GJ': 70, 'HR': 30, 'HP': 7, 'JK': 14, 'JH': 40, 'KA': 70,
    'MP': 85, 'MH': 125, 'MN': 3, 'ML': 3, 'MZ': 1.2, 'NL': 2, 'OR': 45,
    'PB': 30, 'RJ': 80, 'SK': 0.7, 'TN': 80, 'UK': 12, 'UP': 240, 'WB': 100,
    'AN': 0.4, 'CH': 1.2, 'DH': 0.6, 'DD': 0.4, 'DL': 20, 'LD': 0.07, 'PY': 1.5
}

# class disease(Document):
#     diseaseName   = StringField(required=True, trim=True)
#     symptoms      = StringField(required=True, trim=True)
#     spreadfactor  = IntField(required=True, min_value=1, max_value=10)
#     stateName     = StringField(required=True, trim=True)
#     population    = IntField(required=True)               # total pop in that state
#     totalCases    = IntField(required=True)
#     activeCases   = IntField(required=True)
#     deaths        = IntField(required=True)
#     meta = {
#         'collection': 'disease',
#         'timestamps': True
#     }

#     @property
#     def recovered(self):
#         # everyone ever infected minus those active or dead
#         return self.totalCases - self.activeCases - self.deaths

# # 1. Connect to MongoDB
# connect(db='disease', host='mongodb://localhost:27017/')


# Pydantic model for AI response validation
class AIdisease(BaseModel):
    diseaseName: str
    synonyms: List[str]
    symptoms: str
    spreadfactor: int
    stateName: str
    totalCases: int
    activeCases: int
    deaths: int


def insert_dummy_disease_record(max_retries: int = 1) -> disease:
    """
    Generate and insert a dummy contagious disease record (pandemic potential) with structured JSON from Gemini.
    Retries up to `max_retries` if disease-state pair exists (matching synonyms).
    """
    # init_db()
    attempts = 0

    while attempts < max_retries:
        prompt = (
            "You are to output ONLY a JSON object that strictly follows this schema:\n"
            "{\n"
            "  \"diseaseName\": string,         // primary name of the disease\n"
            "  \"synonyms\": [string],           // list of equivalent names\n"
            "  \"symptoms\": string,            // description of symptoms\n"
            "  \"spreadfactor\": integer,       // 1 to 10\n"
            "  \"stateName\": string,           // one of these state codes: " + str(states) + "\n"
            "  \"totalCases\": integer,         // ≤ 0.5 * population\n"
            "  \"activeCases\": integer,        // + deaths ≤ totalCases\n"
            "  \"deaths\": integer               // ≤ 0.1 * population\n"
            "}\n"
            "make sure that initiall  try that cases are low as compared to population, and deaths are low as compared to cases.\n"
            "Use the populations mapping (in millions) for constraints: " + str(populations) + ".\n"
            "Ensure `totalCases <= int(0.5 * population * 1_000_000)` and `deaths <= int(0.1 * population * 1_000_000)`\n"
            "Respond with no extra text, only the JSON object."
        )

        temp=genai.GenerativeModel(
            model_name="gemini-2.0-flash",
            safety_settings=[
                {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
                {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
                {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
                {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
            ],
            generation_config={
                "temperature": 1,
                "top_p": 0.95,
                "top_k": 64,
                "max_output_tokens": 8192,
                "response_mime_type": "application/json",
            }
        )
        ai_resp = temp.generate_content(
            contents=prompt
        )

        try:
            data = json.loads(ai_resp.text)
            record = AIdisease(**data)
        except Exception:
            attempts += 1
            continue

        # Check for existing record (including synonyms)
        query_names = [record.diseaseName] + record.synonyms
        if disease.objects(Q(stateName=record.stateName) & Q(diseaseName__in=query_names)).first():
            attempts += 1
            continue

        # Save new record
        new_record = disease(
            diseaseName=record.diseaseName,
            symptoms=record.symptoms,
            spreadfactor=record.spreadfactor,
            stateName=record.stateName,
            population=int(populations[record.stateName] * 1_000_000),
            totalCases=record.totalCases,
            activeCases=record.activeCases,
            deaths=record.deaths
        )
        new_record.save()
        return new_record
    return None  # or raise an exception if you prefer
    # raise RuntimeError(f"Failed after {max_retries} attempts: duplicate disease-state pairs")


def safe_gauss(mu: float):
    """Integer draw ~ N(mu, σ²) with σ = √(max(mu,0)+1)."""
    sigma = math.sqrt(max(mu, 0) + 1)
    return max(int(random.gauss(mu, sigma)), 0)

# ── Simulation ────────────────────────────────────────────────────────────────
def simulate_day():
    insert_dummy_disease_record()
    
    for rec in disease.objects:
        d = disease.objects.get(id=rec.id)
        N  = d.population
        T  = d.totalCases
        I  = d.activeCases
        D0 = d.deaths

        # 1) Infection logistic parameters
        K_inf = 0.5 * N                   # cap total cases at 50% pop
        r_inf = 0.2 * d.spreadfactor      # growth rate

        # logistic ΔT
        exp_inf = r_inf * T * (1 - T / K_inf)
        if random.random() < 0.05:
            exp_inf *= random.uniform(0.5, 1.5)
        new_inf = min(safe_gauss(exp_inf), max(int(K_inf - T), 0))

        # 2) Recovery (simple)
        gamma  = 0.05
        new_rec = min(safe_gauss(gamma * I), I)

        # 3) Death logistic parameters
        K_dea = 0.1 * N                    # cap deaths at 10% pop
        mu    = 0.01                       # base death rate multiplier

        # death rate scaled by remaining capacity for deaths
        exp_dea = mu * I * (1 - D0 / K_dea)
        # add small noise
        if random.random() < 0.05:
            exp_dea *= random.uniform(0.5, 1.5)
        # sample and clamp so D ≤ K_dea and ≤ remaining actives
        new_dea = min(safe_gauss(exp_dea), I - new_rec, max(int(K_dea - D0), 0))

        # 4) Update compartments
        I2 = I + new_inf - new_rec - new_dea
        D2 = D0 + new_dea
        T2 = T + new_inf

        # enforce active+deaths ≤ total
        I2 = max(I2, 0)
        if I2 + D2 > T2:
            I2 = T2 - D2

        # 5) Persist atomically
        disease.objects(id=d.id).update_one(
            set__totalCases  = int(T2),
            set__activeCases = int(I2),
            set__deaths      = int(D2)
        )

        # 6) Debug print
        print(f"[{d.stateName}] +Inf={new_inf:3d}  Rec={new_rec:3d}  Death={new_dea:3d}  "
              f"→ Tot={T2:5.0f}, Act={I2:4.0f}, Dth={D2:4.0f}")

def simulate():
    schedule.every(0.1).minutes.do(simulate_day)

    print("Starting simulation scheduler (run every 2 minutes)...")
    while True:
        schedule.run_pending()
        sleep(1)

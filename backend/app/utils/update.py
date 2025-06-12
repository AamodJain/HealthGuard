import google.generativeai as genai
import os
from app.models.disease import disease  # adjust import to where your Document is defined
from app.models.mobility import mobility  # adjust import to where your Document is defined
from fastapi import APIRouter, HTTPException
from app.models.updates import Update  # adjust import to where your Document is defined
from mongoengine.queryset.visitor import Q
import os
from dotenv import load_dotenv
import schedule
from time import sleep
import json



load_dotenv() 




def func():
        genai.configure(api_key=os.getenv('GENAI_API_KEY'))

        all_diseases = disease.objects()
        if not all_diseases:
            raise HTTPException(status_code=404, detail="No disease records found.")

        created_updates = []
        for d in all_diseases:
            state = d.stateName
            name = d.diseaseName
            symptoms = d.symptoms
            spread = d.spreadfactor

            # Prepare system and user prompts for Gemini
            model = genai.GenerativeModel(
                model_name="gemini-2.0-flash",
                # safety_settings=[
                #     {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
                #     {"category": "HARM_CATEGORY_HARASSMENT",      "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
                #     {"category": "HARM_CATEGORY_HATE_SPEECH",     "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
                #     {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT","threshold": "BLOCK_MEDIUM_AND_ABOVE"},
                # ],
                generation_config={
                    "temperature": 0.7,
                    "top_p": 0.9,
                    "max_output_tokens": 1024,
                    "response_mime_type": "application/json",
                },
                system_instruction="You generate React-ready alert components for public health outbreaks."  
            )
            prompt = f"""
    Generate a JSON object with keys 'title' and 'content'.
    - 'title': a concise Alert for {state} about a rise in {name}.
    - 'content': JSX string that mentions symptoms ({symptoms}), spread factor ({spread}), and preventive measures.
    Format values as valid JSX strings to embed in React.
    """
        response =model.generate_content(prompt)
        json_str = response.text
        
        # Parse it safely
        try:
            alert_data = json.loads(json_str)
        except json.JSONDecodeError as e:
            print(f"JSON parse error for {d.id}: {e}")
            
        print(alert_data)
        #     # Pull out your JSX strings
        title_jsx   = alert_data[0].get("title", "")
        content_jsx = alert_data[0].get("content", "")

            # Save to your DB
        alerts = Update(title=title_jsx, content=content_jsx)
        alerts.save()

def genUpdates():
    schedule.every(3).minutes.do(func)
    print("Starting simulation scheduler (run every 2 minutes)...")
    while True:
        schedule.run_pending()
        sleep(1)  
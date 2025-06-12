import google.generativeai as genai
import os
from app.models.disease import disease  # adjust import to where your Document is defined
from app.models.mobility import mobility  # adjust import to where your Document is defined
from fastapi import APIRouter, HTTPException
from app.models.alerts import Alerts  # adjust import to where your Document is defined
from mongoengine.queryset.visitor import Q
import os
from dotenv import load_dotenv
import schedule
from time import sleep
import json
from app.utils.event_news import generate_event_based_health_alerts 


load_dotenv() 


def func():


    genai.configure(api_key=os.getenv('GENAI_API_KEY'))
    diseases = disease.objects()

    for d in diseases:
        generate_event_based_health_alerts(disease=d.diseaseName, contagiousness=d.spreadfactor, state=d.stateName, api_key="730decbd9b2afd2261d5829877563b3e")

        state = d.stateName
        # Find mobility entries where either state1 or state2 matches the disease state
        entries = mobility.objects(Q(state1=state) | Q(state2=state))

        # Determine the state with maximum mobility relative to this state
        target_state = None
        max_mobility = -1
        for m in entries:
            other = m.state2 if m.state1 == state else m.state1
            if m.mob > max_mobility:
                max_mobility = m.mob
                target_state = other

        if not target_state:
            continue  # No connected mobility data
    model= genai.GenerativeModel(
            model_name="gemini-2.0-flash",
            # safety_settings=[
            #     {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
            #     {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
            #     {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
            #     {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
            # ],
            generation_config={
                "temperature": 1,
                "top_p": 0.95,
                "top_k": 64,
                "max_output_tokens": 8192,
                "response_mime_type": "application/json",
            },
            system_instruction=(
                "You generate React-ready alerts for public health outbreaks."
            )
    )
        # Prepare prompt for Gemini to generate an alert
    prompt = f"""
    You are an expert public health advisor.
    Generate a JSON object with keys 'title' and 'content'.
    - 'title' should be a warning to the state of {target_state} about a potential outbreak of {d.diseaseName}.
    - 'content' should list the symptoms ({d.symptoms}) and recommend preventive measures based on those symptoms.
    - Format the values as JSX strings to be used directly in a React component.
    """

        # Call Gemini
    response = model.generate_content(prompt)
    # print(response.text)
        # Grab the raw JSON string
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
    alerts = Alerts(title=title_jsx, content=content_jsx)
    alerts.save()
def genAlert():
    schedule.every(0.1).minutes.do(func)
    print("Starting simulation scheduler (run every 2 minutes)...")
    while True:
        schedule.run_pending()
        sleep(1)
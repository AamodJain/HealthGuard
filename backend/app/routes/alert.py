import google.generativeai as genai
import os
from app.models.disease import disease  # adjust import to where your Document is defined
from app.models.mobility import mobility  # adjust import to where your Document is defined
from fastapi import APIRouter, HTTPException
from app.models.alerts import Update  # adjust import to where your Document is defined

# Configure Gemini API key
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

@router.post("/generate/alert")
async def generate_alert():
    diseases = disease.objects()

    for d in diseases:
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
    response = model.generate_content(contents=prompt)

        # Parse Gemini output (assumes valid JSON)
    try:
            result = response.choices[0].message.content.strip()
            alert_data = eval(result)  # safer JSON parse recommended in production
            title_jsx = alert_data['title']
            content_jsx = alert_data['content']

            # Save to Update collection
            update = Update(title=title_jsx, content=content_jsx)
            update.save()
            print(f"Alert saved for {target_state} about {d.diseaseName}")
    except Exception as e:
            print(f"Failed to generate alert for {d.id}: {e}")

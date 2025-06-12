import requests
from urllib.parse import quote_plus
import json
import google.generativeai as genai
from typing import List, Dict
from bs4 import BeautifulSoup
from models import Update
import datetime


def get_state_event_news(state_name: str, access_key: str):
    url = "http://api.mediastack.com/v1/news"
    keyword = quote_plus(f"{state_name} upcoming event")
    params = {
        'access_key': access_key,
        'keywords': keyword,
        'languages': 'en',
        'sort': 'published_desc',
        'countries': 'in',
        'limit': 5
    }

    response = requests.get(url, params=params)

    if response.status_code != 200:
        print("Error:", response.status_code, response.text)
        return []

    data = response.json()
    articles = data.get('data', [])

    results = [
        {
            'title': article.get('title'),
            'description': article.get('description'),
            'url': article.get('url')
        }
        for article in articles
    ]
    
    return results


def filter_event_articles_by_state(articles: list[dict], state_name: str) -> list[dict]:

    genai.configure(api_key="AIzaSyDYw1YVJuNvnzWZp46b7Snnpi73L21kx80")

    client = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        generation_config={
            "temperature": 1,
            "top_p": 0.95,
            "top_k": 64,
            "max_output_tokens": 20000,
            "response_mime_type": "application/json",
        },
        safety_settings=[
            {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
            {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
            {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
            {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
        ]
    )

    filtered_articles = []

    for article in articles:
        title = article.get('title', '')
        description = article.get('description', '')
        
        prompt = f"""
You are an AI that checks whether a news article is about an upcoming or recent **event** such as public gatherings, festivals, government programs, health drives, or conferences. 
The event should be **specifically related to the state**: "{state_name}".

Here is the news article:
Title: "{title}"
Description: "{description}"

Answer only in this exact JSON format:
{{"event_related": true}} or {{"event_related": false}}

Do not explain or provide any extra text.
"""

        try:
            response = client.generate_content(prompt)
            result = json.loads(response.text.strip())
            if result.get("event_related", False):
                filtered_articles.append(article)
        except Exception as e:
            print(f"Error processing article: {title[:50]}... – {e}")

    return filtered_articles


def summarize_article_content(url: str) -> str:
    """
    Scrapes article text from the URL and uses Gemini to summarize event-specific details in paragraph form.

    Args:
        url (str): URL of the news article.

    Returns:
        str: Paragraph-style summary focusing on what, where, when, who, and why of the event.
    """
    try:
        # Scrape article content
        response = requests.get(url, headers={"User-Agent": "Mozilla/5.0"})
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        scraped_text = soup.get_text()
        scraped_text = '\n'.join(
            line.strip() for line in scraped_text.splitlines()
            if line.strip()
        )

        content_to_summarize = scraped_text[:4000]

        # Configure Gemini
        client = genai.GenerativeModel(
            model_name="gemini-1.5-flash",
            generation_config={
                "temperature": 0.7,
                "top_p": 0.9,
                "max_output_tokens": 512,
            }
        )

        # Prompt: Ask for paragraph-style event summary
        prompt = f"""
Summarize the following news article in a single paragraph, focusing only on the event being discussed.
Your summary must clearly include what the event is, where and when it will happen, who is organizing or participating, and why the event is significant or what its main purpose is.
Do not use bullet points or labels. Only return a paragraph.

\"\"\"{content_to_summarize}\"\"\"
"""

        response = client.generate_content(prompt)
        return response.text.strip()

    except Exception as e:
        return f"Error summarizing: {e}"
    

import google.generativeai as genai

def generate_health_alert(summary: str, disease: str, state: str, contagiousness: int) -> str:
    """
    Uses Gemini to generate a JSX alert content for health officials regarding a disease risk near an event.

    Args:
        summary (str): Summary of the event.
        disease (str): Name of the disease.
        state (str): State where event and disease are relevant.
        contagiousness (int): Value from 1 to 10 indicating how contagious the disease is.

    Returns:
        str: JSX-formatted content for frontend rendering.
    """

    # Configure Gemini
    # genai.configure(api_key="YOUR_API_KEY")  # Replace with your Gemini API key

    client = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        generation_config={
            "temperature": 0.9,
            "top_p": 0.95,
            "max_output_tokens": 1024,
        },
        system_instruction="You are an assistant that writes professional health alerts for frontend display.",
        safety_settings=[
            {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
            {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
            {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
            {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
        ]
    )

    # Prompt to generate alert
    prompt = f"""
You are helping generate a health alert for the frontend of a medical monitoring system. 
The alert should be directed toward health officials and local authorities. 

Use the following:
- Disease: {disease}
- Contagiousness Level: {contagiousness}/10
- State: {state}
- Event Summary: {summary}

Please generate the output in a **React JSX format**, suitable for rendering in a React `alerts.jsx` page. 
Make sure to:
- Use a `<div>` wrapper
- Highlight the disease and event risk
- Mention the contagiousness level clearly
- Suggest precautionary measures or monitoring
- Keep tone formal and alert-focused

Only return the JSX code, nothing else.
"""

    try:
        response = client.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        return f"Error generating alert: {e}"


def save_alert_to_mongo(title: str, jsx_content: str):
    alert = Update(title=title, content=jsx_content)
    alert.save()
    print("✅ Alert saved to MongoDB.")


if __name__ == "__main__":
    state = "Rajasthan"
    api_key = "730decbd9b2afd2261d5829877563b3e"  # Replace with your actual key
    news = get_state_event_news(state, api_key)

    event_articles = filter_event_articles_by_state(news, state)

    for i, item in enumerate(news, start=1):
        print(f"{i}. {item['title']}\n   {item['description']}\n")

    for article in event_articles:
        print(f"\n✅ EVENT ARTICLE:\nTitle: {article['title']}\nDescription: {article['description']}")
        print(f"🔗 URL: {article['url']}")

        summary = summarize_article_content(article['url'])
        print(f"\n📝 SUMMARY:\n{summary}\n{'-'*80}")

        disease = "Swine Flu"
        contagiousness = 7

        jsx_alert = generate_health_alert(summary, disease, state, contagiousness)
        print(jsx_alert)

        heading = f"Alert: Possible {disease} Spread at Upcoming Event in {state}"
        save_alert_to_mongo(title=heading, jsx_content=jsx_alert)
    

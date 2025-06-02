from mongoengine import Document, StringField, EmailField, IntField, DateTimeField
from datetime import datetime

class User(Document):
    first_name = StringField(required=True)
    last_name = StringField(required=True)
    email = EmailField(required=True, unique=True)
    password = StringField(required=True, min_length=1, max_length=128)
    created_at = DateTimeField(default=datetime.now)
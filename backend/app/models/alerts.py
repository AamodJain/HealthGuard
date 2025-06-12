from mongoengine import Document, StringField
from datetime import datetime

class Update(Document):
    title = StringField(required=True, trim=True)
    content = StringField(required=True, trim=True)

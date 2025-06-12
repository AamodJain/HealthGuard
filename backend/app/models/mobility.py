from mongoengine import Document, StringField, IntField

class mobility(Document):
    state1 = StringField(required=True, trim=True)  # course ID
    state2 = StringField(required=True, trim=True)  # week number
    mob = IntField(required=True, trim=True)  # list of subtopics

    meta = {
        'collection': 'mobility',
        'timestamps': True
}
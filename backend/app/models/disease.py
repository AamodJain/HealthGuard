from mongoengine import Document, StringField, IntField

class disease(Document):
    diseaseName   = StringField(required=True, trim=True)
    symptoms      = StringField(required=True, trim=True)
    spreadfactor  = IntField(required=True, min_value=1, max_value=10)
    stateName     = StringField(required=True, trim=True)
    population    = IntField(required=True)               # total pop in that state
    totalCases    = IntField(required=True)
    activeCases   = IntField(required=True)
    deaths        = IntField(required=True)
    meta = {
        'collection': 'disease',
        'timestamps': True
    }

    @property
    def recovered(self):
        # everyone ever infected minus those active or dead
        return self.totalCases - self.activeCases - self.deaths

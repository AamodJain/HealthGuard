from fastapi import APIRouter, Depends, HTTPException
from ..models.disease import disease
import json

router = APIRouter(prefix="/disease", tags=["diseaseData"])


@router.get("/getAll")
async def get_all_diseases():
    try:
        # Query all documents
        qs = disease.objects()
        # Convert to JSON-compatible Python list
        data = json.loads(qs.to_json())
        print(data)
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
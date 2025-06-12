# write a get request api to fetch updates from the database
from fastapi import APIRouter, HTTPException
from app.models.updates import Update
from app.models.schemas import UpdateOut

router = APIRouter()
@router.get("/updates", response_model=list[UpdateOut])
def get_updates():
    try:
        updates = Update.objects().order_by('-id')
        return [UpdateOut.from_orm(update) for update in updates]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


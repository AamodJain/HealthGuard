from fastapi import APIRouter, HTTPException
from app.models.updates import Update

router = APIRouter()

@router.get("/updates")
def get_updates():
    try:
        updates = Update.objects().order_by("-id")
        return [
            {
                "title": update.title,
                "content": update.content
            }
            for update in updates
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

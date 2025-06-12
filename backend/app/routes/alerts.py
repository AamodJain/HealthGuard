# # write a get request api to fetch updates from the database
# from fastapi import APIRouter, HTTPException
# from app.models.alerts import Alerts
# from app.models.schemas import AlertOut

# router = APIRouter()

# @router.get("/alerts", response_model=list[AlertOut])
# def get_alerts():
#     try:
#         alerts = Alerts.objects().order_by('-id')
#         return [AlertOut.from_orm(alert) for alert in alerts]
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))
    

from fastapi import APIRouter, HTTPException
from app.models.alerts import Alerts

router = APIRouter()

@router.get("/alerts")
def get_alerts():
    try:
        updates = Alerts.objects().order_by("-id")
        return [
            {
                "title": update.title,
                "content": update.content
            }
            for update in updates
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

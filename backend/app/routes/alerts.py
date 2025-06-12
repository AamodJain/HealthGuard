# write a get request api to fetch updates from the database
from fastapi import APIRouter, HTTPException
from app.models.alerts import Alert
from app.models.schemas import AlertOut

router = APIRouter()

@router.get("/alerts", response_model=list[AlertOut])
def get_alerts():
    try:
        alerts = Alert.objects().order_by('-id')
        return [AlertOut.from_orm(alert) for alert in alerts]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
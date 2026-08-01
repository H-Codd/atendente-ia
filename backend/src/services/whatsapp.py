from fastapi import APIRouter

router = APIRouter()


@router.post("/webhook/whatsapp")
def whatsapp_webhook(payload: dict) -> dict:
    return {"status": "received", "payload": payload}

from fastapi import APIRouter
from backend.src.services.recommender import recommend_course

router = APIRouter()


@router.post("/courses/recommend")
def recommend(payload: dict) -> dict:
    recommendation = recommend_course(payload.get("answers", {}))
    return {"recommendation": {"course": recommendation.course, "reason": recommendation.reason}}

from fastapi import APIRouter
from backend.src.db.database import save_user
from backend.src.models.user import User
from backend.src.services.recommender import recommend_course

router = APIRouter()


@router.post("/question")
def submit_questionnaire(payload: dict) -> dict:
    answers = payload.get("answers", {})
    recommendation = recommend_course(answers)
    user = User(
        id=payload.get("id", f"user-{len(answers) + 1}"),
        name=payload.get("name", "Usuário"),
        informed_course=payload.get("currentCourse", "ADS"),
        suggested_course=recommendation.course,
        created_at=payload.get("createdAt", ""),
        answers=[{"question": key, "response": value} for key, value in answers.items()],
        email=payload.get("email", ""),
        password=payload.get("password", ""),
        is_admin=False,
    )
    save_user(user)
    return {"user": {"id": user.id, "name": user.name, "informedCourse": user.informed_course, "suggestedCourse": user.suggested_course, "createdAt": user.created_at, "answers": user.answers}}

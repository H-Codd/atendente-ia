from fastapi import APIRouter, HTTPException
from backend.src.db.database import authenticate_user, list_users, save_user
from backend.src.models.user import User

router = APIRouter()


def serialize_user(user: User) -> dict:
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": "admin" if user.is_admin else "user",
        "informedCourse": user.informed_course,
        "suggestedCourse": user.suggested_course or "",
        "createdAt": user.created_at,
        "answers": user.answers,
    }


@router.get("/users")
def get_users() -> dict:
    users = [serialize_user(user) for user in list_users()]
    return {"users": users}


@router.post("/users")
def create_user(payload: dict) -> dict:
    user = User(
        id=payload.get("id", "user-1"),
        name=payload.get("name", "Usuário"),
        informed_course=payload.get("currentCourse", "ADS"),
        suggested_course=payload.get("suggestedCourse"),
        created_at=payload.get("createdAt", ""),
        answers=payload.get("answers", []),
        email=payload.get("email", ""),
        password=payload.get("password", ""),
        is_admin=payload.get("isAdmin", False),
    )
    save_user(user)
    return {"user": serialize_user(user)}


@router.post("/auth/register")
def register_user(payload: dict) -> dict:
    name = (payload.get("name") or "Usuário").strip()
    email = (payload.get("email") or "").strip().lower()
    password = (payload.get("password") or "").strip()

    if not email or not password or len(password) < 4 or "@" not in email:
        raise HTTPException(status_code=400, detail="Informe um e-mail válido e uma senha com pelo menos 4 caracteres.")

    if authenticate_user(email, password):
        raise HTTPException(status_code=409, detail="Este e-mail já está cadastrado.")

    user = User(
        id=f"user-{len(list_users()) + 1}",
        name=name,
        informed_course=payload.get("currentCourse", "ADS"),
        suggested_course="",
        created_at=payload.get("createdAt", ""),
        answers=[],
        email=email,
        password=password,
        is_admin=False,
    )
    save_user(user)
    return {"user": serialize_user(user)}


@router.post("/auth/login")
def login_user(payload: dict) -> dict:
    email = (payload.get("email") or "").strip().lower()
    password = (payload.get("password") or "").strip()

    if not email or not password:
        raise HTTPException(status_code=400, detail="E-mail e senha são obrigatórios.")

    user = authenticate_user(email, password)
    if not user:
        raise HTTPException(status_code=401, detail="E-mail ou senha inválidos.")

    return {"user": serialize_user(user)}

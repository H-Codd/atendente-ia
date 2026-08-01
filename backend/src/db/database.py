from typing import List
from backend.src.models.user import User

_DB: List[User] = []


def seed_demo_users() -> None:
    if _DB:
        return

    demo_users = [
        User(
            id="demo-1",
            name="Ana Beatriz",
            informed_course="Medicina",
            suggested_course="Medicina",
            created_at="2026-07-15T09:30:00.000Z",
            answers=[{"question": "biology", "response": "yes"}, {"question": "math", "response": "yes"}, {"question": "helping", "response": "yes"}, {"question": "tech", "response": "no"}],
            email="ana@example.com",
            password="1234",
            is_admin=False,
        ),
        User(
            id="demo-2",
            name="Bruno Silva",
            informed_course="Engenharia",
            suggested_course="Engenharia",
            created_at="2026-07-18T15:45:00.000Z",
            answers=[{"question": "biology", "response": "no"}, {"question": "math", "response": "yes"}, {"question": "helping", "response": "no"}, {"question": "tech", "response": "yes"}],
            email="bruno@example.com",
            password="1234",
            is_admin=False,
        ),
        User(
            id="demo-3",
            name="Carla Mendes",
            informed_course="ADS",
            suggested_course="ADS",
            created_at="2026-07-20T11:10:00.000Z",
            answers=[{"question": "biology", "response": "no"}, {"question": "math", "response": "yes"}, {"question": "helping", "response": "yes"}, {"question": "tech", "response": "yes"}],
            email="carla@example.com",
            password="1234",
            is_admin=False,
        ),
        User(
            id="admin-1",
            name="Administrador",
            informed_course="ADS",
            suggested_course="ADS",
            created_at="2026-01-01T00:00:00.000Z",
            email="admin@atendenteia.com",
            password="admin1234",
            is_admin=True,
        ),
    ]

    for user in demo_users:
        save_user(user)


def save_user(user: User) -> User:
    for index, existing in enumerate(_DB):
        if user.email and existing.email.lower() == user.email.lower():
            _DB[index] = user
            return user

    _DB.append(user)
    return user


def list_users() -> List[User]:
    seed_demo_users()
    return _DB


def authenticate_user(email: str, password: str) -> User | None:
    seed_demo_users()
    normalized_email = email.strip().lower()
    normalized_password = password.strip()

    for user in _DB:
        if user.email.lower() == normalized_email and user.password == normalized_password:
            return user

    return None

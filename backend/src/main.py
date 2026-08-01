from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.src.api.courses import router as courses_router
from backend.src.api.questions import router as questions_router
from backend.src.api.users import router as users_router

app = FastAPI(title="Atendente IA API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users_router)
app.include_router(questions_router)
app.include_router(courses_router)

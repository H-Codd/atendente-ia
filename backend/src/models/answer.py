from dataclasses import dataclass


@dataclass
class Answer:
    id: str
    user_id: str
    question: str
    response: str

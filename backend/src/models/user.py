from dataclasses import dataclass, field
from typing import List


@dataclass
class User:
    id: str
    name: str
    informed_course: str
    suggested_course: str | None = None
    created_at: str = ""
    answers: List[dict] = field(default_factory=list)
    email: str = ""
    password: str = ""
    is_admin: bool = False

from dataclasses import dataclass


@dataclass
class Recommendation:
    user_id: str
    course: str
    reason: str

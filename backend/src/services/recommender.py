from backend.src.models.recommendation import Recommendation


def recommend_course(answers: dict[str, str]) -> Recommendation:
    score = {
        "Medicina": (answers.get("biology") == "yes") + (answers.get("helping") == "yes"),
        "Engenharia": (answers.get("math") == "yes") + (answers.get("tech") == "yes"),
        "ADS": (answers.get("tech") == "yes") + (answers.get("math") == "yes"),
        "Enfermagem": (answers.get("helping") == "yes") + (answers.get("biology") == "yes"),
    }

    course = max(score, key=score.get)
    reason = "Baseado nas respostas fornecidas pelo usuário."
    return Recommendation(user_id="", course=course, reason=reason)

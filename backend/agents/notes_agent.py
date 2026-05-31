import re
import json
from services.gemini_service import call_gemini

async def generate_notes(document_text: str, document_name: str) -> dict:

    prompt = f"""You are analyzing a study document titled: "{document_name}"

Here is the extracted text:
---
{document_text[:12000]}
---

Return ONLY this JSON, no extra text:
{{
  "summary": "3-5 sentence overview",
  "key_points": ["point 1", "point 2"],
  "important_terms": [{{"term": "...", "definition": "..."}}],
  "quick_revision": ["fact 1", "fact 2"],
  "difficulty_level": "Beginner | Intermediate | Advanced",
  "estimated_read_time": "X minutes",
  "topic_tags": ["tag1", "tag2"]
}}

Rules: 5-10 key_points, 5-10 important_terms, 5-8 quick_revision facts."""

    try:
        raw = call_gemini(prompt)
        raw = re.sub(r"^```json\s*", "", raw)
        raw = re.sub(r"\s*```$", "", raw)
        notes_data = json.loads(raw)
        return {"success": True, "notes": notes_data}

    except Exception as e:
        return {"success": False, "error": str(e), "notes": None}
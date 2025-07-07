from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import datetime

app = FastAPI()

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, specify domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QuizAnswers(BaseModel):
    q1: str
    q2: str
    q3: str

@app.get("/")
def read_root():
    return {"message": "API is running ✅"}

@app.post("/api/health-plan")
async def health_plan(data: QuizAnswers):
    # Example logic - in real life use AI/ML or logic here
    return {
        "goal": "Muscle Gain",
        "tip": "Add 20g protein to lunch daily",
        "products": ["Creatine", "Whey Protein", "Multivitamin"]
    }

@app.get("/api/daily-tip")
async def daily_tip():
    tips = {
        0: "Drink 2L of water daily",
        1: "Do a 10-minute morning stretch",
        2: "Eat a fruit before 10am",
        3: "Walk 5k steps minimum",
        4: "Sleep at least 7 hours",
        5: "Do 15 pushups",
        6: "Meditate for 5 minutes"
    }
    day = datetime.datetime.today().weekday()
    return {"tip": tips[day]}

